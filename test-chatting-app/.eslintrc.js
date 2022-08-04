module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["airbnb-base", "plugin:node/recommended"],
  rules: {
    "import/prefer-default-export": ["off"],
  },
};
