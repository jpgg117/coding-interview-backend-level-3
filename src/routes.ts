import {ServerRoute} from '@hapi/hapi';
import * as ItemService from './services/item.service';

export const defineRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/ping',
        handler: async (request, h) => {
            return {
                ok: true
            }
        }
    },
    {
        method: 'GET',
        path: '/items',
        handler: async () => {
            return await ItemService.getAllItems();
        }
    },
    {
        method: 'POST',
        path: '/items',
        handler: async (request, h) => {
            const { name, price } = request.payload as { name: string; price: number };
            const item = await ItemService.createItem(name, price);
            return h.response(item).code(201);
        }
    },
    {
        method: 'GET',
        path: '/items/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const item = await ItemService.getItemById(id);

            if (!item) {
                return h.response({ message: 'Item not found' }).code(404);
            }

            return item;
        }
    },
    {
        method: 'PUT',
        path: '/items/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id);
            const { name, price } = request.payload as { name: string; price: number };

            try {
                return await ItemService.updateItem(id, name, price);
            } catch (error: any) {
                if (error.code === 'P2025') {
                    return h.response({ message: 'Item not found' }).code(404);
                }
                console.error(error);
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        }
    },
    {
        method: 'DELETE',
        path: '/items/{id}',
        handler: async (request, h) => {
            const id = parseInt(request.params.id);

            try {
                await ItemService.deleteItem(id);
                return h.response().code(204); // No Content
            } catch (error: any) {
                if (error.code === 'P2025') {
                    return h.response({ message: 'Item not found' }).code(404);
                }
                console.error(error);
                return h.response({ message: 'Internal Server Error' }).code(500);
            }
        }
    }
];
