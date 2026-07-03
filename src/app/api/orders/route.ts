import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const OrderSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(10),
  address: z.string().min(5),
  orderType: z.enum(['delivery', 'pickup']),
  notes: z.string().optional(),
  items: z.array(z.object({
    menuItemId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
  })),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = OrderSchema.parse(body);
    const totalAmount = parsed.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await prisma.order.create({
      data: {
        customerName: parsed.customerName,
        phone: parsed.phone,
        address: parsed.address,
        orderType: parsed.orderType,
        notes: parsed.notes,
        totalAmount,
        items: {
          create: parsed.items.map((i) => ({
            menuItemId: i.menuItemId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(order);
}
