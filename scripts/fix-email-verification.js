import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixEmailVerification() {
  try {
    console.log('Fixing email verification for existing users...');
    
    // Update all existing users to have verified emails
    const result = await prisma.user.updateMany({
      where: {
        isEmailVerified: false,
      },
      data: {
        isEmailVerified: true,
      },
    });
    
    console.log(`Updated ${result.count} users with email verification.`);
    
    // Get users without phone numbers and update them individually with unique values
    const usersWithoutPhone = await prisma.user.findMany({
      where: {
        phone: null,
      },
    });
    
    for (const user of usersWithoutPhone) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          phone: `temp-${user.id.slice(0, 8)}`,
        },
      });
    }
    
    console.log(`Updated ${usersWithoutPhone.length} users with temporary phone numbers.`);
    
    // Get users without addresses and update them
    const usersWithoutAddress = await prisma.user.findMany({
      where: {
        address: null,
      },
    });
    
    for (const user of usersWithoutAddress) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          address: 'Address not provided',
        },
      });
    }
    
    console.log(`Updated ${usersWithoutAddress.length} users with default address.`);
    
    console.log('Email verification fix completed successfully!');
  } catch (error) {
    console.error('Error fixing email verification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixEmailVerification(); 