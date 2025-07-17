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
from dotenv import load_dotenv
from supabase import create_client, Client

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

# Dining halls configuration
DINING_HALLS = [
    {
        "id": "parkside",
        "name": "Parkside Restaurant & Grill",
        "menu_url": "https://hospitality.usc.edu/residential-dining-menus/?menu_venue=venue-518&menu_date={date}"
    },
    {
        "id": "village",
        "name": "Village Dining Hall",
        "menu_url": "https://hospitality.usc.edu/residential-dining-menus/?menu_venue=venue-27229&menu_date={date}"
    },
    {
        "id": "evk",
        "name": "Everybody's Kitchen",
        "menu_url": "https://hospitality.usc.edu/residential-dining-menus/?menu_venue=venue-514&menu_date={date}"
    }
]

weekday_strs = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class MenuUpdater:
    def __init__(self):
        self.logger = logger
    
    def scrape_menu(self, dining_hall_id, url):
        """Scrape a single dining hall's menu"""
        try:
            r = requests.get(url, timeout=30)
            r.raise_for_status()
            soup = BeautifulSoup(r.content, 'html.parser')

            menu_data = {dining_hall_id: {}}
            meals = soup.find_all("h3")

            for meal in meals:
                meal_type = meal.text.strip()
                menu_data[dining_hall_id][meal_type] = []

                section = meal.find_next_sibling("h4")

                while section and section.name == "h4":
                    section_name = section.text.strip()
                    items = []

                    list_items = section.find_next_sibling("ul")

                    if list_items:
                        for li in list_items.find_all("li"):
                            name = li.contents[0].strip().replace('"', '')

                            allergens = []
                            allergen_icons = li.find_all("i", class_="fa-allergen")
                            for icon in allergen_icons:
                                classes = icon.get("class", [])
                                for cls in classes:
                                    if cls.startswith("allergen-") and cls != "allergen-tooltip":
                                        allergens.append(cls.replace("allergen-", "").replace("-", " ").title())

                            menu_item = {
                                "name": name,
                                "labels": allergens,
                                "image_url": "",
                                "category": section_name,
                                "featured": False
                            }
                            items.append(menu_item)

                    menu_data[dining_hall_id][meal_type].extend(items)
                    section = section.find_next_sibling("h4")

            return menu_data
        except Exception as e:
            self.logger.error(f"Error scraping menu for {dining_hall_id}: {str(e)}")
            return {dining_hall_id: {}}

    def scrape_multiple_days(self, days_to_scrape=7):
        """Scrape all dining halls for multiple days"""
        all_data = {}
        start_date = datetime.date.today()

        for i in range(days_to_scrape):
            date = start_date + datetime.timedelta(days=i)
            day_of_week = date.weekday()
            date_str = date.strftime("%B+%-d%%2C+%Y")
            
            self.logger.info(f"Scraping menus for {date_str}")

            for hall in DINING_HALLS:
                dining_hall_id = hall["id"]
                menu_url = hall["menu_url"].replace("{date}", date_str)

                self.logger.info(f"Scraping {hall['name']} for {date_str}...")
                menu_data = self.scrape_menu(dining_hall_id, menu_url)

                if day_of_week not in all_data:
                    all_data[day_of_week] = {}

                all_data[day_of_week].update(menu_data)

        return all_data

    def clear_existing_data(self):
        """Clear existing menu data from Supabase tables"""
        try:
            # Clear dining_option_menu_items first (foreign key constraint)
            self.logger.info("Clearing existing dining_option_menu_items...")
            # Get all rows and delete them
            result = supabase.table('dining_option_menu_items').select('*').execute()
            if result.data:
                for row in result.data:
                    supabase.table('dining_option_menu_items').delete().eq('day_of_week', row['day_of_week']).eq('dining_option_string_id', row['dining_option_string_id']).eq('menu_item_uuid', row['menu_item_uuid']).eq('meal_type', row['meal_type']).execute()
            
            # Clear menu_items
            self.logger.info("Clearing existing menu_items...")
            result = supabase.table('menu_items').select('menu_item_uuid').execute()
            if result.data:
                for row in result.data:
                    supabase.table('menu_items').delete().eq('menu_item_uuid', row['menu_item_uuid']).execute()
            
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

                            dining_option_menu_items.append({
                                "day_of_week": weekday_strs[int(weekday)],
                                "dining_option_string_id": location,
                                "menu_item_uuid": menu_item_uuid,
                                "meal_type": meal_type,
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

                            dining_option_menu_items.append([
                                weekday_strs[int(weekday)],
                                location,
                                menu_item_uuid,
                                meal_type,
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