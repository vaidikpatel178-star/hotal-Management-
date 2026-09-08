import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏛 Syncing 40 Rooms and 4 Halls into HOTELNEX AI database...');

  // 1. Ensure Room Types Exist / Update Pricing
  const stdType = await prisma.roomType.upsert({
    where: { code: 'STD' },
    update: { basePrice: 2500, capacity: 2, bedType: 'Queen Bed', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80' },
    create: {
      name: 'Standard Room',
      code: 'STD',
      basePrice: 2500,
      description: 'Elegant, comfortable room with queen bed, smart TV, high-speed Wi-Fi, and work desk.',
      capacity: 2,
      bedType: 'Queen Bed',
      amenities: 'Wi-Fi, AC, Smart TV, Tea/Coffee Maker, Safe Box, Mini Bar',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    },
  });

  const dlxType = await prisma.roomType.upsert({
    where: { code: 'DLX' },
    update: { basePrice: 3500, capacity: 2, bedType: 'King Bed', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' },
    create: {
      name: 'Deluxe Room',
      code: 'DLX',
      basePrice: 3500,
      description: 'Spacious luxury room featuring city view, king plush bed, rain shower, and premium amenities.',
      capacity: 2,
      bedType: 'King Bed',
      amenities: 'Wi-Fi, AC, 55" Smart TV, Rain Shower, City View, Mini Bar, Espresso Machine',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    },
  });

  const prmType = await prisma.roomType.upsert({
    where: { code: 'PRM' },
    update: { basePrice: 4500, capacity: 3, bedType: 'King Plush', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
    create: {
      name: 'Premium Room',
      code: 'PRM',
      basePrice: 4500,
      description: 'Breathtaking ocean views, private balcony, marble bathroom, and 24/7 butler service.',
      capacity: 3,
      bedType: 'King Plush',
      amenities: 'Wi-Fi, AC, Ocean View Balcony, Bathtub, Espresso Machine, Butler Service, Plush Robes',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    },
  });

  const excType = await prisma.roomType.upsert({
    where: { code: 'EXC' },
    update: { basePrice: 6000, capacity: 4, bedType: 'Super King Suite', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80' },
    create: {
      name: 'Executive Room',
      code: 'EXC',
      basePrice: 6000,
      description: 'Ultra-luxurious suite with living lounge, Jacuzzi, and executive skyline views.',
      capacity: 4,
      bedType: 'Super King Suite',
      amenities: 'Wi-Fi, Central AC, Jacuzzi, Living Lounge, Dining Table, Executive Lounge Pass',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    },
  });

  console.log('✅ Room Types verified');

  // 2. Define 40 Rooms
  // 101-110: Standard (₹2,500)
  // 111-120: Deluxe (₹3,500)
  // 201-210: Premium (₹4,500)
  // 211-220: Executive (₹6,000)
  const roomDefs: Array<{
    num: string;
    type: any;
    floor: number;
    price: number;
    size: number;
    status: string;
  }> = [];

  // Floor 1 Standard 101-110
  for (let i = 1; i <= 10; i++) {
    const num = `10${i < 10 ? '0' + i : i}`;
    const status = i === 2 ? 'OCCUPIED' : i === 4 ? 'CLEANING' : i === 5 ? 'RESERVED' : i === 9 ? 'MAINTENANCE' : 'AVAILABLE';
    roomDefs.push({ num, type: stdType, floor: 1, price: 2500, size: 280, status });
  }

  // Floor 1 Deluxe 111-120
  for (let i = 11; i <= 20; i++) {
    const num = `1${i}`;
    const status = i === 12 || i === 17 ? 'OCCUPIED' : i === 15 ? 'RESERVED' : i === 19 ? 'CLEANING' : 'AVAILABLE';
    roomDefs.push({ num, type: dlxType, floor: 1, price: 3500, size: 380, status });
  }

  // Floor 2 Premium 201-210
  for (let i = 1; i <= 10; i++) {
    const num = `20${i < 10 ? '0' + i : i}`;
    const status = i === 1 || i === 4 || i === 8 ? 'OCCUPIED' : i === 3 ? 'RESERVED' : 'AVAILABLE';
    roomDefs.push({ num, type: prmType, floor: 2, price: 4500, size: 480, status });
  }

  // Floor 2 Executive 211-220
  for (let i = 11; i <= 20; i++) {
    const num = `2${i}`;
    const status = i === 13 || i === 18 ? 'OCCUPIED' : i === 16 ? 'CLEANING' : 'AVAILABLE';
    roomDefs.push({ num, type: excType, floor: 2, price: 6000, size: 600, status });
  }

  for (const r of roomDefs) {
    await prisma.room.upsert({
      where: { roomNumber: r.num },
      update: {
        roomTypeId: r.type.id,
        floor: r.floor,
        building: r.floor === 2 ? 'Executive Wing' : 'Main Wing',
        pricePerNight: r.price,
        weekendPrice: Math.round(r.price * 1.2),
        extraGuestPrice: 800,
        capacity: r.type.capacity,
        bedType: r.type.bedType,
        roomSize: r.size,
        amenities: r.type.amenities,
        image: r.type.image,
        status: r.status,
      },
      create: {
        roomNumber: r.num,
        roomTypeId: r.type.id,
        floor: r.floor,
        building: r.floor === 2 ? 'Executive Wing' : 'Main Wing',
        pricePerNight: r.price,
        weekendPrice: Math.round(r.price * 1.2),
        extraGuestPrice: 800,
        capacity: r.type.capacity,
        bedType: r.type.bedType,
        roomSize: r.size,
        amenities: r.type.amenities,
        image: r.type.image,
        status: r.status,
        housekeepingStatus: r.status === 'CLEANING' ? 'CLEANING' : r.status === 'MAINTENANCE' ? 'DIRTY' : 'CLEAN',
      },
    });
  }

  console.log(`✅ 40 Rooms created/synchronized cleanly!`);

  // 3. Create 4 Halls
  const hallsData = [
    {
      name: 'Grand Royal Banquet Hall',
      slug: 'grand-royal-banquet-hall',
      description: 'Majestic luxury banquet hall with crystal chandeliers, grand stage, state-of-the-art sound systems, and dedicated bridal lounge. Perfect for lavish weddings, receptions, corporate galas, and high-capacity conventions.',
      sizeSqFt: 5000,
      capacity: 400,
      theatreCapacity: 400,
      roundTableCapacity: 250,
      classroomCapacity: 200,
      boardroomCapacity: 150,
      pricePerDay: 75000,
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      amenities: 'Stage, Premium Lighting, Sound System, Projector, LED Display, AC, Dining Area, Bridal/Groom Room, Parking, Decoration Area, Wi-Fi',
      suitableFor: 'Weddings, Large Events, Receptions, Corporate Events, Conferences, Galas',
    },
    {
      name: 'Crystal Conference Hall',
      slug: 'crystal-conference-hall',
      description: 'High-tech corporate conference center equipped with dual HD laser projectors, video conferencing, acoustic wall panels, and ergonomic seating. Designed for high-impact seminars and product launches.',
      sizeSqFt: 3000,
      capacity: 200,
      theatreCapacity: 200,
      roundTableCapacity: 120,
      classroomCapacity: 100,
      boardroomCapacity: 80,
      pricePerDay: 45000,
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80',
      amenities: 'Projector, Large Screen, Sound System, Wi-Fi, AC, Stage, Conference Tables, Microphones, Whiteboard, Podium',
      suitableFor: 'Corporate Meetings, Conferences, Seminars, Product Launches, Training Programs',
    },
    {
      name: 'Royal Celebration Hall',
      slug: 'royal-celebration-hall',
      description: 'Vibrant, stylish event space featuring ambient LED mood lighting, surround music system, buffet area, and dedicated photo backdrop zone. Perfect for social gatherings and private parties.',
      sizeSqFt: 2000,
      capacity: 120,
      theatreCapacity: 120,
      roundTableCapacity: 80,
      classroomCapacity: 60,
      boardroomCapacity: 40,
      pricePerDay: 30000,
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      amenities: 'Decoration Area, Music System, Lighting, AC, Stage, Dining Setup, Photo Area, Wi-Fi, Parking, Buffet Counter',
      suitableFor: 'Birthday Parties, Anniversary, Engagement, Small Wedding, Family Functions, Private Events',
    },
    {
      name: 'Executive Meeting Lounge',
      slug: 'executive-meeting-lounge',
      description: 'Sophisticated boardroom lounge featuring solid oak conference table, 85-inch interactive smart display, high-speed fiber internet, and premium coffee bar service. Created for high-level executive discussions.',
      sizeSqFt: 1000,
      capacity: 50,
      boardroomCapacity: 30,
      theatreCapacity: 50,
      classroomCapacity: 25,
      pricePerDay: 15000,
      status: 'AVAILABLE',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      amenities: 'Projector, Smart Display, Wi-Fi, AC, Conference Table, Whiteboard, Tea/Coffee Service, Sound System, Ergonomic Leather Chairs',
      suitableFor: 'Business Meetings, Interviews, Small Conferences, Private Meetings, Workshops, Executive Events',
    },
  ];

  const createdHalls: Record<string, any> = {};
  for (const hData of hallsData) {
    const hall = await prisma.hall.upsert({
      where: { slug: hData.slug },
      update: hData,
      create: hData,
    });
    createdHalls[hall.slug] = hall;
  }

  console.log(`✅ 4 Halls created/synchronized cleanly!`);

  // 4. Seed Initial Sample Hall Booking
  const sampleGuest = await prisma.guest.findFirst();

  if (sampleGuest && createdHalls['crystal-conference-hall']) {
    const existingBooking = await prisma.hallBooking.findFirst({
      where: { bookingCode: 'HB-2026-0901' },
    });

    if (!existingBooking) {
      const eventDate = new Date();
      eventDate.setDate(eventDate.getDate() + 2); // 2 days from today

      await prisma.hallBooking.create({
        data: {
          bookingCode: 'HB-2026-0901',
          hallId: createdHalls['crystal-conference-hall'].id,
          guestId: sampleGuest.id,
          customerName: 'TechVision Global Corp',
          customerPhone: '+91 98765 12345',
          customerEmail: 'events@techvision.com',
          eventType: 'Corporate Event',
          eventDate: eventDate,
          startTime: '09:00 AM',
          endTime: '05:00 PM',
          guestCount: 150,
          specialRequirements: 'High-speed Wi-Fi, 3 cordless mics, and lunch buffet catering.',
          hallCharge: 45000,
          decorationCharge: 5000,
          cateringCharge: 15000,
          extraEquipmentCharge: 3000,
          tax: 3400,
          totalAmount: 71400,
          paymentStatus: 'PAID',
          bookingStatus: 'CONFIRMED',
        },
      });
      console.log('✅ Sample Hall Booking created');
    }
  }

  console.log('🎉 40 Rooms and 4 Halls sync completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Sync expansion error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
