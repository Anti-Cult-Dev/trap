import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('Created .env file from .env.example');
}

// Platform-specific SQLite setup
if (process.platform === 'win32') {
  // Windows-specific setup
  console.log('Setting up SQLite for Windows...');
  try {
    spawnSync('node', ['-e', `import('sqlite3')`], {
      stdio: 'inherit',
      shell: true
    });
  } catch (error) {
    console.error('Error setting up SQLite:', error);
  }
} else {
  // Unix-like systems setup
  console.log('Setting up SQLite for Unix-like system...');
  try {
    spawnSync('node', ['-e', `import('sqlite3')`], {
      stdio: 'inherit',
      shell: true
    });
  } catch (error) {
    console.error('Error setting up SQLite:', error);
  }
}

console.log('Postinstall completed successfully!');
