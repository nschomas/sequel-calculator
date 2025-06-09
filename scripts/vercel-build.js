#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🚀 Building for Vercel with Build Output API v3...');

// Clean and create the .vercel/output directory structure
const outputDir = path.join(projectRoot, '.vercel/output');
const staticDir = path.join(outputDir, 'static');
const functionsDir = path.join(outputDir, 'functions');

// Remove existing .vercel/output if it exists
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}

// Create directory structure
fs.mkdirSync(staticDir, { recursive: true });
fs.mkdirSync(functionsDir, { recursive: true });

// Copy static assets from dist/public to .vercel/output/static
const distPublicDir = path.join(projectRoot, 'dist/public');
if (fs.existsSync(distPublicDir)) {
  console.log('📁 Copying static assets...');
  copyRecursive(distPublicDir, staticDir);
  console.log('✅ Static assets copied to .vercel/output/static');
} else {
  console.error('❌ dist/public directory not found. Make sure to run the build first.');
  process.exit(1);
}

// Create the serverless function
console.log('⚡ Setting up serverless function...');
const indexFuncDir = path.join(functionsDir, 'index.func');
fs.mkdirSync(indexFuncDir, { recursive: true });

// Copy the compiled server code
const serverBuildPath = path.join(projectRoot, 'dist/index.js');
if (fs.existsSync(serverBuildPath)) {
  fs.copyFileSync(serverBuildPath, path.join(indexFuncDir, 'index.js'));
} else {
  console.error('❌ dist/index.js not found. Make sure to run the build first.');
  process.exit(1);
}

// Create .vc-config.json for the serverless function
const vcConfig = {
  runtime: 'nodejs22.x',
  handler: 'index.js',
  launcherType: 'Nodejs',
  shouldAddHelpers: true
};

fs.writeFileSync(
  path.join(indexFuncDir, '.vc-config.json'),
  JSON.stringify(vcConfig, null, 2)
);

// Create the main config.json for the deployment
const config = {
  version: 3,
  routes: [
    {
      src: "/(.*)",
      dest: "/index"
    }
  ]
};

fs.writeFileSync(
  path.join(outputDir, 'config.json'),
  JSON.stringify(config, null, 2)
);

console.log('✅ Serverless function configured');
console.log('🎉 Vercel Build Output API structure created successfully!');
console.log('\nGenerated structure:');
console.log('📁 .vercel/output/');
console.log('├── 📁 static/ (static assets)');
console.log('├── 📁 functions/');
console.log('│   └── 📁 index.func/');
console.log('│       ├── 📄 index.js');
console.log('│       └── 📄 .vc-config.json');
console.log('└── 📄 config.json');

// Helper function to copy directories recursively
function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    for (const file of files) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
} 