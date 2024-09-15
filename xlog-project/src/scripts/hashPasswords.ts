import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function hashPasswords() {
  const users = await prisma.user.findMany();
  
  for (const user of users) {
    if (!user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
      console.log(`Hashed password for user: ${user.username}`);
    }
  }
  
  console.log("Password hashing complete");
}

hashPasswords()
  .catch((error) => {
    console.error("Error hashing passwords:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });