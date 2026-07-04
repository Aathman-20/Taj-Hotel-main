import path from 'path';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const dbUrl = path.resolve(process.cwd(), 'dev.db');
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.menuItem.deleteMany();

  await prisma.menuItem.createMany({
    data: [
      // STARTERS (original starters + former Heritage dishes merged in)
      {
        name: 'Bohri Samosa',
        description: 'Smoked mutton mince, mint chutney',
        price: 885,
        category: 'Starters',
        dietType: 'nonveg',
        imageUrl: '/images/dishes/bohri-samosa.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'Jaitooni Pudina Paneer Tikka',
        description: 'Pepitas, raisin chaat, tomato chutney',
        price: 885,
        category: 'Starters',
        dietType: 'veg',
        imageUrl: '/images/dishes/paneer-tikka.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'Ajwaini Chicken Tikka',
        description: 'Smoked fruit chaat, kachumber, mint chutney',
        price: 885,
        category: 'Starters',
        dietType: 'nonveg',
        imageUrl: '/images/dishes/chicken-tikka.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'Burrata Salad',
        description: 'Heirloom tomatoes, aged balsamic vinegar, olive oil, toasted brioche',
        price: 735,
        category: 'Starters',
        dietType: 'veg',
        imageUrl: '/images/dishes/burrata-salad.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'Jardaloo Salli Boti',
        description: 'Lamb in sweet, sour, and spicy gravy topped with straw potatoes',
        price: 1450,
        category: 'Starters',
        dietType: 'nonveg',
        imageUrl: '/images/dishes/jardaloo-salli-boti.jpg',
        cutoutUrl: '/images/dishes/jardaloo-salli-boti.jpg',
        isSignature: true,
        isAvailable: true,
      },
      {
        name: 'Patra Ma Paneer',
        description: 'Steamed cottage cheese wrapped in banana leaf with mint chutney',
        price: 825,
        category: 'Starters',
        dietType: 'veg',
        imageUrl: '/images/dishes/patra-ma-paneer.jpg',
        isSignature: false,
        isAvailable: true,
      },
      // HERITAGE (formerly Mains)
      {
        name: 'Lamb Best End Chops',
        description: 'Premium grilled lamb chops',
        price: 1325,
        category: 'Heritage',
        dietType: 'nonveg',
        imageUrl: '/images/dishes/lamb-chops-revealed.jpg',
        cutoutUrl: '/images/dishes/lamb-chops-revealed.jpg',
        isSignature: true,
        isAvailable: true,
      },
      {
        name: 'Kasundi Salmon Tikka',
        description: 'Quinoa sprouts salad, cashewnut-curry leaf chutney',
        price: 1950,
        category: 'Heritage',
        dietType: 'nonveg',
        imageUrl: '/images/dishes/salmon-tikka-revealed.jpg',
        cutoutUrl: '/images/dishes/salmon-tikka-revealed.jpg',
        isSignature: true,
        isAvailable: true,
      },
      {
        name: 'Goan Pomfret Curry',
        description: 'Coconut curry flavoured with Garcinia Indica rind, steamed basmati rice',
        price: 1425,
        category: 'Heritage',
        dietType: 'nonveg',
        imageUrl: '/images/dishes/goan-pomfret-curry.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'Rajma Chawal',
        description: 'Homestyle kidney bean curry with steamed rice',
        price: 735,
        category: 'Heritage',
        dietType: 'veg',
        imageUrl: '/images/dishes/rajma-chawal.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'Pav Bhaji',
        description: 'Spicy mashed potato and vegetable mixture, buttered pav',
        price: 485,
        category: 'Heritage',
        dietType: 'veg',
        imageUrl: '/images/dishes/pav-bhaji.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'Chole Kulche',
        description: 'Spicy chickpeas, baked leavened bread',
        price: 1350,
        category: 'Heritage',
        dietType: 'veg',
        imageUrl: '/images/dishes/chole-kulche.jpg',
        isSignature: false,
        isAvailable: true,
      },
      // DESSERTS
      {
        name: 'Pecan Nut Pudding Baklava',
        description: 'Served with vanilla key lime sauce',
        price: 700,
        category: 'Desserts',
        dietType: 'veg',
        imageUrl: '/images/dishes/pecan-baklava.jpg',
        isSignature: false,
        isAvailable: true,
      },
      {
        name: 'VSOP Chocolate Mousse',
        description: 'Classic baked madeleine and candied orange',
        price: 635,
        category: 'Desserts',
        dietType: 'veg',
        imageUrl: '/images/dishes/chocolate-mousse.jpg',
        isSignature: false,
        isAvailable: true,
      },
    ],
  });

  console.log('Seed complete — 14 Shamiana dishes inserted.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
