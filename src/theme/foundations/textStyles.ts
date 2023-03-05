const getStyle = () => ({
  fontWeight: "bold",
  lineHeight: "110%",
});

const textStyles = {
  title: {
    ...getStyle(),
    fontSize: ["36px", "48px", "56px", "72px"],
    letterSpacing: ["-2px", "-3px", "-4px", "-5px"],
  },

  h1: {
    ...getStyle(),
    fontSize: ["36px", "48px"],
    letterSpacing: ["-1px", "-2px", "-3px"],
  },
  h2: {
    ...getStyle(),
    fontSize: ["28px", "36px"],
    letterSpacing: [0, "-1px", "-2px"],
  },

  h3: {
    ...getStyle(),
    fontSize: ["24px", "28px"],
  },
  h4: {
    ...getStyle(),
    fontSize: ["20px", "24px"],
  },
  h5: {
    ...getStyle(),
    fontSize: ["16px", "20px"],
  },

  h6: {
    ...getStyle(),
    fontSize: ["16px"],
  },
};

export default textStyles;
