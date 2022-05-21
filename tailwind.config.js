module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sfpro: ["SF Pro Display", "sans-serif"],
      },
      colors: {
        system: {
          blue: "#007AFF",
          gray: {
            1: "#8E8E93",
            2: "#AEAEB2",
            5: "#E5E5EA",
            6: "#F2F2F7",
            7: "#2C2C2E",
            chat: "#E9E9EB",
          },
        },
      },
    },
  },
  plugins: [],
};
