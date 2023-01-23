import { Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: ({ theme }) => {
    return {
      "ul, ol": {
        width: "100%",
        paddingLeft: theme.space[6],
      },

      ".swiper-pagination-bullet": {
        background: theme.colors.blackAlpha[700],
      },

      ".swiper": {
        transition: `${theme.transition.property.background} ${theme.transition.duration.normal} ease-in-out`,
        paddingBottom: 0,
      },

      ".swiper-pagination": {
        transform: "translate(-50%, 50%) !important",
      },

      ".swiper-button-next, .swiper-button-prev ": {
        background: theme.colors.blackAlpha[500],
        padding: theme.space[6],
        transform: "scale(0.8)",
        borderRadius: "2px",
        top: "48%",
        transition: `all ${theme.transition.duration.normal} ease-in-out`,
        color: theme.colors.whiteAlpha[900],
        pointerEvents: "all !important",
        "&:hover": {
          transform: "scale(0.9)",
          background: theme.colors.blackAlpha[700],
        },
      },

      ".swiper-button-prev ": {
        left: theme.space[1],
        "&:after": {
          paddingRight: theme.space[1],
          fontSize: theme.fontSizes.xl,
          fontWeight: "bolder",
        },
      },

      ".swiper-button-next ": {
        right: theme.space[1],
        "&:after": {
          paddingLeft: theme.space[1],
          fontSize: theme.fontSizes.xl,
          fontWeight: "bolder",
        },
      },
    };
  },
};

export default styles;
