const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Instal package yang diperlukan
console.log('Installing TypeScript packages...');
execSync('npm install', { stdio: 'inherit' });

// Membuat direktori dist jika belum ada
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'));
}

// Jalankan build TypeScript
console.log('Compiling TypeScript...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Kompilasi TypeScript berhasil!');
} catch (error) {
    console.error('Terjadi kesalahan saat kompilasi TypeScript:', error);
    process.exit(1);
}

console.log('\nMigrasi Selesai!');
console.log('Gunakan "npm run dev" untuk menjalankan server dalam mode development.');
console.log('Gunakan "npm run build" untuk mengkompilasi kode TypeScript.');
console.log('Gunakan "npm start" untuk menjalankan server dalam mode production.'); 