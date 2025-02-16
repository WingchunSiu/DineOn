import { DiningOption } from "./types";


export const getStatus = (diningOption: DiningOption) => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" }); // Get current day name (Monday, Tuesday, etc.)
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert time to minutes

  const { open, close } = diningOption.openTime[day];
  const openTime = parseInt(open.split(":")[0]) * 60 + parseInt(open.split(":")[1]); // Convert to minutes
  const closeTime = parseInt(close.split(":")[0]) * 60 + parseInt(close.split(":")[1]); // Convert to minutes

  if (currentTime < openTime) {
    return { text: "Closed", color: "red" };
  } else if (currentTime >= closeTime) {
    return { text: "Closed", color: "red" };
  } else if (currentTime >= closeTime - 30) {
    return { text: "Closing Soon", color: "#FFA500" };
  } else {
    return { text: "Open", color: "green" };
  }
};

// Breakfast 7 to 11, Lunch 11 to 4, Dinner 4 to 10
export const getTimeOfDay = () => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

  if (currentTime < 11 * 60) {
    return "breakfast";
  } else if (currentTime < 16 * 60) {
    return "lunch";
  } else {
    return "dinner";
  }
};
