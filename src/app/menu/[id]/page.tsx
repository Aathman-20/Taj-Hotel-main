import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import DishDetailClient from './DishDetailClient';

export default async function DishDetailPage({ params }: { params: { id: string } }) {
  const dish = await prisma.menuItem.findUnique({ where: { id: params.id } });
  if (!dish) notFound();
  return <DishDetailClient dish={JSON.parse(JSON.stringify(dish))} />;
}
