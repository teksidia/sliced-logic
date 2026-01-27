1. Initialize shared-ui as a Package
Navigate to your shared-ui folder and create a package.json. This makes the folder "visible" to your other projects as a module.

Bash
cd shared-ui
npm init -y
Edit the shared-ui/package.json to give it a name and define the entry point:

JSON
{
  "name": "@my-project/shared-ui",
  "version": "0.0.1",
  "main": "./index.ts",
  "dependencies": {
    "lucide-react": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  }
}
2. Link the Package to Your Apps
Now, you need to tell your Astro and React apps to use this folder as a library. You can do this using NPM/PNPM Workspaces or a File Reference.

Using File References (Simplest for Aspire)
In both web-marketing/package.json and web-app/package.json, add the shared folder as a dependency:

JSON
"dependencies": {
  "@my-project/shared-ui": "file:../shared-ui",
  ...
}
Run npm install in each app folder after adding this.

3. Configure the shadcn CLI
When you run the shadcn CLI inside shared-ui, it will now see the package.json and automatically add any needed dependencies (like @radix-ui/react-checkbox) directly to shared-ui/package.json.

To add a component:

Bash
cd shared-ui
npx shadcn@latest add checkbox
The CLI will handle the code and the dependencies. Because your apps "link" to this folder, they effectively get the code and the knowledge of those dependencies.

4. Exporting Your Components
To make imports clean, create an index.ts file at the root of shared-ui to export everything:

TypeScript
// shared-ui/index.ts
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./lib/utils";
Now, in your React or Astro components, your imports look professional and clean:

TypeScript
import { Button } from "@my-project/shared-ui";
Why this is the "Gold Standard"