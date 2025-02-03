import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Copy example env if not exists
const envExample = path.join(__dirname, '..', '.env.example');
const envFile = path.join(__dirname, '..', '.env');

if (!fs.existsSync(envFile) && fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, envFile);
  console.log('Created .env file from .env.example');
}

// Run prisma generate
try {
  console.log('Running prisma generate...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Also run prisma db push to create the database
  console.log('Running prisma db push...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
} catch (error) {
  console.warn('Warning: Prisma commands failed, but continuing installation:', error.message);
  // Don't exit process, allow installation to continue
}

// Platform-specific SQLite setup
if (process.platform === 'win32') {
  // Windows-specific setup
  console.log('Setting up SQLite for Windows...');
  try {
    execSync('node', ['-e', `import('sqlite3')`], {
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
    execSync('node', ['-e', `import('sqlite3')`], {
      stdio: 'inherit',
      shell: true
    });
  } catch (error) {
    console.error('Error setting up SQLite:', error);
  }
}

console.log('Postinstall completed successfully!');
