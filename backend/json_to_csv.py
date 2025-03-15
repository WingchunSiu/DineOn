import json
import csv
from uuid import uuid4

weekday_strs = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

def json_to_csv(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    menu_items = []
    dining_option_menu_items = []

    for weekday, locations in data.items():
        for location, meals in locations.items():
            for meal_type, meal_items in meals.items():
                for item in meal_items:

                    quoted_labels = [f"\"{label}\"" for label in item.get("labels", [])]
                    labels_json_str = f"[{", ".join(quoted_labels)}]"
                    menu_item_uuid = str(uuid4())

                    menu_items.append([
                        menu_item_uuid,
                        item.get("name", ""),
                        item.get("image_url", ""),
                        item.get("category", ""),
                        item.get("featured", False),
                        labels_json_str,                        
                    ])

                    dining_option_menu_items.append([
                        weekday_strs[int(weekday)],
                        location,
                        menu_item_uuid,
                        meal_type,
                    ])
    
    with open("menu_items.csv", 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["menu_item_uuid", "name", "image_url", "category", "featured", "labels"])
        writer.writerows(menu_items)

    with open("dining_option_menu_items.csv", 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["day_of_week", "dining_option_string_id", "menu_item_uuid", "meal_type"])
        writer.writerows(dining_option_menu_items)

json_to_csv("usc_dining_menus.json")