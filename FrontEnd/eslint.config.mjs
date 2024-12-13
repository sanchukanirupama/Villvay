import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow `any` type (disable the rule for explicit `any` usage)
      "@typescript-eslint/no-explicit-any": "off", // Turn off the rule for `any` type

      // Allow unused variables (if you want to ignore unused vars warnings)
      "@typescript-eslint/no-unused-vars": [
        "warn", // Change to "off" to disable or "warn" to just show a warning
        {
          argsIgnorePattern: "^_", // Ignore unused variables starting with an underscore
        },
      ],
    },
  },
];

export default eslintConfig;
