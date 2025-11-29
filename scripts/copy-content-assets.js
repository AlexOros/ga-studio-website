const fs = require('fs');
const path = require('path');

/**
 * Recursively copy directory contents
 */
function copyRecursive(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      // Only copy image files, skip markdown files
      if (!entry.name.endsWith('.md')) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// Main execution
const contentSrc = path.join(__dirname, '..', 'content');
const contentDest = path.join(__dirname, '..', 'public', 'content');

console.log('📂 Copying content images to public directory...');

try {
  copyRecursive(contentSrc, contentDest);
  console.log('✓ Content images copied to public/content/');
} catch (error) {
  console.error('✗ Error copying content:', error.message);
  process.exit(1);
}
