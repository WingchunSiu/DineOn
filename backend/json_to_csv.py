import json
import csv

def json_to_menu_items_csv(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    items = []
    
    for weekday, locations in data.items():
        for location, meals in locations.items():
            for meal_type, meal_items in meals.items():
                for item in meal_items:

                    quoted_labels = [f"\"{label}\"" for label in item.get("labels", [])]
                    labels_json_str = f"[{", ".join(quoted_labels)}]"

                    items.append([
                        item.get("name", ""),
                        item.get("image_url", ""),
                        item.get("category", ""),
                        item.get("featured", False),
                        labels_json_str,
                    ])
    
    with open("menu_items.csv", 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["name", "image_url", "category", "featured", "labels"])
        writer.writerows(items)

json_to_menu_items_csv("usc_dining_menus.json")