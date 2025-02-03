# Agent Profiles Project

A React + TypeScript project for displaying agent profiles with locked/unlocked content.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
public/
├── images/
│   ├── profile-pictures/     # Profile pictures
│   ├── profile-page-pictures/# Regular visible content
│   └── restricted/          # Locked content
src/
├── components/             # React components
├── data/                  # Agent data and configurations
├── pages/                 # Page components
└── types/                 # TypeScript type definitions
```

## Important Notes

1. All sensitive content is in the `public/images/restricted/` directory
2. Each agent has:
   - Regular visible content
   - Locked content with one preview image
   - Profile picture and banner

## Deployment Steps

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `dist` directory

3. Deploy the contents of `dist` to your hosting service

4. Make sure all image paths in the `public` directory are copied to your hosting service in the same structure

## File Structure Requirements

Maintain this exact directory structure for images:
```
public/images/
├── profile-pictures/
│   ├── methanypfp.jpg
│   └── roxypfp.png
├── profile-page-pictures/
│   ├── methany/
│   │   └── (regular content)
│   └── roxy/
│       └── (regular content)
└── restricted/
    ├── methany/
    │   └── (locked content)
    └── roxy/
        └── (locked content)
```

## Dependencies

- React 18.2.0
- TypeScript 5.3.3
- Vite 5.1.0
- Tailwind CSS 3.4.1
