export interface FoodTruck {
  id: string;
  name: string;
  type: "food_truck";
  coordinates: string;
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
  image_url: any; // Changed to support local images via require()
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
    id: "bandit_chowmein",
    name: "Bandit Chowmein",
    type: "food_truck",
    location: "Near 3131 S Hoover St",
    coordinates: "34.02597455921248, -118.28412523744423",
    schedule: "Mon-Sat: 12:00 PM - 10:00 PM",
    menu: ["Chow Mein", "Fried Rice", "Egg Rolls", "Wonton Soup", "Orange Chicken"],
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    description: "Authentic Asian street food"
  },
  {
    id: "brothers_tacos",
    name: "Brothers Tacos",
    type: "food_truck",
    location: "Near 975 W Jefferson Blvd",
    coordinates: "34.024839042056904, -118.28620018769318",
    schedule: "Sun-Thu: 4:00 PM - 1:00 AM, Fri-Sat: 4:00 PM - 2:00 AM",
    menu: ["Street Tacos", "Quesadillas", "Burritos", "Nachos", "Horchata"],
    image_url: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
    description: "Late-night Mexican favorites"
  },
  {
    id: "taco_stand",
    name: "Taco Stand",
    type: "food_truck",
    location: "Near 3300 S Hoover St",
    coordinates: "34.023826038630595, -118.28379544640842",
    schedule: "Mon-Sat: 7:00 PM - 3:00 AM",
    menu: ["Al Pastor Tacos", "Carnitas", "Carne Asada", "Elote", "Aguas Frescas"],
    image_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    description: "Authentic Mexican street tacos and sides"
  }
];

export const dummyCafes: Cafe[] = [
  { 
    id: '1', 
    name: 'Burger Crush (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Homegrown take-out spot with classic fast food',
    fullDescription: 'Burger Crush is a homegrown take-out spot, offering classic fast food favorites like burgers, fries and crispy chicken tenders. Located in the Ronald Tutor Campus Center.',
    hours: 'Summer: Closed', // Based on hours data showing closed during summer
    accepts: 'Dining Dollars, Meal Swipes, Credit Cards'
  },
  { 
    id: '2', 
    name: 'Café Annenberg (ANN)',
    type: 'cafe',
    coordinates: '34.0207761,-118.2870243', // Annenberg School for Communication
    description: 'Italian inspired café with coffee, gelato & pastries',
    fullDescription: 'Italian inspired café serving coffee, gelato, pastries and sandwiches. Located in the Annenberg School for Communication and Journalism building.',
    hours: 'Mon-Fri: 7:00 AM - 2:30 PM, Sat-Sun: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '3', 
    name: 'C&G Juice Co. (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Smoothies, juices and acai bowls',
    fullDescription: 'C&G Juice Co. features smoothies, juices and acai bowls located at the Ronald Tutor Campus Center. Perfect for healthy refreshments between classes.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Meal Swipes, Credit Cards'
  },
  { 
    id: '4', 
    name: 'Coffee Bean & Tea Leaf (SCA)',
    type: 'cafe',
    coordinates: '34.02359770243855, -118.28613747467519', // School of Cinematic Arts
    description: 'Premium coffee & tea beverages',
    fullDescription: 'Features deliciously made iced, hot and blended beverages as well as tasty snacks and pastries. Located at the School of Cinematic Arts.',
    hours: 'Mon-Fri: 7:00 AM - 5:00 PM, Sat-Sun: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '5', 
    name: 'Chad Tons Family Café (JFF)',
    type: 'cafe',
    coordinates: '34.0186748,-118.2824608', // Jess and John Furth Hall
    description: 'Asian cuisine, sandwiches & boba tea',
    fullDescription: 'The menu features bao, banh mi, dim sum, Asian salads, noodles, rice bowls and sushi. A diverse selection of Asian-inspired dishes.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '6', 
    name: 'Filone\'s (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Fresh pastas & classic salads',
    fullDescription: 'Filone\'s offers satisfying comfort food at its finest with fresh pastas and classic salads that are ready to go when you are.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '7', 
    name: 'Law Café (LAW)',
    type: 'cafe',
    coordinates: '34.0186,-118.2844', // Gould School of Law
    description: 'Asian bowls and boba tea',
    fullDescription: 'Located in the basement of the Law School, Law Café offers Asian bowls and boba tea. Convenient dining option for law students.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '8', 
    name: 'Literatea (TUT)',
    type: 'cafe',
    coordinates: '34.020873,-118.284744', // Tutor Hall
    description: 'Hot tea, coffee, boba tea & healthy grab & go',
    fullDescription: 'Literatea offers hot tea, coffee, boba tea, and healthy grab & go selections. A cozy spot for tea lovers and health-conscious diners.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '9', 
    name: 'Moreton Fig Café (MOR)',
    type: 'cafe',
    coordinates: '34.0201118,-118.2866089', // Moreton Fig Building
    description: 'Freshly prepared coffee and pastries',
    fullDescription: 'Moreton Fig Café features freshly prepared coffee and pastries in a stylish and welcoming setting. Perfect for a coffee break.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '10', 
    name: 'Panda Express (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Classic Chinese flavors & fresh ingredients',
    fullDescription: 'Panda Express combines classic Chinese flavors and fresh ingredients in a popular dining experience. Quick and convenient Asian cuisine.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '11', 
    name: 'Popovich Hall Café (JKP)',
    type: 'cafe',
    coordinates: '34.0189287,-118.2823315', // Popovich Hall
    description: 'Mediterranean sandwiches, wraps & acai bowls',
    fullDescription: 'Popovich Hall features Mediterranean sandwiches, wraps and salads, acai bowls and pastries. Mediterranean-inspired healthy options.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '12', 
    name: 'Rosso Oro\'s',
    type: 'cafe',
    coordinates: '34.018699,-118.281916', 
    description: 'Thin-crust pizza & Italian fare',
    fullDescription: 'Rosso Oro\'s offers thin-crust pizza and other Italian fare in a sports-themed hangout with TVs & shuffleboard. Great for game watching.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '13', 
    name: 'Slice Shop (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Crispy thin crust pizza',
    fullDescription: 'Slice Shop brings crispy thin crust pizza to campus with classic toppings including pepperoni and supreme. Quick pizza for hungry students.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '14', 
    name: 'Seeds Marketplace (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Creative salads, sandwiches & hot entrées',
    fullDescription: 'Seeds Marketplace offers creative salads, handcrafted sandwiches, comforting hot entrées, drinks, and snacks. Customize your selection or choose from our variety of fresh grab & go items.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Meal Swipes, Credit Cards'
  },
  { 
    id: '15', 
    name: 'Trojan Grounds (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Illy coffee & fresh food options',
    fullDescription: 'Step into the newly renovated Trojan Grounds, where every detail has been thoughtfully designed to enhance your experience. Featuring illy coffee and an array of fresh, flavorful food options.',
    hours: 'Mon-Fri: 11:00 AM - 7:00 PM, Sat-Sun: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '16', 
    name: 'Taco-Taco (TCC)',
    type: 'cafe',
    coordinates: '34.0204923,-118.2861761', // Trojan Campus Center
    description: 'Made-to-order Mexican-inspired dishes',
    fullDescription: 'Taco-Taco offers made-to-order Mexican-inspired dishes. Choose from a wide variety of ingredients to build your new favorite burrito, bowl, or salad.',
    hours: 'Summer: Closed',
    accepts: 'Dining Dollars, Meal Swipes, Credit Cards'
  },
  { 
    id: '17', 
    name: 'Tutor Hall Café (RTH)',
    type: 'cafe',
    coordinates: '34.0200873,-118.2898349', // Tutor Hall
    description: 'Indian cuisine, sandwiches & pastries',
    fullDescription: 'Tutor Hall Café features Indian cuisine, sandwiches, salads, pastries, coffee and tea. Diverse menu with Indian specialties.',
    hours: 'Mon-Fri: 8:00 AM - 3:00 PM, Sat-Sun: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '18', 
    name: 'McKay\'s',
    type: 'cafe',
    coordinates: '34.01915695078638, -118.28130093590039', // Heritage Hall area
    description: 'Sports-themed restaurant with breakfast buffet',
    fullDescription: 'McKay\'s is a nostalgic sports-themed restaurant featuring a daily breakfast buffet and special events on home game days. Created in homage to football coach John McKay.',
    hours: 'Mon-Fri: 6:30 AM - 11:00 AM Breakfast, 11:00 AM - 2:30 PM Lunch, Sat-Sun: Closed',
    accepts: 'Dining Dollars, Credit Cards'
  },
  { 
    id: '19', 
    name: 'The University Club',
    type: 'cafe',
    coordinates: '34.022633471500335, -118.28319663623058', // University Club Building
    description: 'Full-service restaurant for members & non-members',
    fullDescription: 'The University Club is a full-service restaurant welcoming members and non-members alike. Upscale dining experience on campus.',
    hours: 'Hours vary - Check with restaurant',
    accepts: 'Credit Cards, Discretionary Dollars'
  }
];

export const dummyDiningOptions: DiningOption[] = [
  {
    id: "parkside",
    name: "Parkside Restaurant & Grill",
    type: "dining_hall",
    image_url: require('../assets/images/parkside-logo.png'),
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
    image_url: require('../assets/images/village-logo.png'),
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
    image_url: require('../assets/images/evk-logo.png'),
    openTime: {
      Monday: { open: "07:00", close: "22:00" },
      Tuesday: { open: "07:00", close: "22:00" },
      Wednesday: { open: "07:00", close: "22:00" },
      Thursday: { open: "07:00", close: "22:00" },
      Friday: { open: "07:00", close: "22:00" },
      Saturday: { open: "09:00", close: "22:00" },
      Sunday: { open: "09:00", close: "22:00" },
    },
    categories: ["Fresh from the Farm", "Hot Line"],
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
