import { prisma } from '@/lib/prisma';
import MenuPageClient from './MenuPageClient';

export default async function MenuPage() {
  const allDishes = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    orderBy: { category: 'asc' },
  });

  return <MenuPageClient dishes={JSON.parse(JSON.stringify(allDishes))} />;
}
