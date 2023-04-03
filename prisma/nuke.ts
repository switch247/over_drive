const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function printUsers() {
    try {
        const users = await prisma.user.findMany();
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        await prisma.$disconnect();
    }
}

printUsers();