import datetime
import requests
from bs4 import BeautifulSoup
import json


def scrape_menu(option, url):
    # Send GET request to URL
    r = requests.get(url)
    
    # Parse HTML content
    soup = BeautifulSoup(r.content, 'html5lib')
    
    # Find all menu sections
   
    
    menu_data = {
        "date_scraped": str(datetime.date.today()),
        "dining_hall": dining_hall,
        "menu": {},
    }
    
    menu_sections = soup.find_all("h3")
    
    meals = soup.find_all("h3")

    for meal in meals:
        meal_type = meal.text.strip()
        menu_data["menu"][meal_type] = {}

        # 🔹 Find all food sections (Eurasia, Americana, Salad Bar, etc.)
        section = meal.find_next_sibling("h4")

        while section and section.name == "h4":
            section_name = section.text.strip()
            items = []

            # 🔹 Find all menu items under this section
            list_items = section.find_next_sibling("ul")

            if list_items:
                for li in list_items.find_all("li"):
                    items.append(li.text.strip())

            menu_data["menu"][meal_type][section_name] = items

            # Move to the next section
            section = section.find_next_sibling("h4")

    return menu_data
