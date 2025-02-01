# ElizaOS Project

A modern web application built with TypeScript, React, Next.js, and the ElizaOS framework.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Git

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-directory>
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# The postinstall script will automatically copy .env.example to .env if it doesn't exist
# You can modify the .env file with your specific configuration
```

## Development

Start the development server:

```bash
pnpm dev
```

## Building for Production

Build the project:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking

## Cross-Platform Support

This project is configured to work on both Windows and Unix-based systems (Mac, Linux). The following features ensure cross-platform compatibility:

- Uses `cross-env` for environment variables
- Platform-specific SQLite configuration
- Path normalization using `path.join()`
- Automated postinstall setup script

## Troubleshooting

### Windows-Specific Issues

If you encounter SQLite issues on Windows:
1. Make sure you have the latest Visual Studio Build Tools installed
2. Run `pnpm install` with administrator privileges

### Mac/Linux-Specific Issues

If you encounter permission issues:
1. Make sure you have appropriate file permissions
2. Run `chmod +x scripts/postinstall.js` if needed

## License

[Your License]
