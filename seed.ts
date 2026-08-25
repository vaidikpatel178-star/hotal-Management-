import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting HOTELNEX AI Seed Script...');

  // Clean existing tables
  await prisma.auditLog.deleteMany();
  await prisma.aIConversation.deleteMany();
  await prisma.aIPrediction.deleteMany();
  await prisma.aIRecommendation.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.review.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.inventoryTransaction.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.foodOrderItem.deleteMany();
  await prisma.foodOrder.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.restaurantTable.deleteMany();
  await prisma.housekeepingTask.deleteMany();
  await prisma.maintenanceRequest.deleteMany();
  await prisma.staffAttendance.deleteMany();
  await prisma.staffShift.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.checkOut.deleteMany();
  await prisma.checkIn.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.roomType.deleteMany();
  await prisma.guestDocument.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Demo Users
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const managerPassword = await bcrypt.hash('Manager@123', 10);
  const receptionPassword = await bcrypt.hash('Reception@123', 10);
  const kitchenPassword = await bcrypt.hash('Kitchen@123', 10);
  const housekeepingPassword = await bcrypt.hash('Housekeeping@123', 10);
  const accountantPassword = await bcrypt.hash('Accountant@123', 10);

  const superAdmin = await prisma.user.create({
    data: {
      name: 'Grand Administrator',
      email: 'admin@hotelnex.com',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    },
  });

  const hotelManager = await prisma.user.create({
    data: {
      name: 'Rajesh Mehta',
      email: 'manager@hotelnex.com',
      passwordHash: managerPassword,
      role: 'HOTEL_MANAGER',
      phone: '+91 98765 43211',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    },
  });

  const receptionist = await prisma.user.create({
    data: {
      name: 'Sunita Sharma',
      email: 'reception@hotelnex.com',
      passwordHash: receptionPassword,
      role: 'RECEPTIONIST',
      phone: '+91 98765 43212',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    },
  });

  const kitchenStaff = await prisma.user.create({
    data: {
      name: 'Chef Vikram Singh',
      email: 'kitchen@hotelnex.com',
      passwordHash: kitchenPassword,
      role: 'KITCHEN_STAFF',
      phone: '+91 98765 43213',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=250&q=80',
    },
  });

  const housekeepingStaff = await prisma.user.create({
    data: {
      name: 'Ramesh Pawar',
      email: 'housekeeping@hotelnex.com',
      passwordHash: housekeepingPassword,
      role: 'HOUSEKEEPING',
      phone: '+91 98765 43214',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=250&q=80',
    },
  });

  const accountant = await prisma.user.create({
    data: {
      name: 'Anil Deshmukh',
      email: 'accountant@hotelnex.com',
      passwordHash: accountantPassword,
      role: 'ACCOUNTANT',
      phone: '+91 98765 43215',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    },
  });

  console.log('✅ Users created');

  // 2. Staff Profiles
  await prisma.staff.create({
    data: {
      userId: hotelManager.id,
      employeeId: 'EMP-1001',
      department: 'MANAGEMENT',
      designation: 'General Hotel Manager',
      joinDate: '2022-01-15',
      salary: 95000,
      shift: 'General (09:00 - 18:00)',
      status: 'ACTIVE',
    },
  });

  const receptionStaffRecord = await prisma.staff.create({
    data: {
      userId: receptionist.id,
      employeeId: 'EMP-1002',
      department: 'RECEPTION',
      designation: 'Senior Front Desk Executive',
      joinDate: '2023-03-10',
      salary: 38000,
      shift: 'Morning (07:00 - 15:30)',
      status: 'ACTIVE',
    },
  });

  const housekeepingStaffRecord = await prisma.staff.create({
    data: {
      userId: housekeepingStaff.id,
      employeeId: 'EMP-1003',
      department: 'HOUSEKEEPING',
      designation: 'Housekeeping Supervisor',
      joinDate: '2023-06-01',
      salary: 28000,
      shift: 'Morning (07:00 - 15:30)',
      status: 'ACTIVE',
    },
  });

  await prisma.staff.create({
    data: {
      userId: kitchenStaff.id,
      employeeId: 'EMP-1004',
      department: 'KITCHEN',
      designation: 'Executive Chef',
      joinDate: '2022-08-20',
      salary: 65000,
      shift: 'Afternoon (14:00 - 22:30)',
      status: 'ACTIVE',
    },
  });

  await prisma.staff.create({
    data: {
      userId: accountant.id,
      employeeId: 'EMP-1005',
      department: 'ACCOUNTS',
      designation: 'Chief Financial Accountant',
      joinDate: '2023-01-05',
      salary: 55000,
      shift: 'General (09:30 - 18:30)',
      status: 'ACTIVE',
    },
  });

  // 3. Room Types
  const standardType = await prisma.roomType.create({
    data: {
      name: 'Standard Room',
      code: 'STD',
      basePrice: 3500,
      description: 'Elegant, comfortable room with queen bed, smart TV, high-speed Wi-Fi, and work desk.',
      capacity: 2,
      bedType: 'Queen',
      amenities: 'Wi-Fi, AC, Smart TV, Tea/Coffee Maker, Safe Box, Mini Bar',
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    },
  });

  const deluxeType = await prisma.roomType.create({
    data: {
      name: 'Deluxe Room',
      code: 'DLX',
      basePrice: 5500,
      description: 'Spacious luxury room featuring city view, king plush bed, rain shower, and premium amenities.',
      capacity: 2,
      bedType: 'King',
      amenities: 'Wi-Fi, AC, 55" Smart TV, Rain Shower, City View, Mini Bar, Espresso Machine',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    },
  });

  const premiumType = await prisma.roomType.create({
    data: {
      name: 'Premium Sea View',
      code: 'PRM',
      basePrice: 8000,
      description: 'Breathtaking ocean views, private balcony, marble bathroom, and 24/7 butler service.',
      capacity: 3,
      bedType: 'King',
      amenities: 'Wi-Fi, AC, Ocean View Balcony, Bathtub, Espresso Machine, Butler Service, Plush Robes',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    },
  });

  const suiteType = await prisma.roomType.create({
    data: {
      name: 'Presidential Suite',
      code: 'STE',
      basePrice: 12500,
      description: 'Ultra-luxurious suite with living room, dining area, Jacuzzi, panoramic skyline view.',
      capacity: 4,
      bedType: 'King + Twin',
      amenities: 'Wi-Fi, Central AC, Jacuzzi, Living Lounge, Dining Table, Sky Bar, Free Spa Pass',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    },
  });

  const familyType = await prisma.roomType.create({
    data: {
      name: 'Family Executive',
      code: 'FAM',
      basePrice: 9500,
      description: 'Designed for family comfort with two connected rooms, kids zone, and double queen beds.',
      capacity: 5,
      bedType: '2 Double Queens',
      amenities: 'Wi-Fi, Dual AC, 2 TVs, Gaming Console, Microwave, Family Dining Area',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    },
  });

  console.log('✅ Room Types created');

  // 4. Create 20 Rooms (101 to 120)
  const roomDefinitions = [
    { num: '101', type: standardType, floor: 1, status: 'AVAILABLE' },
    { num: '102', type: standardType, floor: 1, status: 'OCCUPIED' },
    { num: '103', type: standardType, floor: 1, status: 'AVAILABLE' },
    { num: '104', type: standardType, floor: 1, status: 'CLEANING' },
    { num: '105', type: standardType, floor: 1, status: 'RESERVED' },

    { num: '106', type: deluxeType, floor: 1, status: 'AVAILABLE' },
    { num: '107', type: deluxeType, floor: 1, status: 'OCCUPIED' },
    { num: '108', type: deluxeType, floor: 1, status: 'AVAILABLE' },
    { num: '109', type: deluxeType, floor: 1, status: 'MAINTENANCE' },
    { num: '110', type: deluxeType, floor: 1, status: 'OCCUPIED' },

    { num: '201', type: premiumType, floor: 2, status: 'OCCUPIED' },
    { num: '202', type: premiumType, floor: 2, status: 'AVAILABLE' },
    { num: '203', type: premiumType, floor: 2, status: 'RESERVED' },
    { num: '204', type: premiumType, floor: 2, status: 'OCCUPIED' },
    { num: '205', type: premiumType, floor: 2, status: 'AVAILABLE' },

    { num: '301', type: suiteType, floor: 3, status: 'OCCUPIED' },
    { num: '302', type: suiteType, floor: 3, status: 'AVAILABLE' },
    { num: '303', type: suiteType, floor: 3, status: 'CLEANING' },
    { num: '304', type: familyType, floor: 3, status: 'OCCUPIED' },
    { num: '305', type: familyType, floor: 3, status: 'AVAILABLE' },
  ];

  const createdRooms: Record<string, any> = {};
  for (const rDef of roomDefinitions) {
    const room = await prisma.room.create({
      data: {
        roomNumber: rDef.num,
        roomTypeId: rDef.type.id,
        floor: rDef.floor,
        pricePerNight: rDef.type.basePrice,
        capacity: rDef.type.capacity,
        bedType: rDef.type.bedType,
        amenities: rDef.type.amenities,
        status: rDef.status,
        notes: `Floor ${rDef.floor} room`,
      },
    });
    createdRooms[rDef.num] = room;
  }
  console.log('✅ 20 Rooms created');

  // 5. Guests
  const guest1 = await prisma.guest.create({
    data: {
      name: 'Rahul Patel',
      email: 'rahul.patel@example.com',
      phone: '+91 98250 12345',
      address: '402 Sunset Heights, SG Highway, Ahmedabad',
      dateOfBirth: '1988-11-14',
      idType: 'Aadhaar',
      idNumber: '8876 5432 1098',
      nationality: 'Indian',
      preferences: 'High Floor, Non-Smoking, Cold Coffee lover',
      totalStays: 4,
      totalSpending: 42500,
    },
  });

  const guest2 = await prisma.guest.create({
    data: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98980 67890',
      address: '12 Marine Drive, Churchgate, Mumbai',
      dateOfBirth: '1992-04-22',
      idType: 'Passport',
      idNumber: 'Z9876543',
      nationality: 'Indian',
      preferences: 'Sea view room, Extra towels, Soft pillows',
      totalStays: 2,
      totalSpending: 24000,
    },
  });

  const guest3 = await prisma.guest.create({
    data: {
      name: 'Amit Shah',
      email: 'amit.shah@example.com',
      phone: '+91 97129 44556',
      address: '78 Sector 17, Chandigarh',
      dateOfBirth: '1984-07-09',
      idType: 'Driving License',
      idNumber: 'DL-04201994852',
      nationality: 'Indian',
      preferences: 'Early check-in request, Vegetarian food only',
      totalStays: 6,
      totalSpending: 68000,
    },
  });

  const guest4 = await prisma.guest.create({
    data: {
      name: 'Ananya Roy',
      email: 'ananya.roy@example.com',
      phone: '+91 98300 11223',
      address: '15 Salt Lake City, Kolkata',
      dateOfBirth: '1995-02-18',
      idType: 'Aadhaar',
      idNumber: '4567 8901 2345',
      nationality: 'Indian',
      preferences: 'Quiet corner room, Jain meals',
      totalStays: 1,
      totalSpending: 12500,
    },
  });

  console.log('✅ Guests created');

  // 6. Reservations & Check-Ins
  const today = new Date();
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  const threeDaysLater = new Date(today); threeDaysLater.setDate(today.getDate() + 3);

  // Active checked in reservation 1 (Room 102)
  const res1 = await prisma.reservation.create({
    data: {
      bookingCode: 'HN-2026-0801',
      guestId: guest1.id,
      roomId: createdRooms['102'].id,
      checkInDate: yesterday,
      checkOutDate: tomorrow,
      adults: 2,
      children: 0,
      nights: 2,
      roomRate: 3500,
      discount: 200,
      tax: 630,
      totalAmount: 7430,
      advancePayment: 4000,
      remainingAmount: 3430,
      source: 'DIRECT',
      status: 'CHECKED_IN',
      notes: 'Guest requested late check-out if possible.',
    },
  });

  await prisma.checkIn.create({
    data: {
      reservationId: res1.id,
      roomId: createdRooms['102'].id,
      guestId: guest1.id,
      checkInTime: yesterday,
      idVerified: true,
      keyCardNumber: 'KC-102',
      initialDeposit: 4000,
    },
  });

  // Active checked in reservation 2 (Room 204)
  const res2 = await prisma.reservation.create({
    data: {
      bookingCode: 'HN-2026-0802',
      guestId: guest2.id,
      roomId: createdRooms['204'].id,
      checkInDate: yesterday,
      checkOutDate: threeDaysLater,
      adults: 2,
      children: 1,
      nights: 4,
      roomRate: 8000,
      discount: 1000,
      tax: 5580,
      totalAmount: 36580,
      advancePayment: 20000,
      remainingAmount: 16580,
      source: 'WEBSITE',
      status: 'CHECKED_IN',
    },
  });

  await prisma.checkIn.create({
    data: {
      reservationId: res2.id,
      roomId: createdRooms['204'].id,
      guestId: guest2.id,
      checkInTime: yesterday,
      idVerified: true,
      keyCardNumber: 'KC-204',
      initialDeposit: 20000,
    },
  });

  // Future Confirmed Reservation (Room 105)
  await prisma.reservation.create({
    data: {
      bookingCode: 'HN-2026-0803',
      guestId: guest3.id,
      roomId: createdRooms['105'].id,
      checkInDate: tomorrow,
      checkOutDate: threeDaysLater,
      adults: 1,
      children: 0,
      nights: 2,
      roomRate: 3500,
      discount: 0,
      tax: 630,
      totalAmount: 7630,
      advancePayment: 2000,
      remainingAmount: 5630,
      source: 'OTA',
      status: 'CONFIRMED',
    },
  });

  console.log('✅ Reservations & Check-Ins created');

  // 7. Restaurant Tables
  const tableData = [
    { num: 'T-01', cap: 2, floor: 'Main Dining', status: 'OCCUPIED' },
    { num: 'T-02', cap: 4, floor: 'Main Dining', status: 'AVAILABLE' },
    { num: 'T-03', cap: 4, floor: 'Main Dining', status: 'OCCUPIED' },
    { num: 'T-04', cap: 6, floor: 'VIP Lounge', status: 'RESERVED' },
    { num: 'T-05', cap: 2, floor: 'Terrace Bar', status: 'BILL_REQUESTED' },
    { num: 'T-06', cap: 8, floor: 'VIP Lounge', status: 'AVAILABLE' },
    { num: 'T-07', cap: 4, floor: 'Main Dining', status: 'AVAILABLE' },
    { num: 'T-08', cap: 4, floor: 'Terrace Bar', status: 'AVAILABLE' },
  ];

  const createdTables: Record<string, any> = {};
  for (const t of tableData) {
    const table = await prisma.restaurantTable.create({
      data: {
        tableNumber: t.num,
        capacity: t.cap,
        floor: t.floor,
        status: t.status,
      },
    });
    createdTables[t.num] = table;
  }

  // 8. Menu Categories & Items
  const catStarters = await prisma.menuCategory.create({ data: { name: 'Starters', description: 'Appetizers & finger foods', icon: 'Utensils', displayOrder: 1 } });
  const catMains = await prisma.menuCategory.create({ data: { name: 'Main Course', description: 'Hearty Indian & Global mains', icon: 'Soup', displayOrder: 2 } });
  const catPizza = await prisma.menuCategory.create({ data: { name: 'Pizza & Pasta', description: 'Wood-fired pizzas and pasta', icon: 'Pizza', displayOrder: 3 } });
  const catBurgers = await prisma.menuCategory.create({ data: { name: 'Burgers & Sandwiches', description: 'Gourmet burgers and deli sandwiches', icon: 'Sandwich', displayOrder: 4 } });
  const catBeverages = await prisma.menuCategory.create({ data: { name: 'Beverages & Shakes', description: 'Artisanal coffees, shakes & mocktails', icon: 'Coffee', displayOrder: 5 } });
  const catDesserts = await prisma.menuCategory.create({ data: { name: 'Desserts', description: 'Sweet indulgences & pastries', icon: 'IceCream', displayOrder: 6 } });

  const itemPizza = await prisma.menuItem.create({
    data: {
      categoryId: catPizza.id,
      name: 'Paneer Tikka Pizza',
      description: 'Mozzarella, spiced paneer cubes, capsicum, onions, and signature makhani sauce.',
      price: 420,
      costPrice: 145,
      taxRate: 5.0,
      isVeg: true,
      isBestSeller: true,
      prepTimeMinutes: 20,
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    },
  });

  const itemCoffee = await prisma.menuItem.create({
    data: {
      categoryId: catBeverages.id,
      name: 'Signature Cold Coffee',
      description: 'Double espresso blended with rich cream, dark cocoa, vanilla scoop, and whipped cream.',
      price: 220,
      costPrice: 65,
      taxRate: 5.0,
      isVeg: true,
      isBestSeller: true,
      prepTimeMinutes: 8,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80',
    },
  });

  const itemPaneerButter = await prisma.menuItem.create({
    data: {
      categoryId: catMains.id,
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese simmered in a velvety tomato, cream, and butter sauce with aromatic spices.',
      price: 380,
      costPrice: 130,
      taxRate: 5.0,
      isVeg: true,
      isBestSeller: true,
      prepTimeMinutes: 18,
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    },
  });

  const itemNaan = await prisma.menuItem.create({
    data: {
      categoryId: catMains.id,
      name: 'Butter Garlic Naan',
      description: 'Refined flour flatbread brushed with garlic butter and fresh coriander cooked in tandoor.',
      price: 75,
      costPrice: 18,
      taxRate: 5.0,
      isVeg: true,
      isBestSeller: false,
      prepTimeMinutes: 10,
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    },
  });

  const itemSandwich = await prisma.menuItem.create({
    data: {
      categoryId: catBurgers.id,
      name: 'Club Veg Supreme Sandwich',
      description: 'Triple decker toasted sandwich with grilled vegetables, cheese slice, mint chutney & fries.',
      price: 260,
      costPrice: 85,
      taxRate: 5.0,
      isVeg: true,
      isBestSeller: false,
      prepTimeMinutes: 12,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    },
  });

  const itemBrownie = await prisma.menuItem.create({
    data: {
      categoryId: catDesserts.id,
      name: 'Sizzling Chocolate Brownie',
      description: 'Warm fudge brownie served on a sizzler plate with vanilla ice cream and hot chocolate fudge.',
      price: 280,
      costPrice: 90,
      taxRate: 5.0,
      isVeg: true,
      isBestSeller: true,
      prepTimeMinutes: 10,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    },
  });

  console.log('✅ Restaurant Menu created');

  // 9. Ingredients & Recipes
  const ingFlour = await prisma.ingredient.create({ data: { name: 'Refined Flour (Maida)', category: 'Flour', unit: 'kg', currentStock: 45.0, minimumStock: 15.0, purchasePrice: 40 } });
  const ingCheese = await prisma.ingredient.create({ data: { name: 'Mozzarella Cheese', category: 'Dairy', unit: 'kg', currentStock: 8.5, minimumStock: 10.0, purchasePrice: 420 } }); // LOW STOCK ALERT
  const ingPaneer = await prisma.ingredient.create({ data: { name: 'Fresh Paneer', category: 'Dairy', unit: 'kg', currentStock: 18.0, minimumStock: 8.0, purchasePrice: 280 } });
  const ingMilk = await prisma.ingredient.create({ data: { name: 'Full Cream Milk', category: 'Dairy', unit: 'l', currentStock: 30.0, minimumStock: 10.0, purchasePrice: 65 } });
  const ingCoffee = await prisma.ingredient.create({ data: { name: 'Arabica Coffee Beans', category: 'Beverages', unit: 'kg', currentStock: 6.0, minimumStock: 3.0, purchasePrice: 850 } });
  const ingTomatoes = await prisma.ingredient.create({ data: { name: 'Fresh Tomatoes', category: 'Produce', unit: 'kg', currentStock: 25.0, minimumStock: 10.0, purchasePrice: 35 } });
  const ingButter = await prisma.ingredient.create({ data: { name: 'Amul Butter', category: 'Dairy', unit: 'kg', currentStock: 12.0, minimumStock: 5.0, purchasePrice: 520 } });

  // Recipe for Paneer Pizza
  const recPizza = await prisma.recipe.create({
    data: {
      menuItemId: itemPizza.id,
      name: 'Paneer Tikka Pizza Recipe',
      instructions: 'Prepare dough with flour, roll to 10 inch, spread pizza sauce, add mozzarella and paneer cubes, bake at 280C for 8 minutes.',
    },
  });

  await prisma.recipeIngredient.createMany({
    data: [
      { recipeId: recPizza.id, ingredientId: ingFlour.id, quantityRequired: 0.2, unit: 'kg' },
      { recipeId: recPizza.id, ingredientId: ingCheese.id, quantityRequired: 0.1, unit: 'kg' },
      { recipeId: recPizza.id, ingredientId: ingPaneer.id, quantityRequired: 0.08, unit: 'kg' },
    ],
  });

  // Recipe for Cold Coffee
  const recCoffee = await prisma.recipe.create({
    data: {
      menuItemId: itemCoffee.id,
      name: 'Cold Coffee Recipe',
      instructions: 'Blend 250ml milk with 15g coffee powder and 20g sugar, add ice cubes and top with cocoa powder.',
    },
  });

  await prisma.recipeIngredient.createMany({
    data: [
      { recipeId: recCoffee.id, ingredientId: ingMilk.id, quantityRequired: 0.25, unit: 'l' },
      { recipeId: recCoffee.id, ingredientId: ingCoffee.id, quantityRequired: 0.015, unit: 'kg' },
    ],
  });

  console.log('✅ Ingredients & Recipes created');

  // 10. Active Food Orders (Dine-in, Room Service, KDS)
  // Order 1: Room Service for Room 102 (Rahul Patel)
  const order1 = await prisma.foodOrder.create({
    data: {
      orderNumber: 'ORD-1001',
      orderType: 'ROOM_SERVICE',
      roomId: createdRooms['102'].id,
      guestId: guest1.id,
      status: 'PREPARING',
      subtotal: 640,
      tax: 32,
      totalAmount: 672,
      paymentStatus: 'BILLED_TO_ROOM',
      kitchenNotes: 'Extra spicy pizza, less ice in coffee please.',
    },
  });

  await prisma.foodOrderItem.createMany({
    data: [
      { orderId: order1.id, menuItemId: itemPizza.id, quantity: 1, unitPrice: 420, totalPrice: 420 },
      { orderId: order1.id, menuItemId: itemCoffee.id, quantity: 1, unitPrice: 220, totalPrice: 220 },
    ],
  });

  // Order 2: Table Order (T-01) - NEW state for KDS
  const order2 = await prisma.foodOrder.create({
    data: {
      orderNumber: 'ORD-1002',
      orderType: 'DINE_IN',
      tableId: createdTables['T-01'].id,
      status: 'NEW',
      subtotal: 835,
      tax: 41.75,
      totalAmount: 876.75,
      paymentStatus: 'PENDING',
      kitchenNotes: 'Without onion garlic in Paneer Butter Masala.',
    },
  });

  await prisma.foodOrderItem.createMany({
    data: [
      { orderId: order2.id, menuItemId: itemPaneerButter.id, quantity: 1, unitPrice: 380, totalPrice: 380 },
      { orderId: order2.id, menuItemId: itemNaan.id, quantity: 2, unitPrice: 75, totalPrice: 150 },
      { orderId: order2.id, menuItemId: itemCoffee.id, quantity: 1, unitPrice: 220, totalPrice: 220 },
    ],
  });

  console.log('✅ Active Food Orders & KDS queue created');

  // 11. Housekeeping & Maintenance Tasks
  await prisma.housekeepingTask.create({
    data: {
      roomId: createdRooms['104'].id,
      taskType: 'ROOM_CLEANING',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      assignedStaffId: housekeepingStaffRecord.id,
      notes: 'Checkout cleaning for next guest arrival at 14:00.',
    },
  });

  await prisma.housekeepingTask.create({
    data: {
      roomId: createdRooms['303'].id,
      taskType: 'DEEP_CLEANING',
      priority: 'MEDIUM',
      status: 'PENDING',
      assignedStaffId: housekeepingStaffRecord.id,
      notes: 'Deep carpet shampoo and curtain steaming required.',
    },
  });

  await prisma.maintenanceRequest.create({
    data: {
      roomId: createdRooms['109'].id,
      issueTitle: 'AC Cooling Leak',
      description: 'Air conditioner in Room 109 is leaking water and not cooling below 24°C.',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      reportedBy: 'Housekeeping',
    },
  });

  console.log('✅ Housekeeping & Maintenance created');

  // 12. Financial Expenses & Reviews
  await prisma.expense.createMany({
    data: [
      { category: 'FOOD_PURCHASE', title: 'Dairy & Cheese Wholesale Supply', amount: 14500, paymentMethod: 'BANK_TRANSFER', notes: 'Monthly invoice #402' },
      { category: 'ELECTRICITY', title: 'State Electricity Board Bill - August', amount: 38500, paymentMethod: 'BANK_TRANSFER' },
      { category: 'MARKETING', title: 'Google & Instagram Ads Campaign', amount: 12000, paymentMethod: 'CARD' },
      { category: 'MAINTENANCE', title: 'Elevator Servicing & HVAC Filter Replace', amount: 18500, paymentMethod: 'BANK_TRANSFER' },
    ],
  });

  await prisma.review.create({
    data: {
      guestId: guest1.id,
      rating: 5,
      comment: 'Exceptional hospitality! The room was spotless, sea view was stunning, and the Paneer Pizza from room service was fresh and warm.',
      sentiment: 'POSITIVE',
      roomExperienceRating: 5,
      foodServiceRating: 5,
      suggestedAction: 'Send thank you voucher for next visit.',
    },
  });

  await prisma.review.create({
    data: {
      guestId: guest2.id,
      rating: 3,
      comment: 'Room comfort was great but kitchen preparation took over 40 minutes for lunch order.',
      sentiment: 'NEUTRAL',
      roomExperienceRating: 5,
      foodServiceRating: 2,
      mainIssue: 'Slow Kitchen Preparation',
      suggestedAction: 'Review dinner peak hour kitchen staffing.',
    },
  });

  // 13. Notifications & AI Recommendations
  await prisma.notification.createMany({
    data: [
      { title: 'Low Inventory Warning', message: 'Mozzarella Cheese stock is below minimum threshold (8.5kg remaining).', type: 'WARNING', targetRole: 'RESTAURANT_MANAGER' },
      { title: 'New VIP Reservation', message: 'Presidential Suite booked for tomorrow by Mr. Amit Shah.', type: 'INFO', targetRole: 'RECEPTIONIST' },
      { title: 'Urgent Maintenance Ticket', message: 'Room 109 AC repair in progress.', type: 'ALERT', targetRole: 'HOTEL_MANAGER' },
    ],
  });

  await prisma.aIRecommendation.createMany({
    data: [
      {
        category: 'PRICING',
        priority: 'HIGH',
        title: 'Increase Deluxe Room Weekend Pricing by 10%',
        reason: 'Weekend occupancy forecast is 88%, while Deluxe rooms are already 70% booked.',
        expectedImpact: '+₹14,500 additional weekend revenue',
        actionText: 'Update Room Rates',
      },
      {
        category: 'COMBO',
        priority: 'MEDIUM',
        title: 'Promote "Paneer Pizza + Signature Cold Coffee" Smart Combo',
        reason: 'These 2 items are ordered together in 42% of dinner room service orders with a 62% combined gross margin.',
        expectedImpact: '+18% higher average order value',
        actionText: 'Activate Menu Combo ₹549',
      },
    ],
  });

  console.log('🎉 HOTELNEX AI Seed Script completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed script error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
