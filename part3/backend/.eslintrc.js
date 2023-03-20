module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: 0,
    quotes: ["error", "double"],
    "no-console": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
  },
};