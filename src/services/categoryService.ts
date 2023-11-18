import { Category } from "../models";

export const categoryService = {
    findAllPaginated: async (page: number, perPage: number) => {
        const offset = (page - 1) * perPage;

        const { count, rows } = await Category.findAndCountAll({
            order: [['position', 'ASC']],
            attributes: ['id', 'name', 'position'],
            offset: offset,
            limit: perPage
        });

        return {
            categories: rows,
            page: page,
            perPage: perPage,
            total: count
        }
    }
}