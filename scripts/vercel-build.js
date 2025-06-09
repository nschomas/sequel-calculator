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

// Create package.json for the serverless function with ES module support and dependencies
const functionPackageJson = {
  type: 'module',
  dependencies: {
    '@neondatabase/serverless': '^0.10.4',
    'bufferutil': '^4.0.8',
    'utf-8-validate': '^6.0.3'
  }
};

fs.writeFileSync(
  path.join(indexFuncDir, 'package.json'),
  JSON.stringify(functionPackageJson, null, 2)
);

console.log('✅ Created package.json for serverless function');

// Copy external dependencies to function directory
console.log('📦 Copying external dependencies...');
const nodeModulesDir = path.join(indexFuncDir, 'node_modules');
fs.mkdirSync(nodeModulesDir, { recursive: true });

const externalDeps = ['@neondatabase', 'bufferutil', 'utf-8-validate'];
const sourceNodeModules = path.join(projectRoot, 'node_modules');

for (const dep of externalDeps) {
  const sourcePath = path.join(sourceNodeModules, dep);
  const destPath = path.join(nodeModulesDir, dep);
  
  if (fs.existsSync(sourcePath)) {
    copyRecursive(sourcePath, destPath);
    console.log(`✅ Copied ${dep}`);
  } else {
    console.log(`⚠️ Warning: ${dep} not found in node_modules`);
  }
}

console.log('✅ External dependencies copied');

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
    // Static assets are served first by default
    {
      src: "/assets/(.*)",
      headers: { "cache-control": "public, max-age=31536000, immutable" }
    },
    // API routes go to serverless function
    {
      src: "/api/(.*)",
      dest: "/index"
    },
    // Everything else serves the SPA
    {
      src: "/(.*)",
      dest: "/index.html"
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