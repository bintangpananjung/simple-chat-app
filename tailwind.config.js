const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-style::-webkit-scrollbar": {
          width: "7px",
        },

        ".scrollbar-style::-webkit-scrollbar-track": {
          background: "transparent",
        },

        ".scrollbar-style::-webkit-scrollbar-thumb": {
          background: "#8480c4",
          "border-radius": "4px",
          transition: "100ms",
        },

        ".scrollbar-style::-webkit-scrollbar-thumb:hover": {
          background: "#48466D",
        },
      });
    }),
  ],
};
