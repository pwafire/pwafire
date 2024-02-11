// eslint-disable-next-line no-undef
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    // Add your custom rules here
    "@typescript-eslint/no-explicit-any": "off",
  },
};
