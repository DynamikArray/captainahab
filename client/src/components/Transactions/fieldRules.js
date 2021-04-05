export const fieldRules = {
  minEth: [(v) => !!Number(v) > 0 || "Not a valid number"],
  maxEth: [(v) => !!Number(v) > 0 || "Not a valid number"],
};
