export const fieldRules = {
  ethAmount: [(v) => !!v || "Eth Amount is a required field", (v) => !!Number(v) > 0 || "Not a valid number"],
  blocks: [
    (v) => !!v || "Blocks is a required field",
    (v) => !!Number(v) > 0 || "Blocks must be greater than zero or is not a number",
    (v) => {
      if (v > 5000) return "Blocks must be less than 5000 or is not a number ";
      return true;
    },
  ],
};
