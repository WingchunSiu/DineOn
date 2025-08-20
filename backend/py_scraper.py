import datetime
import requests
from bs4 import BeautifulSoup
import json
import asyncio
from playwright.async_api import async_playwright


# Updated dining halls for new website structure
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

# Function to scrape a single dining hall's menu using Playwright
async def scrape_menu_with_playwright(page, dining_hall_id, data_value, target_date):
    """Scrape menu using Playwright for dynamic content"""
    menu_data = {dining_hall_id: {}}
    
    try:
        # Navigate to the main menu page
        await page.goto(BASE_URL, timeout=60000, wait_until='domcontentloaded')
        
        # Wait for the page to fully load
        await page.wait_for_timeout(3000)
        
        # Click the venue button using the data-value attribute
        venue_button_selector = f'button[data-value="{data_value}"]'
        try:
            venue_button = page.locator(venue_button_selector)
            if await venue_button.count() > 0:
                await venue_button.click()
                print(f"Successfully clicked venue button for {dining_hall_id}")
                await page.wait_for_timeout(1000)  # Wait for venue to load
            else:
                print(f"Could not find venue button with selector: {venue_button_selector}")
                return menu_data
        except Exception as e:
            print(f"Error clicking venue button: {e}")
            return menu_data
        
        # Set the date using the date input
        date_str = target_date.strftime("%Y-%m-%d")
        try:
            date_input = page.locator('#date')
            await date_input.fill(date_str)
            print(f"Successfully set date to {date_str}")
            
            # Trigger change event to load new content
            await date_input.evaluate('el => el.dispatchEvent(new Event("change", { bubbles: true }))')
            await page.wait_for_timeout(2000)  # Wait for date change to load content
        except Exception as e:
            print(f"Error setting date: {e}")
        
        # Try different meal types to get all menu content
        # Remove empty string to avoid duplicates from "All Menus" option
        meal_options = ['breakfast', 'lunch', 'dinner', 'brunch']
        
        for meal_option in meal_options:
            try:
                # Set the meal selector
                meal_selector = page.locator('#meal')
                await meal_selector.select_option(meal_option)
                print(f"Selected meal: {meal_option if meal_option else 'All Menus'}")
                
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
                    print(f"No results loaded for {meal_option if meal_option else 'All Menus'}")
                    continue
                
                # Get the current page content
                content = await page.content()
                soup = BeautifulSoup(content, 'html.parser')
                
                # Find the results div
                results_div = soup.find('div', class_='results')
                if not results_div:
                    print(f"No results div found for {meal_option if meal_option else 'All Menus'}")
                    continue
                
                print(f"Found results div with content for {meal_option if meal_option else 'All Menus'}")
                
                # Parse the actual menu structure based on the provided HTML example
                # Look for meal containers
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
                    
                    print(f"Processing meal container: {meal_type}")
                    
                    # Find all stations within this meal
                    stations_div = meal_container.find('div', class_='stations')
                    if stations_div:
                        stations = stations_div.find_all('div', class_='station')
                        
                        for station in stations:
                            # Get station/section name
                            station_title = station.find('p', class_='title')
                            section_name = station_title.get_text().strip() if station_title else "Main"
                            
                            print(f"Found station: {section_name}")
                            
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
                                                import json
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
                                        
                                        # Check for duplicates before adding
                                        existing_items = [item["name"] for item in menu_data[dining_hall_id][meal_type]]
                                        if item_name not in existing_items:
                                            menu_data[dining_hall_id][meal_type].append(menu_item)
                                            print(f"Added item: {item_name} to {meal_type} - {section_name}")
                                        else:
                                            print(f"Skipped duplicate: {item_name} in {meal_type}")
                
                # If no meal containers found, try the old parsing method as fallback
                if not meal_containers:
                    print("No meal containers found, trying fallback parsing...")
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
                            # Check for duplicates in fallback method too
                            existing_items = [item["name"] for item in menu_data[dining_hall_id][current_meal_type]]
                            if item_name not in existing_items:
                                menu_data[dining_hall_id][current_meal_type].append(menu_item)
                                print(f"Added fallback item: {item_name}")
                            else:
                                print(f"Skipped duplicate fallback: {item_name}")
                
            except Exception as e:
                print(f"Error processing meal option {meal_option}: {e}")
                continue
        
        # Debug: Print summary of what was found
        total_items = sum(len(meals) for meals in menu_data[dining_hall_id].values())
        print(f"Total items found for {dining_hall_id}: {total_items}")
        for meal_type, items in menu_data[dining_hall_id].items():
            print(f"  {meal_type}: {len(items)} items")
                
    except Exception as e:
        print(f"Error scraping {dining_hall_id}: {e}")
        import traceback
        traceback.print_exc()
        
    return menu_data

# Legacy function kept for reference
def scrape_menu_legacy(dining_hall_id, url):
    """Legacy scraper for old website structure"""
    r = requests.get(url)
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


# Function to scrape all dining halls for the next 3 days using Playwright
async def scrape_multiple_days_async():
    """New async scraper using Playwright"""
    all_data = {}
    
    async with async_playwright() as p:
        # Launch browser with debugging options
        browser = await p.chromium.launch(
            headless=True,  # Set to False for debugging
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
        days_to_scrape = 3
        
        for i in range(days_to_scrape):
            date = start_date + datetime.timedelta(days=i)
            day_of_week = date.weekday()
            print(f"Scraping menus for {date.strftime('%Y-%m-%d')}")
            
            for hall in DINING_HALLS:
                dining_hall_id = hall["id"]
                data_value = hall["data_value"]
                
                print(f"Scraping {hall['name']} for {date.strftime('%Y-%m-%d')}...")
                menu_data = await scrape_menu_with_playwright(page, dining_hall_id, data_value, date)
                
                # Store the data by date
                if day_of_week not in all_data:
                    all_data[day_of_week] = {}
                
                all_data[day_of_week].update(menu_data)
        
        await browser.close()
    
    return all_data

# Legacy function for old website
def scrape_multiple_days_legacy():
    """Legacy scraper for old website structure"""
    all_data = {}

    start_date = datetime.date.today()
    days_to_scrape = 3

    for i in range(days_to_scrape):
        date = start_date + datetime.timedelta(days=i)
        day_of_week = date.weekday()
        date_str = date.strftime("%B+%-d%%2C+%Y")
        print(f"Scraping menus for {date_str}")

        for hall in DINING_HALLS:
            dining_hall_id = hall["id"]
            # Reconstruct old URL format for legacy function (using placeholder venue_id)
            venue_id = "514" if hall["id"] == "evk" else "518" if hall["id"] == "parkside" else "27229"
            menu_url = f"https://hospitality.usc.edu/residential-dining-menus/?menu_venue=venue-{venue_id}&menu_date={date_str}"

            print(f"Scraping {hall['name']} for {date_str}...")
            menu_data = scrape_menu_legacy(dining_hall_id, menu_url)

            if day_of_week not in all_data:
                all_data[day_of_week] = {}

            all_data[day_of_week].update(menu_data)

    return all_data

# Main execution
if __name__ == "__main__":
    try:
        print("Attempting to use Playwright scraper...")
        menu_results = asyncio.run(scrape_multiple_days_async())
    except ImportError:
        print("Playwright not installed. Install with: pip install playwright && python -m playwright install")
        print("Falling back to legacy scraper (may not work with new website)...")
        menu_results = scrape_multiple_days_legacy()
    except Exception as e:
        print(f"Playwright scraper failed: {e}")
        print("Falling back to legacy scraper...")
        menu_results = scrape_multiple_days_legacy()
    
    with open("usc_dining_menus.json", "w") as f:
        json.dump(menu_results, f, indent=4)
    
    print("Scraping completed. Results saved to usc_dining_menus.json")

