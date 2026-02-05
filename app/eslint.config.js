import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default defineConfig([
  globalIgnores(['dist', 'src/components/ui/*']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked, //stricter rules use strictTypeChecked
      tseslint.configs.stylisticTypeChecked, //stylistic rules
      ...pluginQuery.configs['flat/recommended'], // tanstack rules
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@tanstack/query': pluginQuery, // tanstack plugin
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
