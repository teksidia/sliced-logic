# Information

This is a monorepo, with the following structure:

- landing - Astro landing page
- app - React frontend application
- api - .NET API backend services
- shared-ui - Shared layout for app and landing
- launcher - A .NET Aspire project that is used to run the project locally

## Contextual Instructions

Each directory is a separate project with its own dependencies and configuration.

Each directory has it's own .github directory with copilot-instructions.md file that contains specific instructions for that project.

## Deployment Architecture

The landing project is built using Astro, and designed to run on static hosting (e.g. Netlify).

The app project is built using React, and designed to run as a single-page application (SPA) on Azure Static Web Apps, with the /api calls proxied to an Azure App Service (which hosts the .NET API backend).

The api project is built using .NET and designed to run on Azure App Service.

These 2 (landing and app) are hosted in the same domain/subdomain so it appears like a single seamless app to the end user.

Locally I use SWA CLI to run the app and proxy the /api calls to the local .NET API backend. This is coordinated using the launcher Aspire project, which can start both the SWA CLI and the .NET API backend together.

