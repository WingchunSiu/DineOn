
export interface DiningOption {
  id: string;
  name: string;
  type: "dining_hall" | "cafe";
  image_url: string;
  openTime: string;
}

export interface MenuItemType {
  name: string;
  description: string;
  image_url: string;
}

export const dummyDiningOptions: DiningOption[] = [
  {
    id: "parkside",
    name: "Parkside Restaurant & Grill",
    type: "dining_hall",
    image_url: "https://dailytrojan.com/wp-content/uploads/2021/10/ParksideDining_090321_SarahCortina_E003-scaled.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
  {
    id: "village",
    name: "Village Dining Hall",
    type: "dining_hall",
    image_url: "https://hospitality.usc.edu/wp-content/uploads/2017/07/01_usc_village_dining_hall.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
  {
    id: "evk",
    name: "Everybody's Kitchen",
    type: "dining_hall",
    image_url: "https://hospitality.usc.edu/wp-content/uploads/2015/06/03_evk_slider.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
  {
    id: "tgc",
    name: "Trojan Grounds Cafe",
    type: "cafe",
    image_url: "https://example.com/trojan-grounds.jpg",
    openTime: "7:00 AM - 11:00 PM"
  },
];

export const menuData: Record<string, MenuItemType[]> = {
  parkside: [
    {
      name: "Grilled Chicken Bowl",
      description: "Grilled chicken with rice, beans, and vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegan Buddha Bowl",
      description: "Quinoa, chickpeas, avocado, and roasted vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "BBQ Pulled Pork Sandwich",
      description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      description: "Classic Italian pasta with pancetta, egg, and parmesan.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Margherita Pizza",
      description: "Tomato sauce, mozzarella, and fresh basil on a thin crust.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine, parmesan, croutons, and Caesar dressing.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Teriyaki Chicken Bowl",
      description: "Grilled chicken with steamed rice and teriyaki sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      description: "A mix of fresh vegetables sautéed with soy sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Cheeseburger",
      description: "Beef patty with melted cheese, lettuce, and tomato.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Grilled Chicken Bowl",
      description: "Grilled chicken with rice, beans, and vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegan Buddha Bowl",
      description: "Quinoa, chickpeas, avocado, and roasted vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "BBQ Pulled Pork Sandwich",
      description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      description: "Classic Italian pasta with pancetta, egg, and parmesan.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Margherita Pizza",
      description: "Tomato sauce, mozzarella, and fresh basil on a thin crust.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine, parmesan, croutons, and Caesar dressing.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Teriyaki Chicken Bowl",
      description: "Grilled chicken with steamed rice and teriyaki sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      description: "A mix of fresh vegetables sautéed with soy sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Cheeseburger",
      description: "Beef patty with melted cheese, lettuce, and tomato.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
  ],
  village: [
    {
      name: "Grilled Chicken Bowl",
      description: "Grilled chicken with rice, beans, and vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegan Buddha Bowl",
      description: "Quinoa, chickpeas, avocado, and roasted vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "BBQ Pulled Pork Sandwich",
      description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      description: "Classic Italian pasta with pancetta, egg, and parmesan.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Margherita Pizza",
      description: "Tomato sauce, mozzarella, and fresh basil on a thin crust.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine, parmesan, croutons, and Caesar dressing.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Teriyaki Chicken Bowl",
      description: "Grilled chicken with steamed rice and teriyaki sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      description: "A mix of fresh vegetables sautéed with soy sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Cheeseburger",
      description: "Beef patty with melted cheese, lettuce, and tomato.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },{
      name: "Grilled Chicken Bowl",
      description: "Grilled chicken with rice, beans, and vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegan Buddha Bowl",
      description: "Quinoa, chickpeas, avocado, and roasted vegetables.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "BBQ Pulled Pork Sandwich",
      description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Spaghetti Carbonara",
      description: "Classic Italian pasta with pancetta, egg, and parmesan.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Margherita Pizza",
      description: "Tomato sauce, mozzarella, and fresh basil on a thin crust.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine, parmesan, croutons, and Caesar dressing.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Teriyaki Chicken Bowl",
      description: "Grilled chicken with steamed rice and teriyaki sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      description: "A mix of fresh vegetables sautéed with soy sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Cheeseburger",
      description: "Beef patty with melted cheese, lettuce, and tomato.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
  ],
  evk: [
    {
      name: "Teriyaki Chicken Bowl",
      description: "Grilled chicken with steamed rice and teriyaki sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      description: "A mix of fresh vegetables sautéed with soy sauce.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Cheeseburger",
      description: "Beef patty with melted cheese, lettuce, and tomato.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
  ],
  tgc: [
    {
      name: "Latte",
      description: "Espresso with steamed milk and a light foam topping.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Blueberry Muffin",
      description: "Soft, fluffy muffin with fresh blueberries.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
    {
      name: "Avocado Toast",
      description: "Smashed avocado on toasted sourdough with chili flakes.",
      image_url: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    },
  ],
};
