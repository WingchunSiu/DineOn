
export interface DiningOption {
  id: string;
  name: string;
  type: "dining_hall" | "cafe";
  image_url: string;
  openTime: {[key: string]: { open: string; close: string };};
  categories: string[];
}

export interface MenuItemType {
  name: string;
  description: string;
  image_url: string;
  category: string;
}

export const dummyDiningOptions: DiningOption[] = [
  {
    id: "parkside",
    name: "Parkside Restaurant & Grill",
    type: "dining_hall",
    image_url: "https://dailytrojan.com/wp-content/uploads/2021/10/ParksideDining_090321_SarahCortina_E003-scaled.jpg",
    openTime: {
      Monday: { open: "07:00", close: "22:00" },
      Tuesday: { open: "07:00", close: "22:00" },
      Wednesday: { open: "07:00", close: "22:00" },
      Thursday: { open: "07:00", close: "22:00" },
      Friday: { open: "07:00", close: "22:00" },
      Saturday: { open: "09:00", close: "22:00" },
      Sunday: { open: "09:00", close: "22:00" },
    },
    categories: ["Bistro", "Pizza/Salad Bar", "Americana", "Eurasia", "Allergen Awareness Zone (Must Register)"],
  },
  {
    id: "village",
    name: "Village Dining Hall",
    type: "dining_hall",
    image_url: "https://hospitality.usc.edu/wp-content/uploads/2017/07/01_usc_village_dining_hall.jpg",
    openTime: {
      Monday: { open: "07:00", close: "22:00" },
      Tuesday: { open: "07:00", close: "22:00" },
      Wednesday: { open: "07:00", close: "22:00" },
      Thursday: { open: "07:00", close: "22:00" },
      Friday: { open: "07:00", close: "22:00" },
      Saturday: { open: "09:00", close: "22:00" },
      Sunday: { open: "09:00", close: "22:00" },
    },
    categories: ["Flexitarian", "Salad Bar", "Deli Bar", "Expo", "Plant Based", "Breakfast/Dessert/Fruit", "Mezze Bar", "Crepes"],
  },
  {
    id: "evk",
    name: "Everybody's Kitchen",
    type: "dining_hall",
    image_url: "https://hospitality.usc.edu/wp-content/uploads/2015/06/03_evk_slider.jpg",
    openTime: {
      Monday: { open: "07:00", close: "22:00" },
      Tuesday: { open: "07:00", close: "22:00" },
      Wednesday: { open: "07:00", close: "22:00" },
      Thursday: { open: "07:00", close: "22:00" },
      Friday: { open: "01:00", close: "03:10" },
      Saturday: { open: "09:00", close: "22:00" },
      Sunday: { open: "09:00", close: "22:00" },
    },
    categories: ["Fresh From The Farm", "Hot Line"],
  },
  {
    id: "tgc",
    name: "Trojan Grounds Cafe",
    type: "cafe",
    image_url: "https://dailytrojan.com/wp-content/uploads/2025/01/01_17_TrojanGrounds_Mallory_Snyder_5-scaled.jpg",
    openTime: {
      Monday: { open: "07:00", close: "22:00" },
      Tuesday: { open: "07:00", close: "22:00" },
      Wednesday: { open: "07:00", close: "22:00" },
      Thursday: { open: "07:00", close: "22:00" },
      Friday: { open: "00:00", close: "24:00" },
      Saturday: { open: "00:00", close: "22:00" },
      Sunday: { open: "09:00", close: "22:00" },
    },
    categories: ["Cafe"],
  },
];

export const menuData: Record<string, Record<string, MenuItemType[]>> = {
  parkside: {
    Breakfast: [
      {
        name: "Avocado Toast",
        description: "Smashed avocado on toasted sourdough with chili flakes.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
      },
      {
        name: "Omelete Bar",
        description: "Make your own omelete",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Bistro",
      },
      {
        name: "Breakfast",
        description: "Some breakfast.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
      },
      {
        name: "Breakfast",
        description: "Some breakfast.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
      }
    ],
    Lunch: [
      {
        name: "Grilled Chicken Bowl",
        description: "Grilled chicken with rice, beans, and vegetables.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
      },
      {
        name: "Vegan Buddha Bowl",
        description: "Quinoa, chickpeas, avocado, and roasted vegetables.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Eurasia",
      },
    ],
    Dinner: [
      {
        name: "BBQ Pulled Pork Sandwich",
        description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
      },
      {
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta with pancetta, egg, and parmesan.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Eurasia",
      },
      {
        name: "BBQ Pulled Pork Sandwich",
        description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Pizza/Salad Bar",
      }
    ],
  },
  village: {
    Breakfast: [
      {
        name: "Latte",
        description: "Espresso with steamed milk and a light foam topping.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Expo",
      },
      {
        name: "Avocado Toast",
        description: "Smashed avocado on toasted sourdough with chili flakes.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Deli Bar",
      },
    ],
    Lunch: [
      {
        name: "Caesar Salad",
        description: "Crisp romaine, parmesan, croutons, and Caesar dressing.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Plant Based",
      },
      {
        name: "Teriyaki Chicken Bowl",
        description: "Grilled chicken with steamed rice and teriyaki sauce.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Flexitarian",
      },
    ],
    Dinner: [
      {
        name: "Crepes",
        description: "Make your own crepe.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Crepes",
      },
      {
        name: "Cheeseburger",
        description: "Beef patty with melted cheese, lettuce, and tomato.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Expo",
      },
    ],
  },
  evk: {
    Breakfast: [
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Hot Line",
      },
    ],
    Lunch: [
      {
        name: "Vegetable Stir Fry",
        description: "A mix of fresh vegetables sautéed with soy sauce.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Hot Line",
      },
    ],
    Dinner: [
      {
        name: "Teriyaki Chicken Bowl",
        description: "Grilled chicken with steamed rice and teriyaki sauce.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Hot Line",
      },
    ],
  },
  tgc: {
    Breakfast: [
      {
        name: "Latte",
        description: "Espresso with steamed milk and a light foam topping.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Cafe",
      },
    ],
    Lunch: [
      {
        name: "Avocado Toast",
        description: "Smashed avocado on toasted sourdough with chili flakes.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Cafe",
      },
    ],
    Dinner: [
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Cafe",
      },
    ],
  },
};
