module.exports = {
  files: ["**/*.js"],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "script",
    globals: {
      process: "readonly",
      module: "readonly",
      require: "readonly",
      console: "readonly",
      __dirname: "readonly",
      Buffer: "readonly",
      setTimeout: "readonly",
      clearTimeout: "readonly",
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  rules: {
    "no-unused-vars": ["warn"],
    "no-undef": "error",
    "no-console": "off",
  },
};
