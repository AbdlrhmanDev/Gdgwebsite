const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filepath = path.join(dir, file);
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) {
            walk(filepath, callback);
        } else if (stats.isFile() && (file.endsWith('.tsx') || file.endsWith('.ts'))) {
            callback(filepath);
        }
    });
}

function fixImports(filepath) {
    let content = fs.readFileSync(filepath, 'utf8');
    // Regex to match imports with version suffixes
    // Matches: from "package@1.2.3" or from "@scope/package@1.2.3"
    // We want to capture the package name before the last @version

    const regex = /from\s+['"]((?:@[^/'"]+\/)?[^/'"]+)@\d+\.\d+\.\d+['"]/g;

    let changed = false;
    const newContent = content.replace(regex, (match, pkg) => {
        changed = true;
        console.log(`Fixing in ${filepath}: ${match} -> from "${pkg}"`);
        return `from "${pkg}"`;
    });

    if (changed) {
        fs.writeFileSync(filepath, newContent, 'utf8');
    }
}

const targetDir = path.join(__dirname, 'src');
console.log(`Scanning ${targetDir}...`);
walk(targetDir, fixImports);
console.log('Done.');
