// Create a file named `seed.js` or similar

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Arham',
      username: 'arham08',
      position: 'admin logistik',
      password: 'Qwer1234', // Pastikan untuk meng-hash password di lingkungan produksi
      level: 5,
    },
  });

  console.log('User added successfully.');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
