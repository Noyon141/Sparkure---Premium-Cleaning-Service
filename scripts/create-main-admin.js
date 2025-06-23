import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const MAIN_ADMIN_FULL_NAME = process.env.MAIN_ADMIN_FULL_NAME;
const MAIN_ADMIN_EMAIL = process.env.MAIN_ADMIN_EMAIL;
const MAIN_ADMIN_PASSWORD = process.env.MAIN_ADMIN_PASSWORD;

if (!MAIN_ADMIN_EMAIL || !MAIN_ADMIN_PASSWORD || !MAIN_ADMIN_FULL_NAME) {
  throw new Error('MAIN_ADMIN_EMAIL and MAIN_ADMIN_PASSWORD must be set in the environment variables.');
}

async function createMainAdmin() {
  try {
    // Check if main admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: MAIN_ADMIN_EMAIL,
        role: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('Main admin already exists!');
      console.log('Full Name:', MAIN_ADMIN_FULL_NAME);
      console.log('Email:', MAIN_ADMIN_EMAIL);
      console.log('Password:', MAIN_ADMIN_PASSWORD);
      return;
    }

    // Hash the password
    const hashedPassword = await hash(MAIN_ADMIN_PASSWORD, 12);

    // Create the main admin
    const admin = await prisma.user.create({
      data: {
        email: MAIN_ADMIN_EMAIL,
        fullName: MAIN_ADMIN_FULL_NAME,
        password: hashedPassword,
        role: 'ADMIN',
        isEmailVerified: true,
        isActive: true,
      }
    });

    console.log('Main admin created successfully!');
    console.log('Full Name:', MAIN_ADMIN_FULL_NAME);
    console.log('Email:', MAIN_ADMIN_EMAIL);
    console.log('Password:', MAIN_ADMIN_PASSWORD);
    console.log('Admin ID:', admin.id);

  } catch (error) {
    console.error('Error creating main admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createMainAdmin(); 