import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesController = {
    index: async (req: Request, res: Response) => {
        const [page, perPage] = getPaginationParams(req.query);

        try {
            const paginatedCategories = await categoryService.findAllPaginated(page, perPage)
            return res.json(paginatedCategories);
        }
        catch (err)
        {
            if(err instanceof Error) {
                res.status(400).json({ message: err.message});
            }
        }
    },

    show: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const categories = await categoryService.findByIdWithSeries(id);
            return res.json(categories);
        }
        catch (err)
        {
            if(err instanceof Error) {
                res.status(400).json({ message: err.message});
            }
        }
    },
}