import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createMainAdmin() {
  try {
    // Check if main admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: {
        email: 'admin@sparkure.com',
        role: 'ADMIN'
      }
    });

    if (existingAdmin) {
      console.log('Main admin already exists!');
      console.log('Email: admin@sparkure.com');
      console.log('Password: admin123456');
      return;
    }

    // Hash the password
    const hashedPassword = await hash('admin123456', 12);

    // Create the main admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@sparkure.com',
        fullName: 'Main Administrator',
        password: hashedPassword,
        role: 'ADMIN',
        isEmailVerified: true,
        isActive: true,
      }
    });

    console.log('Main admin created successfully!');
    console.log('Email: admin@sparkure.com');
    console.log('Password: admin123456');
    console.log('Admin ID:', admin.id);

  } catch (error) {
    console.error('Error creating main admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createMainAdmin(); 