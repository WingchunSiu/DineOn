import datetime
import requests
from bs4 import BeautifulSoup
import json


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

# Function to scrape a single dining hall's menu
def scrape_menu(dining_hall_id, url):
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')

    menu_data = {dining_hall_id: {}}

    meals = soup.find_all("h3")  # Find meal sections (e.g., Breakfast, Lunch, Dinner)

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

                    description = ", ".join(allergens) if allergens else ""

                    menu_item = {
                        "name": name,
                        "description": description,
                        "image_url": "",
                        "category": section_name,
                        "featured": False
                    }
                    items.append(menu_item)

            menu_data[dining_hall_id][meal_type].extend(items)
            section = section.find_next_sibling("h4")

    return menu_data


# Function to scrape all dining halls for the next 3 days
def scrape_multiple_days():
    all_data = {}

    start_date = datetime.date.today()
    days_to_scrape = 3

    for i in range(days_to_scrape):
        date = (start_date + datetime.timedelta(days=i)).strftime("%B+%-d%%2C+%Y")  # Convert to format: March+4%2C+2025
        print(f"Scraping menus for {date}")

        for hall in DINING_HALLS:
            dining_hall_id = hall["id"]
            menu_url = hall["menu_url"].replace("{date}", date)

            print(f"Scraping {hall['name']} for {date}...")
            menu_data = scrape_menu(dining_hall_id, menu_url)

            # Store the data by date
            if date not in all_data:
                all_data[date] = {}

            all_data[date].update(menu_data)

    return all_data


# Run scraper & save results
menu_results = scrape_multiple_days()

with open("usc_dining_menus.json", "w") as f:
    json.dump(menu_results, f, indent=4)

