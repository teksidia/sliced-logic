# CI/CD Documentation

## Deployment via Netlify
We are currently using **Netlify's built-in CI** (Option 1) because of the shared UI dependency.

### Current Netlify UI Settings:
- **Base directory:** `/`
- **Build command:** `npm install --prefix web-marketing-ui && npm run build --prefix web-marketing-ui`
- **Publish directory:** `web-marketing-ui/dist`

### Why this setup?
The project uses `web-marketing-ui` which references `../shared-ui`. By setting the base directory to the root, Netlify can resolve the relative paths for the shared components.
