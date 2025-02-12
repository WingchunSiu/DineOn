import { createTheme } from "@rneui/themed";

const theme = createTheme({
    components: {
      Button: {
        buttonStyle: {
          backgroundColor: "#FF5733", // Global button color
          borderRadius: 15, // Rounded corners
          paddingVertical: 12, // Vertical padding
        },
        titleStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      Card: {
        containerStyle: {
          backgroundColor: "#F8F9FA", // Lighter background for cards
          borderRadius: 10,
          padding: 15,
        },
      },
    },
  });
  
  export default theme;