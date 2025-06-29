export interface FoodTruck {
  id: string;
  name: string;
  type: "food_truck";
  location: string; // "Outside Leavey Library"
  schedule: string; // "Usually here 11:00 AM - 3:00 PM"
  menu: string[]; // Simple array for now
  image_url: string;
  description?: string;
}

export interface Cafe {
  id: string;
  name: string;
  type: "cafe";
  coordinates: string;
  description: string;
  fullDescription: string;
  hours: string;
  accepts: string;
  image_url?: string;
}

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
  featured: boolean;
  labels?: string[];
}

export interface MealPlan {
  id: string;
  name: string;
  totalCost: number;
  swipes?: number;
  diningDollars?: number;
  description: string;
}

export const dummyFoodTrucks: FoodTruck[] = [
  {
    id: "kogi",
    name: "Kogi BBQ Truck",
    type: "food_truck",
    location: "Outside Leavey Library",
    schedule: "Usually here 11:00 AM - 3:00 PM",
    menu: ["Korean BBQ Tacos", "Kimchi Quesadilla", "Short Rib Sliders", "Spicy Pork Burrito"],
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    description: "Korean-Mexican fusion favorites"
  },
  {
    id: "grilled_cheese",
    name: "The Grilled Cheese Truck",
    type: "food_truck",
    location: "Near Trousdale Parkway",
    schedule: "Usually here 12:00 PM - 4:00 PM",
    menu: ["Classic Grilled Cheese", "Mac & Cheese Melt", "BBQ Pulled Pork Melt", "Tomato Soup"],
    image_url: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=500",
    description: "Gourmet grilled cheese sandwiches"
  },
  {
    id: "lobos_truck",
    name: "Lobos Truck",
    type: "food_truck",
    location: "Alumni Park",
    schedule: "Usually here 10:30 AM - 2:30 PM",
    menu: ["Carne Asada Burrito", "Fish Tacos", "Quesadillas", "Nachos", "Horchata"],
    image_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
    description: "Authentic Mexican street food"
  },
  {
    id: "crepe_truck",
    name: "Sweet & Savory Crepes",
    type: "food_truck",
    location: "Outside Doheny Library",
    schedule: "Usually here 9:00 AM - 2:00 PM",
    menu: ["Nutella Banana Crepe", "Ham & Cheese Crepe", "Strawberry Cream", "Chicken Caesar Crepe"],
    image_url: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=500",
    description: "Fresh made-to-order crepes"
  }
];

export const dummyCafes: Cafe[] = [
  { 
    id: '1', 
    name: 'Burger Crush (TCC)',
    type: 'cafe',
    coordinates: '34.0222,-118.2845', // Trojan Campus Center
    description: 'Gourmet burgers & shakes',
    fullDescription: 'Located in the Trojan Campus Center, Burger Crush serves up gourmet burgers, crispy fries, and hand-spun milkshakes. Perfect for a quick lunch between classes.',
    hours: 'Mon-Fri: 10:00 AM - 8:00 PM',
    accepts: 'Dining Dollars, Meal Swipes, Credit Cards'
  },
  { 
    id: '2', 
    name: 'Café Annenberg (ANN)',
    type: 'cafe',
    coordinates: '34.0214,-118.2871', // Annenberg School for Communication
    description: 'Coffee, pastries & light meals',
    fullDescription: 'A cozy café in the Annenberg School offering specialty coffee, fresh pastries, and light meals. Great study spot with plenty of seating.',
    hours: 'Mon-Fri: 7:30 AM - 6:00 PM',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '3', 
    name: 'Coffee Bean & Tea Leaf (SCA)',
    type: 'cafe',
    coordinates: '34.0235,-118.2873', // School of Cinematic Arts
    description: 'Premium coffee & tea',
    fullDescription: 'Premium coffee and tea selection at the School of Cinematic Arts. Features seasonal drinks and a variety of pastries.',
    hours: 'Mon-Fri: 7:00 AM - 7:00 PM',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '4', 
    name: 'Law School Café (LAW)',
    type: 'cafe',
    coordinates: '34.0186,-118.2844', // Gould School of Law
    description: 'Quick bites & beverages',
    fullDescription: 'Convenient café in the Law School building offering quick meals, snacks, and beverages for busy law students.',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    accepts: 'Dining Dollars, Credit Cards'
  },
];

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
];

export const menuData: Record<string, Record<string, MenuItemType[]>> = {
  parkside: {
    breakfast: [
      {
        name: "Avocado Toast",
        description: "Smashed avocado on toasted sourdough with chili flakes.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Omelete Bar",
        description: "Make your own omelete",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Bistro",
        featured: true,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
    ],
    lunch: [
      {
        name: "Grilled Chicken Bowl",
        description: "Grilled chicken with rice, beans, and vegetables.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Vegan Buddha Bowl",
        description: "Quinoa, chickpeas, avocado, and roasted vegetables.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Eurasia",
        featured: false,
      },
    ],
    dinner: [
      {
        name: "BBQ Pulled Pork Sandwich",
        description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Americana",
        featured: false,
      },
      {
        name: "Spaghetti Carbonara",
        description: "Classic Italian pasta with pancetta, egg, and parmesan.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Eurasia",
        featured: false,
      },
      {
        name: "BBQ Pulled Pork Sandwich",
        description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Pizza/Salad Bar",
        featured: false,
      }
    ],
  },
  village: {
    breakfast: [
      {
        name: "Latte",
        description: "Espresso with steamed milk and a light foam topping.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Expo",
        featured: false,
      },
      {
        name: "Avocado Toast",
        description: "Smashed avocado on toasted sourdough with chili flakes.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Deli Bar",
        featured: false,
      },
    ],
    lunch: [
      {
        name: "Caesar Salad",
        description: "Crisp romaine, parmesan, croutons, and Caesar dressing.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Plant Based",
        featured: false,
      },
      {
        name: "Teriyaki Chicken Bowl",
        description: "Grilled chicken with steamed rice and teriyaki sauce.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Flexitarian",
        featured: true,
      },
    ],
    dinner: [
      {
        name: "Crepes",
        description: "Make your own crepe.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Crepes",
        featured: true,
      },
      {
        name: "Cheeseburger",
        description: "Beef patty with melted cheese, lettuce, and tomato.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Expo",
        featured: false,
      },
    ],
  },
  evk: {
    breakfast: [
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Fresh From The Farm",
        featured: false,
      },
    ],
    lunch: [
      {
        name: "Vegetable Stir Fry",
        description: "A mix of fresh vegetables sautéed with soy sauce.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Hot Line",
        featured: false,
      },
    ],
    dinner: [
      {
        name: "Teriyaki Chicken Bowl",
        description: "Grilled chicken with steamed rice and teriyaki sauce.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Hot Line",
        featured: false,
      },
    ],
  },
  tgc: {
    breakfast: [
      {
        name: "Latte",
        description: "Espresso with steamed milk and a light foam topping.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Cafe",
        featured: false,
      },
    ],
    lunch: [
      {
        name: "Avocado Toast",
        description: "Smashed avocado on toasted sourdough with chili flakes.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Cafe",
        featured: false,
      },
    ],
    dinner: [
      {
        name: "Blueberry Muffin",
        description: "Soft, fluffy muffin with fresh blueberries.",
        image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
        category: "Cafe",
        featured: false,
      },
    ],
  },
};

export const mealPlans: MealPlan[] = [
  {
    id: "cardinal",
    name: "Cardinal Plan",
    totalCost: 4014,
    swipes: 0, // 0 indicates unlimited swipes
    description: "Unlimited Residential + 2 Campus Center swipes/week"
  },
  {
    id: "trojan", 
    name: "Trojan Plan",
    totalCost: 4605,
    diningDollars: 4605,
    description: "Dining Dollars Only"
  },
  {
    id: "flex120",
    name: "Flex120 Plan", 
    totalCost: 1975,
    swipes: 120,
    diningDollars: 150,
    description: "120 Swipes + $150 Dining Dollars"
  },
  {
    id: "community25",
    name: "Community 25",
    totalCost: 525,
    swipes: 25, 
    diningDollars: 50,
    description: "25 Swipes + $50 Dining Dollars"
  },
  {
    id: "community50", 
    name: "Community 50",
    totalCost: 975,
    swipes: 50,
    diningDollars: 100, 
    description: "50 Swipes + $100 Dining Dollars"
  },
  {
    id: "dining_block_250",
    name: "Dining Dollar Block $250",
    totalCost: 225, // 10% discount
    diningDollars: 250,
    description: "$250 Dining Dollars (10% off)"
  },
  {
    id: "dining_block_500", 
    name: "Dining Dollar Block $500",
    totalCost: 450, // 10% discount
    diningDollars: 500,
    description: "$500 Dining Dollars (10% off)"
  }
];

export const standardPrices = {
  breakfast: 15.99,
  lunch: 18.99, 
  dinner: 19.99
};
