import { prisma } from '../prisma';

export const getAllItems = () => prisma.item.findMany();

export const getItemById = (id: number) =>
    prisma.item.findUnique({
        where: { id }
    });

export const createItem = (name: string, price: number) =>
    prisma.item.create({
        data: { name, price }
    });

export const updateItem = (id: number, name: string, price: number) =>
    prisma.item.update({
        where: { id },
        data: { name, price }
    });

export const deleteItem = (id: number) =>
    prisma.item.delete({
        where: { id }
    });

export const clearItems = () => prisma.item.deleteMany();
