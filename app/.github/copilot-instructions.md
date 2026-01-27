# Copilot Instructions: Sliced UI React Application

## Project Structure

- **src/**: Main source code directory.
  - **components/**: Shared React components.
    - **ui/**: Reusable UI primitives (e.g., button, spinner).
    - Other components (e.g., AuthGuard) for app logic.
  - **hooks/**: Custom React hooks (e.g., useHello).
  - **lib/**: Utility and API client code.
  - **pages/**: Top-level route components (e.g., HomePage, DashboardPage).
  - **stores/**: State management (e.g., useAuthStore for authentication state).
  - **index.css**: Global styles.
  - **main.tsx**: App entry point, renders the root component.
  - **App.tsx**: Main app layout and routing logic.

## Conventions

- Written in **TypeScript**.
- Uses **Vite** for development/build (see vite.config.ts).
- Follows modular, component-based design.
- UI primitives are in `src/components/ui/` and should be stateless and reusable.
- Page components in `src/pages/` represent routes/views.
- State is managed via hooks in `src/stores/` (e.g., Zustand or similar pattern).
- API calls and utilities are in `src/lib/`.
- Use functional components and hooks throughout.
- Prefer CSS modules or global styles in `index.css`.
- Hooks should be used to organise API calls (e.g., `useProjects` for fetching project data)
- Hooks that call the API should use 'api-client.ts' in 'lib' to make the actual requests.

## Best Practices

- Keep components small and focused.
- Reuse UI primitives for consistency.
- Place business logic in hooks or lib, not in UI components.
- Use TypeScript types for props, state, and API data.
- Organize new code according to this structure for maintainability.

## Important Libraries Used

- **React** & **React DOM**: Core UI library and DOM rendering.
- **React Router DOM**: Routing and navigation.
- **Zustand**: State management via hooks.
- **SWR**: Data fetching and caching.
- **lucide-react**: Icon library.
- **Tailwind CSS**: Utility-first CSS framework (with **@tailwindcss/vite** for Vite integration).
- **TypeScript**: Static typing for JavaScript.
- **ESLint**: Linting and code quality.
- **@my-project/shared-ui**: Local shared UI library (monorepo style).
