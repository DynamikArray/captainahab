export const fieldRules = {
  ethAmount: [
    (v) => !!v || "Eth Amount is a required field",
    (v) => !!Number(v) > 0 || "Eth Amount must be greater than zero or is not a number",
  ],
  blocks: [
    (v) => !!v || "Blocks is a required field",
    (v) => !!Number(v) > 0 || "Blocks must be greater than zero or is not a number",
    (v) => {
      if (v > 250) return "Blocks must be less than 250 or is not a number ";
      return true;
    },
  ],
};
