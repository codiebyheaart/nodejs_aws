// ============================================
// BASIC CODE STRUCTURE VERIFICATION
// Tests that all files are properly structured
// ============================================

const fs = require('fs');
const path = require('path');

console.log('🔍 Restaurant Backend - Code Verification\n');
console.log('==========================================\n');

const checks = [
    { file: 'package.json', type: 'file' },
    { file: '.env', type: 'file' },
    { file: '.env.example', type: 'file' },
    { file: '.gitignore', type: 'file' },
    { file: 'server.js', type: 'file' },
    { file: 'schema.sql', type: 'file' },
    { file: 'README.md', type: 'file' },
    { file: 'SETUP.md', type: 'file' },
    { file: 'POSTMAN_COLLECTION.md', type: 'file' },
    { file: 'config/database.js', type: 'file' },
    { file: 'routes/menu.js', type: 'file' },
    { file: 'routes/reservations.js', type: 'file' },
    { file: 'node_modules', type: 'dir' }
];

let passed = 0;
let failed = 0;

checks.forEach(check => {
    const filePath = path.join(__dirname, check.file);
    const exists = fs.existsSync(filePath);

    if (exists) {
        const stats = fs.statSync(filePath);
        const isCorrectType = check.type === 'dir' ? stats.isDirectory() : stats.isFile();

        if (isCorrectType) {
            console.log(`✅ ${check.file}`);
            passed++;
        } else {
            console.log(`❌ ${check.file} - Wrong type`);
            failed++;
        }
    } else {
        console.log(`❌ ${check.file} - Not found`);
        failed++;
    }
});

console.log('\n==========================================');
console.log(`Results: ${passed} passed, ${failed} failed`);

// Check for "Elizian" references
console.log('\n🔍 Checking for "Elizian" references...\n');

const filesToCheck = [
    'server.js',
    'package.json',
    'README.md',
    '.env.example'
];

let elizianFound = false;

filesToCheck.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hasElizian = content.toLowerCase().includes('elizian');

    if (hasElizian) {
        console.log(`⚠️  Found "Elizian" in ${file}`);
        elizianFound = true;
    } else {
        console.log(`✅ ${file} - Clean`);
    }
});

console.log('\n==========================================');

if (passed === checks.length && !elizianFound) {
    console.log('\n✅ ALL CHECKS PASSED!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Install MySQL (see SETUP.md)');
    console.log('   2. Run schema.sql to create database');
    console.log('   3. Update .env with your MySQL password');
    console.log('   4. Run: npm start');
    console.log('   5. Test APIs using POSTMAN_COLLECTION.md');
    console.log('\n🚀 Ready for GitHub and AWS deployment!');
} else {
    console.log('\n⚠️  Some checks failed. Please review.');
}

console.log('\n==========================================\n');
