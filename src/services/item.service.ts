import { prisma } from '../prisma';

export const getAllItems = () => prisma.item.findMany();

export const createItem = (name: string, price: number) =>
    prisma.item.create({
        data: { name, price }
    });

export const clearItems = () => prisma.item.deleteMany(); // útil para tests
