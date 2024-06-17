module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh"],
  rules: {
    // "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};

// TODO: REMOVE THE BELOW

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "plugin:react/recommended",
//     "plugin:@typescript-eslint/recommended",
//     "plugin:import/recommended",
//     "plugin:import/typescript",
//     "plugin:jsx-a11y/recommended",
//     "plugin:prettier/recommended",
//   ],
//   parser: "@typescript-eslint/parser",
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 12,
//     sourceType: "module",
//   },
//   plugins: ["react", "@typescript-eslint", "import", "jsx-a11y", "prettier"],
//   settings: {
//     react: {
//       version: "detect",
//     },
//     "import/resolver": {
//       alias: {
//         map: [
//           ["@components", "./src/components"],
//           ["@pages", "./src/pages"],
//           ["@utils", "./src/utils"],
//         ],
//         extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
//       },
//       typescript: {},
//     },
//   },
//   rules: {
//     "prettier/prettier": ["error"],
//     "react/react-in-jsx-scope": "off",
//     "react/prop-types": "off",
//     "@typescript-eslint/explicit-module-boundary-types": "off",
//     "import/no-unresolved": "error",
//   },
// };
