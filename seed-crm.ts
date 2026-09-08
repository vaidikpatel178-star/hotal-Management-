import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Guest CRM & Loyalty Management Data...');

  // 1. Seed Loyalty Rewards Catalog
  const defaultRewards = [
    {
      name: '₹500 Room Rate Discount',
      description: 'Get an instant ₹500 discount on your next luxury room reservation.',
      pointsRequired: 500,
      rewardType: 'DISCOUNT',
      rewardValue: 500.0,
      expiryDays: 60,
    },
    {
      name: 'Complimentary Buffet Breakfast',
      description: 'Free executive breakfast buffet for 2 guests at Grand Horizon Restaurant.',
      pointsRequired: 750,
      rewardType: 'FREE_SERVICE',
      rewardValue: 850.0,
      expiryDays: 45,
    },
    {
      name: 'Complimentary Chef Dessert',
      description: 'Free artisanal dessert plate during dining at the hotel restaurant.',
      pointsRequired: 300,
      rewardType: 'COMPLIMENTARY',
      rewardValue: 350.0,
      expiryDays: 30,
    },
    {
      name: 'Complimentary Room Upgrade',
      description: 'Upgrade your reservation to the next room tier subject to availability upon check-in.',
      pointsRequired: 1500,
      rewardType: 'UPGRADE',
      rewardValue: 2500.0,
      expiryDays: 90,
    },
    {
      name: 'Free Airport Luxury Transfer',
      description: 'One-way luxury sedan transfer from airport to hotel property.',
      pointsRequired: 1200,
      rewardType: 'FREE_SERVICE',
      rewardValue: 1800.0,
      expiryDays: 60,
    },
    {
      name: '15% Off Total Dining Bill',
      description: 'Get 15% discount on all food & beverage orders during stay.',
      pointsRequired: 600,
      rewardType: 'DISCOUNT',
      rewardValue: 15.0,
      expiryDays: 30,
    },
  ];

  for (const reward of defaultRewards) {
    const existing = await prisma.loyaltyReward.findFirst({
      where: { name: reward.name },
    });
    if (!existing) {
      await prisma.loyaltyReward.create({ data: reward });
      console.log(`+ Created Loyalty Reward: ${reward.name}`);
    }
  }

  // 2. Fetch all Guests and sync historical points from Reservations, Food Orders, and Events
  const guests = await prisma.guest.findMany({
    include: {
      reservations: { where: { status: { not: 'CANCELLED' } } },
      foodOrders: { where: { paymentStatus: 'PAID' } },
      events: { where: { bookingStatus: { not: 'CANCELLED' } } },
      reviews: true,
      notes: true,
    },
  });

  console.log(`Syncing CRM & Loyalty metrics for ${guests.length} guests...`);

  for (const guest of guests) {
    // Calculate lifetime room spend
    const roomSpend = guest.reservations.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
    const roomStays = guest.reservations.filter((r) => r.status === 'CHECKED_OUT' || r.status === 'CHECKED_IN').length;

    // Calculate lifetime food spend
    const foodSpend = guest.foodOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    // Calculate lifetime event spend
    const eventSpend = guest.events.reduce((sum, e) => sum + (e.paidAmount || 0), 0);

    const totalSpending = Math.round((roomSpend + foodSpend + eventSpend) * 100) / 100;
    const totalStays = Math.max(guest.totalStays || 0, roomStays);

    // Points calculation: 1 point per ₹100 spent
    const totalPointsEarned = Math.floor(totalSpending / 100);

    // Calculate Loyalty Tier
    let loyaltyTier = 'BRONZE';
    if (totalPointsEarned >= 3000) loyaltyTier = 'PLATINUM';
    else if (totalPointsEarned >= 1500) loyaltyTier = 'GOLD';
    else if (totalPointsEarned >= 500) loyaltyTier = 'SILVER';

    // Calculate Guest Segment
    let segment = 'NEW';
    if (totalStays >= 5 || totalSpending >= 100000) {
      segment = 'VIP';
    } else if (totalSpending >= 50000) {
      segment = 'HIGH_SPENDING';
    } else if (totalStays >= 2) {
      segment = 'REGULAR';
    }

    // Determine last visit date
    let lastVisitDate: Date | null = null;
    if (guest.reservations.length > 0) {
      const dates = guest.reservations.map((r) => new Date(r.checkInDate).getTime());
      lastVisitDate = new Date(Math.max(...dates));
    }

    // Check if at-risk (no visit in > 90 days)
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const isAtRisk = lastVisitDate ? lastVisitDate < ninetyDaysAgo : false;

    if (isAtRisk && segment !== 'VIP') {
      segment = 'AT_RISK';
    }

    await prisma.guest.update({
      where: { id: guest.id },
      data: {
        totalSpending,
        totalStays,
        loyaltyPoints: totalPointsEarned,
        totalPointsEarned,
        loyaltyTier,
        segment,
        lastVisitDate,
        isAtRisk,
        dietaryPreference: guest.dietaryPreference || (guest.name.includes('Patel') ? 'Vegetarian' : 'Non-Veg'),
        favoriteRoomType: guest.favoriteRoomType || (totalSpending > 50000 ? 'Suite' : 'Deluxe Room'),
      },
    });

    // Add initial Loyalty Transaction Ledger entry if none exists
    const txCount = await prisma.loyaltyTransaction.count({ where: { guestId: guest.id } });
    if (txCount === 0 && totalPointsEarned > 0) {
      await prisma.loyaltyTransaction.create({
        data: {
          guestId: guest.id,
          type: 'EARNED',
          referenceType: 'MANUAL',
          amountSpent: totalSpending,
          points: totalPointsEarned,
          balanceAfter: totalPointsEarned,
          notes: 'Initial account point backfill from stay and dining transactions',
        },
      });
    }

    // Add sample internal staff notes if none exist
    if (guest.notes.length === 0) {
      await prisma.guestNote.createMany({
        data: [
          {
            guestId: guest.id,
            authorName: 'Front Desk Manager',
            content: `VIP preferences logged: ${guest.name} prefers high floor room with extra pillows and complimentary quiet service.`,
          },
        ],
      });
    }

    console.log(`✓ Guest synced: ${guest.name} | Tier: ${loyaltyTier} | Points: ${totalPointsEarned} | Spend: ₹${totalSpending}`);
  }

  console.log('✅ Guest CRM & Loyalty Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding Guest CRM:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
