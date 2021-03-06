module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "svelte3", "jest"],
  rules: {},
  overrides: [
    {
      files: ["**/*.ts", "**/*.js"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/prefer-as-const": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["**/__tests__/**/*.ts*"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        // "@typescript-eslint/no-unused-vars": "off",
      },
    },
    {
      files: ["packages/db-migrations/migrations/*.js"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
    // {
    //   files: ["**/components/**/_*.ts"],
    //   rules: {
    //     "@typescript-eslint/no-unused-vars": "off",
    //   },
    // },
  ],
};
