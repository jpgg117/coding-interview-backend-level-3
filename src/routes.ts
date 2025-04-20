import { ServerRoute } from '@hapi/hapi';
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
        handler: async (request) => {
            const { name, price } = request.payload as { name: string; price: number };
            return await ItemService.createItem(name, price);
        }
    }
];
