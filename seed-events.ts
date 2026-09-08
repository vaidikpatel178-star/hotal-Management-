import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🎉 Seeding sample Event & Banquet Management data into HOTELNEX AI...');

  // 1. Fetch Halls
  const banquetHall = await prisma.hall.findFirst({ where: { slug: 'grand-royal-banquet-hall' } });
  const confHall = await prisma.hall.findFirst({ where: { slug: 'crystal-conference-hall' } });
  const celebrationHall = await prisma.hall.findFirst({ where: { slug: 'royal-celebration-hall' } });
  const loungeHall = await prisma.hall.findFirst({ where: { slug: 'executive-meeting-lounge' } });

  if (!banquetHall || !confHall || !celebrationHall || !loungeHall) {
    console.error('❌ Halls not found. Make sure prisma/sync-expansion.ts has run.');
    return;
  }

  // 2. Fetch or Create Guests
  let guestRahul = await prisma.guest.findFirst({ where: { name: 'Rahul Patel' } });
  if (!guestRahul) {
    guestRahul = await prisma.guest.create({
      data: {
        name: 'Rahul Patel',
        email: 'rahul.patel@example.com',
        phone: '+91 98250 12345',
        address: '402 Sunset Heights, SG Highway, Ahmedabad',
        nationality: 'Indian',
      },
    });
  }

  let guestPriya = await prisma.guest.findFirst({ where: { name: 'Priya Sharma' } });
  if (!guestPriya) {
    guestPriya = await prisma.guest.create({
      data: {
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98980 67890',
        address: '12 Marine Drive, Churchgate, Mumbai',
        nationality: 'Indian',
      },
    });
  }

  let guestTechVision = await prisma.guest.findFirst({ where: { name: 'TechVision Global Corp' } });
  if (!guestTechVision) {
    guestTechVision = await prisma.guest.create({
      data: {
        name: 'TechVision Global Corp',
        email: 'events@techvision.com',
        phone: '+91 98765 12345',
        address: 'Tech Park, BKC, Mumbai',
        preferences: 'Corporate Event Account',
      },
    });
  }

  let guestAmit = await prisma.guest.findFirst({ where: { name: 'Amit Shah' } });
  if (!guestAmit) {
    guestAmit = await prisma.guest.create({
      data: {
        name: 'Amit Shah',
        email: 'amit.shah@example.com',
        phone: '+91 97129 44556',
        address: 'Sector 17, Chandigarh',
      },
    });
  }

  // 3. Define Event Dates
  const today = new Date();
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const in3Days = new Date(today); in3Days.setDate(today.getDate() + 3);
  const in5Days = new Date(today); in5Days.setDate(today.getDate() + 5);
  const past5Days = new Date(today); past5Days.setDate(today.getDate() - 5);

  const sampleEvents = [
    {
      eventNumber: 'EVT-2026-0001',
      name: 'Patel Grand Wedding Reception',
      eventType: 'Wedding',
      guestId: guestRahul.id,
      customerName: 'Rahul Patel',
      customerPhone: '+91 98250 12345',
      customerEmail: 'rahul.patel@example.com',
      companyName: 'Patel Enterprises',
      gstNumber: '24AAAAA0000A1Z5',
      hallId: banquetHall.id,
      eventDate: tomorrow,
      startTime: '06:00 PM',
      endTime: '11:00 PM',
      expectedGuests: 300,
      seatingArrangement: 'Banquet',
      description: 'Grand evening wedding reception with royal stage decoration, buffet catering, live music, and LED wall visual setup.',
      specialRequirements: 'Pure Jain counter required for 50 guests. Extra floral arrangement around main entrance.',
      hallCharge: 75000,
      cateringType: 'PER_PERSON',
      cateringPricePerPerson: 900,
      cateringItemsJson: JSON.stringify([
        { item: 'Paneer Tikka Pizza', qty: 300, price: 200, total: 60000 },
        { item: 'Paneer Butter Masala', qty: 300, price: 350, total: 105000 },
        { item: 'Signature Cold Coffee', qty: 300, price: 150, total: 45000 },
        { item: 'Gulab Jamun & Ice Cream', qty: 300, price: 200, total: 60000 },
      ]),
      cateringAmount: 270000,
      decorationType: 'LUXURY',
      decorationAmount: 60000,
      servicesJson: JSON.stringify([
        { service: 'DJ & Sound System', qty: 1, price: 15000, total: 15000 },
        { service: 'Professional Photography', qty: 1, price: 12000, total: 12000 },
        { service: 'LED Wall Display', qty: 1, price: 8000, total: 8000 },
      ]),
      servicesAmount: 35000,
      subtotal: 440000,
      discountType: 'FIXED',
      discountValue: 20000,
      discountAmount: 20000,
      taxRate: 18.0,
      taxAmount: 75600,
      grandTotal: 495600,
      advancePayment: 200000,
      paidAmount: 200000,
      remainingAmount: 295600,
      paymentStatus: 'PARTIAL',
      bookingStatus: 'CONFIRMED',
      checklistJson: JSON.stringify([
        { id: 't1', title: 'Hall Preparation & AC Inspection', done: true },
        { id: 't2', title: 'Banquet Table & Chair Layout (300 Guests)', done: true },
        { id: 't3', title: 'Stage Floral & Lighting Decoration', done: true },
        { id: 't4', title: 'Sound System & Mic Testing', done: true },
        { id: 't5', title: 'Catering Buffet Line Setup', done: false },
        { id: 't6', title: 'Staff Briefing & Service Allocation', done: false },
        { id: 't7', title: 'Welcome Drinks Counter', done: false },
        { id: 't8', title: 'Final Billing & Guest Checkout', done: false },
      ]),
      staffAssignmentsJson: JSON.stringify([
        { role: 'Event Manager', name: 'Rajesh Mehta' },
        { role: 'Head Supervisor', name: 'Sunita Sharma' },
        { role: 'Executive Chef', name: 'Chef Vikram Singh' },
      ]),
    },
    {
      eventNumber: 'EVT-2026-0002',
      name: 'TechVision Annual Corporate Summit',
      eventType: 'Corporate Event',
      guestId: guestTechVision.id,
      customerName: 'TechVision Global Corp',
      customerPhone: '+91 98765 12345',
      customerEmail: 'events@techvision.com',
      companyName: 'TechVision Global',
      gstNumber: '27BBBCC1111B2Z8',
      hallId: confHall.id,
      eventDate: today,
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      expectedGuests: 150,
      seatingArrangement: 'Theatre',
      description: 'Annual technology conference with keynote speakers, dual HD projectors, high-speed Wi-Fi, and corporate lunch catering.',
      specialRequirements: 'High-speed fiber connection, 4 cordless microphones, and podium with company logo.',
      hallCharge: 45000,
      cateringType: 'FIXED_PACKAGE',
      cateringPricePerPerson: 600,
      cateringItemsJson: JSON.stringify([
        { item: 'Morning Breakfast Buffet', qty: 150, price: 200, total: 30000 },
        { item: 'Executive Lunch Buffet', qty: 150, price: 400, total: 60000 },
      ]),
      cateringAmount: 90000,
      decorationType: 'STANDARD',
      decorationAmount: 20000,
      servicesJson: JSON.stringify([
        { service: 'Dual HD Laser Projector & Screen', qty: 1, price: 12000, total: 12000 },
        { service: 'Acoustic Sound System & Mics', qty: 1, price: 8000, total: 8000 },
        { service: 'Continuous Tea/Coffee Service', qty: 1, price: 5000, total: 5000 },
      ]),
      servicesAmount: 25000,
      subtotal: 180000,
      discountType: 'FIXED',
      discountValue: 10000,
      discountAmount: 10000,
      taxRate: 18.0,
      taxAmount: 30600,
      grandTotal: 200600,
      advancePayment: 200600,
      paidAmount: 200600,
      remainingAmount: 0,
      paymentStatus: 'PAID',
      bookingStatus: 'IN_PROGRESS',
      checklistJson: JSON.stringify([
        { id: 't1', title: 'Theatre Seating Setup (150 Seats)', done: true },
        { id: 't2', title: 'Dual Projector & Screen Alignment', done: true },
        { id: 't3', title: 'High-speed Wi-Fi Access Point Testing', done: true },
        { id: 't4', title: 'Morning Tea & Coffee Station', done: true },
        { id: 't5', title: 'Keynote Speaker Mic Check', done: true },
        { id: 't6', title: 'Afternoon Buffet Lunch Service', done: false },
        { id: 't7', title: 'Post-event Feedback & De-rigging', done: false },
      ]),
      staffAssignmentsJson: JSON.stringify([
        { role: 'Event Coordinator', name: 'Sunita Sharma' },
        { role: 'AV Technician', name: 'Ramesh Pawar' },
      ]),
    },
    {
      eventNumber: 'EVT-2026-0003',
      name: 'Aarav 10th Birthday Bash',
      eventType: 'Birthday Party',
      guestId: guestPriya.id,
      customerName: 'Priya Sharma',
      customerPhone: '+91 98980 67890',
      customerEmail: 'priya.sharma@example.com',
      hallId: celebrationHall.id,
      eventDate: in3Days,
      startTime: '05:00 PM',
      endTime: '09:00 PM',
      expectedGuests: 80,
      seatingArrangement: 'Round Table',
      description: 'Fun superhero themed birthday party with balloon arch, kids game zone, custom cake table, and mocktail bar.',
      specialRequirements: 'Superhero theme balloon arch in blue & red. Separate kids dining table.',
      hallCharge: 30000,
      cateringType: 'CUSTOM_MENU',
      cateringPricePerPerson: 500,
      cateringItemsJson: JSON.stringify([
        { item: 'Mini Pizza & Burgers', qty: 80, price: 250, total: 20000 },
        { item: 'Pastries & Ice Cream Bar', qty: 80, price: 250, total: 20000 },
      ]),
      cateringAmount: 40000,
      decorationType: 'PREMIUM',
      decorationAmount: 20000,
      servicesJson: JSON.stringify([
        { service: 'DJ & Kids Party Music', qty: 1, price: 8000, total: 8000 },
        { service: 'Magic Show & Host', qty: 1, price: 7000, total: 7000 },
      ]),
      servicesAmount: 15000,
      subtotal: 105000,
      discountType: 'FIXED',
      discountValue: 5000,
      discountAmount: 5000,
      taxRate: 18.0,
      taxAmount: 18000,
      grandTotal: 118000,
      advancePayment: 40000,
      paidAmount: 40000,
      remainingAmount: 78000,
      paymentStatus: 'PARTIAL',
      bookingStatus: 'CONFIRMED',
      checklistJson: JSON.stringify([
        { id: 't1', title: 'Round Table & Balloon Arch Setup', done: false },
        { id: 't2', title: 'Sound & Party Music Check', done: false },
        { id: 't3', title: 'Cake Cutting Table Decoration', done: false },
      ]),
      staffAssignmentsJson: JSON.stringify([
        { role: 'Party Host', name: 'Sunita Sharma' },
      ]),
    },
    {
      eventNumber: 'EVT-2026-0004',
      name: 'Executive Board Strategy Meeting',
      eventType: 'Business Meeting',
      guestId: guestAmit.id,
      customerName: 'Amit Shah',
      customerPhone: '+91 97129 44556',
      customerEmail: 'amit.shah@example.com',
      companyName: 'Shah Capital Partners',
      hallId: loungeHall.id,
      eventDate: in5Days,
      startTime: '10:00 AM',
      endTime: '04:00 PM',
      expectedGuests: 25,
      seatingArrangement: 'Boardroom',
      description: 'High-level board meeting around solid oak conference table with 85-inch interactive display and espresso service.',
      specialRequirements: 'Silent environment, organic green tea, and printed agenda documents.',
      hallCharge: 15000,
      cateringType: 'PER_PERSON',
      cateringPricePerPerson: 1000,
      cateringItemsJson: JSON.stringify([
        { item: 'Executive Gourmet Lunch & Cold Coffee', qty: 25, price: 1000, total: 25000 },
      ]),
      cateringAmount: 25000,
      decorationType: 'BASIC',
      decorationAmount: 10000,
      servicesJson: JSON.stringify([
        { service: '85" Smart Display & Video Conferencing', qty: 1, price: 10000, total: 10000 },
      ]),
      servicesAmount: 10000,
      subtotal: 60000,
      discountType: 'FIXED',
      discountValue: 0,
      discountAmount: 0,
      taxRate: 18.0,
      taxAmount: 10800,
      grandTotal: 70800,
      advancePayment: 70800,
      paidAmount: 70800,
      remainingAmount: 0,
      paymentStatus: 'PAID',
      bookingStatus: 'CONFIRMED',
      checklistJson: JSON.stringify([
        { id: 't1', title: 'Boardroom Table & Leather Chairs Setup', done: false },
        { id: 't2', title: 'Smart Display & Video Call Test', done: false },
      ]),
      staffAssignmentsJson: JSON.stringify([
        { role: 'Lounge Supervisor', name: 'Rajesh Mehta' },
      ]),
    },
    {
      eventNumber: 'EVT-2026-0005',
      name: 'Sharma Golden Anniversary Gala',
      eventType: 'Anniversary',
      guestId: guestPriya.id,
      customerName: 'Priya Sharma',
      customerPhone: '+91 98980 67890',
      customerEmail: 'priya.sharma@example.com',
      hallId: banquetHall.id,
      eventDate: past5Days,
      startTime: '07:00 PM',
      endTime: '11:00 PM',
      expectedGuests: 250,
      seatingArrangement: 'Banquet',
      description: '50th Golden Anniversary celebration with acoustic violin, dinner buffet, and golden curtain backdrop.',
      specialRequirements: 'Golden flower arch and vintage champagne toast.',
      hallCharge: 75000,
      cateringType: 'PER_PERSON',
      cateringPricePerPerson: 850,
      cateringItemsJson: JSON.stringify([
        { item: 'Royal Indian Dinner Buffet', qty: 250, price: 850, total: 212500 },
      ]),
      cateringAmount: 212500,
      decorationType: 'PREMIUM',
      decorationAmount: 35000,
      servicesJson: JSON.stringify([
        { service: 'Live Violinist & Sound', qty: 1, price: 15000, total: 15000 },
        { service: 'Photo & Video Coverage', qty: 1, price: 15000, total: 15000 },
      ]),
      servicesAmount: 30000,
      subtotal: 352500,
      discountType: 'FIXED',
      discountValue: 12500,
      discountAmount: 12500,
      taxRate: 18.0,
      taxAmount: 61200,
      grandTotal: 401200,
      advancePayment: 401200,
      paidAmount: 401200,
      remainingAmount: 0,
      paymentStatus: 'PAID',
      bookingStatus: 'COMPLETED',
      checklistJson: JSON.stringify([
        { id: 't1', title: 'Golden Arch Setup', done: true },
        { id: 't2', title: 'Buffet Line Service', done: true },
        { id: 't3', title: 'Final Settlement', done: true },
      ]),
      staffAssignmentsJson: JSON.stringify([
        { role: 'Event Lead', name: 'Rajesh Mehta' },
      ]),
    },
  ];

  for (const evData of sampleEvents) {
    const createdEvent = await prisma.event.upsert({
      where: { eventNumber: evData.eventNumber },
      update: evData,
      create: evData,
    });

    // Sync Invoice record if not existing
    const invNumber = `INV-${createdEvent.eventNumber}`;
    const existingInv = await prisma.invoice.findFirst({ where: { invoiceNumber: invNumber } });
    if (!existingInv) {
      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber: invNumber,
          guestId: createdEvent.guestId || guestRahul.id,
          eventId: createdEvent.id,
          issueDate: createdEvent.createdAt,
          subtotal: createdEvent.subtotal,
          taxAmount: createdEvent.taxAmount,
          discountAmount: createdEvent.discountAmount,
          grandTotal: createdEvent.grandTotal,
          status: createdEvent.paymentStatus === 'PAID' ? 'PAID' : 'UNPAID',
          itemsJson: JSON.stringify([
            { description: `Hall Rental (${createdEvent.hallId})`, amount: createdEvent.hallCharge },
            { description: `Catering Service (${createdEvent.cateringType})`, amount: createdEvent.cateringAmount },
            { description: `Decoration Package (${createdEvent.decorationType})`, amount: createdEvent.decorationAmount },
            { description: `Additional Services`, amount: createdEvent.servicesAmount },
          ]),
        },
      });

      // Sync Payment record if advance/paid amount > 0
      if (createdEvent.paidAmount > 0) {
        await prisma.payment.create({
          data: {
            eventId: createdEvent.id,
            invoiceId: invoice.id,
            amount: createdEvent.paidAmount,
            method: 'BANK_TRANSFER',
            status: createdEvent.paymentStatus === 'PAID' ? 'PAID' : 'PARTIAL',
            notes: `Advance payment for event ${createdEvent.eventNumber}`,
          },
        });
      }
    }
  }

  console.log(`✅ Sample Events, Invoices, and Payments seeded successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed events error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
