# LivinHome React Frontend

This project is a frontend application for the LivinHome platform, built using React, TypeScript, and Vite. It provides a user interface for tenants, owners, and admins to manage properties, transactions, and profiles.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [ESLint Configuration](#eslint-configuration)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/iqbalFatur87/livinhome-react-fe.git
cd livinhome-react-fe
npm install
```

To run the project locally, use:
```bash
npm run dev
```

## Project Structure

The project is organized into several key directories:

- src/pages: Contains the main pages of the application, organized by user roles such as Tenant, Owner, and Admin.
- src/components: Reusable components used across different pages.
- src/utils: Utility functions and constants.
- src/assets: Static assets like images and styles.

## Available Scripts

- npm run dev: Starts the development server.
- npm run build: Builds the application for production.
- npm run lint: Runs ESLint to check for code quality issues.

## ESLint Configuration

The project uses ESLint with TypeScript support to ensure code quality. The configuration is set up to use type-aware linting rules. To expand the ESLint configuration, you can update the parserOptions in your ESLint configuration file:

```js
parserOptions: {
  ecmaVersion: 'latest',
  sourceType: 'module',
  project: ['./tsconfig.json', './tsconfig.node.json'],
  tsconfigRootDir: __dirname,
},
```

Additionally, consider using the following plugins for enhanced linting:
- plugin:@typescript-eslint/recommended-type-checked
- plugin:react/recommended
- plugin:react/jsx-runtime

## Dependencies

Key dependencies used in this project include:
- React
- TypeScript
- Vite
- Chakra UI for component styling
- Axios for HTTP requests

### P.S : For admin login, see note.txt
