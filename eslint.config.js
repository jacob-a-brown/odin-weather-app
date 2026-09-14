import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
	{
		files: ["**/*.js"],
		...js.configs.recommended,
		languageOptions: {
			globals: {
				...globals.browser,
			},
			ecmaVersion: 2022,
			sourceType: "module",
		},
		plugins: {
			"@stylistic": stylistic,
		},
		rules: {
			...js.configs.recommended.rules,
			semi: ["error", "always"],
			indent: ["error", "tab"],
			"@stylistic/semi": ["error", "always"],
			"@stylistic/indent": ["error", "tab"],
			"no-unused-vars": "warn",
			"no-undef": "warn",
		},
	},
]);
