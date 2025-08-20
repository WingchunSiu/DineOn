import datetime
import requests
from bs4 import BeautifulSoup
import json
import csv
from uuid import uuid4
import os
import logging
import schedule
import time
import asyncio
from dotenv import load_dotenv
from supabase import create_client, Client
from playwright.async_api import async_playwright

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('menu_updater.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Supabase configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    logger.error("Missing Supabase configuration. Please check your .env file.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Dining halls configuration for new website structure
DINING_HALLS = [
    {
        "id": "parkside",
        "name": "Parkside",
        "data_value": "parkside"
    },
    {
        "id": "village",
        "name": "USC Village", 
        "data_value": "university-village"
    },
    {
        "id": "evk",
        "name": "Everybody's Kitchen",
        "data_value": "evk"
    }
]

BASE_URL = "https://hospitality.usc.edu/dining-hall-menus/"

weekday_strs = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class MenuUpdater:
    def __init__(self):
        self.logger = logger
    
    async def scrape_menu_with_playwright(self, page, dining_hall_id, data_value, target_date):
        """Scrape a single dining hall's menu using Playwright for dynamic content"""
        menu_data = {dining_hall_id: {}}
        
        try:
            # Navigate to the main menu page with retry logic
            max_retries = 3
            for attempt in range(max_retries):
                try:
                    await page.goto(BASE_URL, timeout=60000, wait_until='domcontentloaded')
                    break
                except Exception as e:
                    if attempt < max_retries - 1:
                        self.logger.warning(f"Navigation attempt {attempt + 1} failed, retrying: {e}")
                        await asyncio.sleep(5)  # Wait before retry
                    else:
                        raise e
            
            # Wait for the page to fully load
            await page.wait_for_timeout(3000)
            
            # Click the venue button using the data-value attribute
            venue_button_selector = f'button[data-value="{data_value}"]'
            try:
                venue_button = page.locator(venue_button_selector)
                if await venue_button.count() > 0:
                    await venue_button.click()
                    self.logger.info(f"Successfully clicked venue button for {dining_hall_id}")
                    await page.wait_for_timeout(1000)  # Wait for venue to load
                else:
                    self.logger.error(f"Could not find venue button with selector: {venue_button_selector}")
                    return menu_data
            except Exception as e:
                self.logger.error(f"Error clicking venue button: {e}")
                return menu_data
            
            # Set the date using the date input
            date_str = target_date.strftime("%Y-%m-%d")
            try:
                date_input = page.locator('#date')
                await date_input.fill(date_str)
                self.logger.info(f"Successfully set date to {date_str}")
                
                # Trigger change event to load new content
                await date_input.evaluate('el => el.dispatchEvent(new Event("change", { bubbles: true }))')
                await page.wait_for_timeout(2000)  # Wait for date change to load content
            except Exception as e:
                self.logger.error(f"Error setting date: {e}")
            
            # Try different meal types to get all menu content
            meal_options = ['', 'breakfast', 'lunch', 'dinner', 'brunch']
            
            for meal_option in meal_options:
                try:
                    # Set the meal selector
                    meal_selector = page.locator('#meal')
                    await meal_selector.select_option(meal_option)
                    self.logger.info(f"Selected meal: {meal_option if meal_option else 'All Menus'}")
                    
                    # Wait for results to load
                    await page.wait_for_timeout(3000)
                    
                    # Wait for the results div to have content
                    try:
                        await page.wait_for_selector('.results', timeout=10000)
                        await page.wait_for_function(
                            "document.querySelector('.results').children.length > 0",
                            timeout=10000
                        )
                    except:
                        self.logger.warning(f"No results loaded for {meal_option if meal_option else 'All Menus'}")
                        continue
                    
                    # Get the current page content
                    content = await page.content()
                    soup = BeautifulSoup(content, 'html.parser')
                    
                    # Find the results div
                    results_div = soup.find('div', class_='results')
                    if not results_div:
                        self.logger.warning(f"No results div found for {meal_option if meal_option else 'All Menus'}")
                        continue
                    
                    # Parse the actual menu structure based on the website HTML
                    meal_containers = results_div.find_all('div', class_='meal-container')
                    
                    for meal_container in meal_containers:
                        # Get the meal type from data-meal attribute or from the header
                        meal_type = meal_container.get('data-meal', '')
                        if not meal_type:
                            # Try to find meal type from h4 header
                            meal_header = meal_container.find('p', class_='h4')
                            if meal_header:
                                meal_type = meal_header.get_text().strip().lower()
                        
                        if not meal_type:
                            meal_type = meal_option if meal_option else "menu"
                        
                        # Initialize meal type in menu_data if not exists
                        if meal_type not in menu_data[dining_hall_id]:
                            menu_data[dining_hall_id][meal_type] = []
                        
                        # Find all stations within this meal
                        stations_div = meal_container.find('div', class_='stations')
                        if stations_div:
                            stations = stations_div.find_all('div', class_='station')
                            
                            for station in stations:
                                # Get station/section name
                                station_title = station.find('p', class_='title')
                                section_name = station_title.get_text().strip() if station_title else "Main"
                                
                                # Find all menu items in this station
                                menu_items_ul = station.find('ul')
                                if menu_items_ul:
                                    menu_items = menu_items_ul.find_all('li', class_='js-menu-item')
                                    
                                    for item_li in menu_items:
                                        # Extract item name (first text node)
                                        item_name = ""
                                        for content in item_li.contents:
                                            if isinstance(content, str):
                                                item_name = content.strip()
                                                break
                                        
                                        if not item_name:
                                            # Fallback: get all text and try to extract item name
                                            full_text = item_li.get_text().strip()
                                            # Remove price if present (usually at the end like "== $0")
                                            if " == $" in full_text:
                                                item_name = full_text.split(" == $")[0].strip()
                                            else:
                                                item_name = full_text
                                        
                                        if item_name and len(item_name) > 1:
                                            # Extract allergen information from data attributes
                                            allergens = []
                                            
                                            # Get allergens from data-allergens attribute
                                            allergens_data = item_li.get('data-allergens')
                                            if allergens_data:
                                                try:
                                                    # Parse the JSON-like allergens data
                                                    allergens_list = json.loads(allergens_data)
                                                    allergens.extend(allergens_list)
                                                except:
                                                    pass
                                            
                                            # Also look for allergen icons
                                            allergen_imgs = item_li.find_all('img', class_='icon')
                                            for img in allergen_imgs:
                                                alt_text = img.get('alt', '').strip()
                                                if alt_text and alt_text not in allergens:
                                                    allergens.append(alt_text.title())
                                            
                                            # Clean up item name
                                            item_name = item_name.replace('"', '').strip()
                                            
                                            menu_item = {
                                                "name": item_name,
                                                "labels": allergens,
                                                "image_url": "",
                                                "category": section_name,
                                                "featured": False
                                            }
                                            
                                            menu_data[dining_hall_id][meal_type].append(menu_item)
                    
                    # If no meal containers found, try the old parsing method as fallback
                    if not meal_containers:
                        self.logger.warning("No meal containers found, trying fallback parsing...")
                        # Look for any li elements with menu items
                        all_menu_items = results_div.find_all('li', class_='js-menu-item')
                        current_meal_type = meal_option if meal_option else "menu"
                        
                        if current_meal_type not in menu_data[dining_hall_id]:
                            menu_data[dining_hall_id][current_meal_type] = []
                        
                        for item_li in all_menu_items:
                            item_name = item_li.get_text().strip()
                            if " == $" in item_name:
                                item_name = item_name.split(" == $")[0].strip()
                            
                            if item_name and len(item_name) > 1:
                                menu_item = {
                                    "name": item_name,
                                    "labels": [],
                                    "image_url": "",
                                    "category": "Main",
                                    "featured": False
                                }
                                menu_data[dining_hall_id][current_meal_type].append(menu_item)
                    
                except Exception as e:
                    self.logger.error(f"Error processing meal option {meal_option}: {e}")
                    continue
            
            # Debug: Print summary of what was found
            total_items = sum(len(meals) for meals in menu_data[dining_hall_id].values())
            self.logger.info(f"Total items found for {dining_hall_id}: {total_items}")
                    
        except Exception as e:
            self.logger.error(f"Error scraping {dining_hall_id}: {e}")
            import traceback
            traceback.print_exc()
            
        return menu_data

    async def scrape_multiple_days_async(self, days_to_scrape=3):
        """Scrape all dining halls for multiple days using Playwright"""
        all_data = {}
        
        async with async_playwright() as p:
            # Launch browser with debugging options
            browser = await p.chromium.launch(
                headless=True,  # Run headless for production
                args=['--no-sandbox', '--disable-web-security']
            )
            page = await browser.new_page()
            
            # Set viewport size
            await page.set_viewport_size({"width": 1280, "height": 720})
            
            # Set user agent to avoid bot detection
            await page.set_extra_http_headers({
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            })
            
            start_date = datetime.date.today()
            
            for i in range(days_to_scrape):
                date = start_date + datetime.timedelta(days=i)
                day_of_week = date.weekday()
                self.logger.info(f"Scraping menus for {date.strftime('%Y-%m-%d')}")
                
                for hall in DINING_HALLS:
                    dining_hall_id = hall["id"]
                    data_value = hall["data_value"]
                    
                    self.logger.info(f"Scraping {hall['name']} for {date.strftime('%Y-%m-%d')}...")
                    menu_data = await self.scrape_menu_with_playwright(page, dining_hall_id, data_value, date)
                    
                    # Store the data by date
                    if day_of_week not in all_data:
                        all_data[day_of_week] = {}
                    
                    all_data[day_of_week].update(menu_data)
            
            await browser.close()
        
        return all_data
    
    def scrape_multiple_days(self, days_to_scrape=3):
        """Wrapper to run async scraping in sync context"""
        try:
            return asyncio.run(self.scrape_multiple_days_async(days_to_scrape))
        except Exception as e:
            self.logger.error(f"Error in async scraping: {e}")
            # Fall back to legacy method if available
            self.logger.warning("Falling back to legacy scraping method...")
            return self.scrape_multiple_days_legacy(days_to_scrape)
    
    def scrape_multiple_days_legacy(self, days_to_scrape=7):
        """Legacy scraping method for fallback (will likely not work with new website)"""
        self.logger.warning("Using legacy scraping method - this may not work with the new website structure")
        all_data = {}
        start_date = datetime.date.today()

        for i in range(days_to_scrape):
            date = start_date + datetime.timedelta(days=i)
            day_of_week = date.weekday()
            date_str = date.strftime("%B+%-d%%2C+%Y")
            
            self.logger.info(f"Scraping menus for {date_str} (legacy mode)")

            for hall in DINING_HALLS:
                dining_hall_id = hall["id"]
                # Try to construct old URL format (likely won't work)
                venue_id = "514" if hall["id"] == "evk" else "518" if hall["id"] == "parkside" else "27229"
                menu_url = f"https://hospitality.usc.edu/residential-dining-menus/?menu_venue=venue-{venue_id}&menu_date={date_str}"

                self.logger.info(f"Scraping {hall['name']} for {date_str} (legacy)...")
                # This would need the old scrape_menu method, which we could add if needed
                menu_data = {dining_hall_id: {}}  # Empty data for now

                if day_of_week not in all_data:
                    all_data[day_of_week] = {}

                all_data[day_of_week].update(menu_data)

        return all_data

    def clear_existing_data(self):
        """Clear existing menu data from Supabase tables"""
        try:
            # Clear dining_option_menu_items first (foreign key constraint)
            self.logger.info("Clearing existing dining_option_menu_items...")
            # Use bulk delete with gte condition to delete all rows (all days >= Monday)
            result = supabase.table('dining_option_menu_items').delete().gte('day_of_week', 'Monday').execute()
            self.logger.info(f"Cleared {len(result.data) if result.data else 0} dining_option_menu_items")
            
            # Clear menu_items
            self.logger.info("Clearing existing menu_items...")
            # Use bulk delete with neq condition on UUID (UUIDs are never empty)
            result = supabase.table('menu_items').delete().neq('menu_item_uuid', '00000000-0000-0000-0000-000000000000').execute()
            self.logger.info(f"Cleared {len(result.data) if result.data else 0} menu_items")
            
            self.logger.info("Successfully cleared existing data")
        except Exception as e:
            self.logger.error(f"Error clearing existing data: {str(e)}")
            raise

    def upload_to_supabase(self, data):
        """Upload menu data directly to Supabase"""
        try:
            # Clear existing data first
            self.clear_existing_data()
            
            menu_items = []
            dining_option_menu_items = []

            for weekday, locations in data.items():
                for location, meals in locations.items():
                    for meal_type, meal_items in meals.items():
                        for item in meal_items:
                            menu_item_uuid = str(uuid4())

                            menu_items.append({
                                "menu_item_uuid": menu_item_uuid,
                                "name": item.get("name", ""),
                                "image_url": item.get("image_url", ""),
                                "category": item.get("category", ""),
                                "featured": item.get("featured", False),
                                "labels": item.get("labels", []),  # Keep as proper array
                            })

                            # Capitalize meal type to match app expectations
                            capitalized_meal_type = meal_type.capitalize()
                            
                            dining_option_menu_items.append({
                                "day_of_week": weekday_strs[int(weekday)],
                                "dining_option_string_id": location,
                                "menu_item_uuid": menu_item_uuid,
                                "meal_type": capitalized_meal_type,
                            })

            # Upload menu items in batches
            self.logger.info(f"Uploading {len(menu_items)} menu items...")
            batch_size = 100
            for i in range(0, len(menu_items), batch_size):
                batch = menu_items[i:i + batch_size]
                result = supabase.table('menu_items').insert(batch).execute()
                self.logger.info(f"Uploaded batch {i//batch_size + 1}/{(len(menu_items) + batch_size - 1)//batch_size}")

            # Upload dining option menu items in batches
            self.logger.info(f"Uploading {len(dining_option_menu_items)} dining option menu items...")
            for i in range(0, len(dining_option_menu_items), batch_size):
                batch = dining_option_menu_items[i:i + batch_size]
                result = supabase.table('dining_option_menu_items').insert(batch).execute()
                self.logger.info(f"Uploaded batch {i//batch_size + 1}/{(len(dining_option_menu_items) + batch_size - 1)//batch_size}")

            self.logger.info("Successfully uploaded all data to Supabase")
            return True

        except Exception as e:
            self.logger.error(f"Error uploading to Supabase: {str(e)}")
            return False

    def save_backup_files(self, data):
        """Save backup JSON and CSV files"""
        try:
            # Save JSON backup
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            json_filename = f"usc_dining_menus_{timestamp}.json"
            
            with open(json_filename, "w") as f:
                json.dump(data, f, indent=4)
            self.logger.info(f"Saved backup JSON: {json_filename}")

            # Generate CSV files for backup
            menu_items = []
            dining_option_menu_items = []

            for weekday, locations in data.items():
                for location, meals in locations.items():
                    for meal_type, meal_items in meals.items():
                        for item in meal_items:
                            menu_item_uuid = str(uuid4())

                            menu_items.append([
                                menu_item_uuid,
                                item.get("name", ""),
                                item.get("image_url", ""),
                                item.get("category", ""),
                                item.get("featured", False),
                                json.dumps(item.get("labels", [])),  # Convert to JSON string for CSV
                            ])

                            # Capitalize meal type to match app expectations
                            capitalized_meal_type = meal_type.capitalize()
                            
                            dining_option_menu_items.append([
                                weekday_strs[int(weekday)],
                                location,
                                menu_item_uuid,
                                capitalized_meal_type,
                            ])

            # Save CSV backups
            menu_csv = f"menu_items_{timestamp}.csv"
            with open(menu_csv, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(["menu_item_uuid", "name", "image_url", "category", "featured", "labels"])
                writer.writerows(menu_items)
            self.logger.info(f"Saved backup CSV: {menu_csv}")

            dining_csv = f"dining_option_menu_items_{timestamp}.csv"
            with open(dining_csv, 'w', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                writer.writerow(["day_of_week", "dining_option_string_id", "menu_item_uuid", "meal_type"])
                writer.writerows(dining_option_menu_items)
            self.logger.info(f"Saved backup CSV: {dining_csv}")

        except Exception as e:
            self.logger.error(f"Error saving backup files: {str(e)}")

    def run_update(self):
        """Run the complete menu update process"""
        try:
            self.logger.info("Starting menu update process...")
            
            # Scrape menu data
            menu_data = self.scrape_multiple_days()
            
            if not menu_data:
                self.logger.warning("No menu data scraped. Aborting update.")
                return False

            # Save backup files
            self.save_backup_files(menu_data)
            
            # Upload to Supabase
            success = self.upload_to_supabase(menu_data)
            
            if success:
                self.logger.info("Menu update completed successfully!")
            else:
                self.logger.error("Menu update failed!")
            
            return success

        except Exception as e:
            self.logger.error(f"Error in run_update: {str(e)}")
            return False

def run_scheduled_update():
    """Function to be called by the scheduler"""
    updater = MenuUpdater()
    updater.run_update()

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--run-once":
        # Run once immediately
        logger.info("Running menu update once...")
        updater = MenuUpdater()
        updater.run_update()
    else:
        # Run with scheduler
        logger.info("Starting automated menu updater with scheduler...")
        
        # Schedule updates
        schedule.every().day.at("06:00").do(run_scheduled_update)  # Daily at 6 AM
        schedule.every().day.at("12:00").do(run_scheduled_update)  # Daily at 12 PM
        schedule.every().day.at("18:00").do(run_scheduled_update)  # Daily at 6 PM
        
        logger.info("Scheduled updates for 6:00 AM, 12:00 PM, and 6:00 PM daily")
        logger.info("Press Ctrl+C to stop the scheduler")
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(60)  # Check every minute
        except KeyboardInterrupt:
            logger.info("Scheduler stopped by user") 