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
        color: theme.colors.whiteAlpha[900],
      },

      ".swiper": {
        transition: `${theme.transition.property.background} ${theme.transition.duration.normal} ease-in-out`,
        paddingBottom: 0,
      },

      ".swiper-autoheight .swiper-wrapper": {
        alignItems: "center",
      },

      ".swiper-pagination": {
        background: theme.colors.blackAlpha[800],
        color: "white",
        width: "fit-content",
        left: "50%",
        borderRadius: "2px",
        transform: "translate(-50%, 0)",
        padding: `${theme.space[1]} ${theme.space[4]}`,
      },

      ".swiper-button-next, .swiper-button-prev ": {
        background: theme.colors.gray[900],
        padding: theme.space[6],
        transform: "scale(0.8)",
        borderRadius: "2px",
        top: "48%",
        transition: `all ${theme.transition.duration.normal} ease-in-out`,
        color: theme.colors.whiteAlpha[900],
        pointerEvents: "all !important",
        "&:hover": {
          background: theme.colors.gray[800],
        },
        "&:active": {
          background: theme.colors.gray[700],
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
