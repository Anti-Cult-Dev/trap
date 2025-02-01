const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

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
    spawnSync('node', ['-e', `require('sqlite3')`], {
      stdio: 'inherit',
      shell: true
    });
  } catch (error) {
    console.error('Error setting up SQLite:', error);
  }
} else {
  // Unix-based setup
  console.log('Setting up SQLite for Unix-based system...');
  try {
    spawnSync('node', ['-e', `require('sqlite3')`], {
      stdio: 'inherit'
    });
  } catch (error) {
    console.error('Error setting up SQLite:', error);
  }
}

console.log('Postinstall completed successfully!');
