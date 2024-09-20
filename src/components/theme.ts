import { extendTheme } from "@chakra-ui/react";

export const primaryColor = () => {
  return "#42AA58";
};

export const secondaryColor = () => {
  return "#FF9228";
};
export const backgroundColor = () => {
  return "#F8F9FA";
};
export const primaryTextColor = () => {
  return "000000";
};
export const primaryTextTitleColor = () => {
  return "#C58E24";
};
export const secondaryTextColor = () => {
  // return "#FF9228";
  return "#A0AEC0";
};

export const backgroundContainer = () => {
  return "#FFFFFF";
};
export const backgroundContainer2 = () => {
  return "rgba(233, 237, 247, 1)";
};

export const selectedItem = () => {
  return "#F8F9FA";
};
export const borderColor = () => {
  return "#A0AEC0";
};
export const customBorder = () => {
  return "1px solid #E9EDF7";
};
export const borderWhite = () => {
  return "1px solid #E9EDF7";
};
export const inputColor = () => {
  return "#2D3748";
};
export const inputBackgroundColor = () => {
  return "#F8F9FA";
};
export const primaryButtonColor = () => {
  return "#42AA58";
};

export const gradientColor = () => "linear-gradient(90deg, #3EA955 50%, #D8F285 126.52%)";
export const borderRadius = () => "14px";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontSize: "14px",
      },
    },
  },
  colors: {
    green: {
      500: "#42AA58",
    },
    red: {
      500: "rgba(221, 114, 114, 1)",
    },
  },
  fonts: {
    heading: "Lato",
    body: "Lato",
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: borderRadius(),
      },
      sizes: {
        md: {
          fontSize: "14px",
        },
      },
      defaultProps: {
        colorScheme: "green",
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: borderRadius(),
        },
      },
      defaultProps: {
        focusBorderColor: primaryColor(),
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: borderRadius(),
        },
      },
      defaultProps: {
        focusBorderColor: primaryColor(),
      },
    },
    Modal: {
      defaultProps: {
        size: "xl",
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: "green",
      },
    },
  },
});
