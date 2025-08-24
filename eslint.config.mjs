// eslint.config.js (or .mjs if you prefer)
import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginPrettier from 'eslint-plugin-prettier'
import prettier from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist/**'], // ✅ ignore build folder
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.flat.recommended.rules, // React recommended rules
      'prettier/prettier': 'error', // Prettier formatting
    },
    settings: {
      react: {
        version: 'detect', // auto-detect React version
      },
    },
    extends: [js.configs.recommended, prettier],
  },
  {
    files: ['webpack.config.js'], // ✅ treat webpack config as Node.js
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
])
