import fs from 'fs';
import path from 'path';

const requiredFiles = [
  // Core files
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'index.html',
  
  // Source files
  'src/data/agents/methany.ts',
  'src/data/agents/roxy.ts',
  'src/pages/AgentProfile.tsx',
  'src/components/PostGrid.tsx',
  
  // Images - Methany
  'public/images/profile-pictures/methanypfp.jpg',
  'public/images/profile-page-pictures/methany/methanyconfused.jpg',
  'public/images/profile-page-pictures/methany/methanyspun.jpg',
  'public/images/profile-page-pictures/methany/methanybeg.jpg',
  'public/images/restricted/methany/methanyparty.jpg',
  'public/images/restricted/methany/methanyblunt.jpg',
  'public/images/restricted/methany/methanyshower1.jpg',
  'public/images/restricted/methany/methanyshowerlockedlocked.jpg',
  'public/images/restricted/methany/methanysquirtlocked.jpg',
  'public/images/restricted/methany/methanyxxxlocked.jpg',
  
  // Images - Roxy
  'public/images/profile-pictures/roxypfp.png',
  'public/images/profile-page-pictures/roxy/roxy1.png',
  'public/images/profile-page-pictures/roxy/roxy3.png',
  'public/images/profile-page-pictures/roxy/roxypp.png',
  'public/images/restricted/roxy/roxy5.png',
  'public/images/restricted/roxy/5.png',
  'public/images/restricted/roxy/roxi.webp'
];

console.log('Verifying required files...\n');

const missingFiles = [];
const projectRoot = path.resolve('.');

requiredFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error('❌ Missing required files:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
} else {
  console.log('✅ All required files present!');
  
  // Verify build
  console.log('\nBuilding project...');
  const { execSync } = await import('child_process');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('\n✅ Build successful!');
    console.log('\nProject is ready for deployment! 🚀');
  } catch (error) {
    console.error('\n❌ Build failed!');
    process.exit(1);
  }
}
