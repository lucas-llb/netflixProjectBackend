import { Request, Response } from "express";
import { serieService } from "../services/serieService";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const seriesController = {
    show: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const series = await serieService.findByIdWithEpisodes(id);

            return res.json(series);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    featured: async (req: Request, res: Response) => {
        try {
            const featuredSeries = await serieService.getRandomFeaturedSeries();

            return res.json(featuredSeries);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    newest: async (req: Request, res: Response) => {
        try {
            const newestSeries = await serieService.getTopTenNewest();

            return res.json(newestSeries);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },

    search: async (req: Request, res: Response) => {
        const { name } = req.query;
        const [page, perPage] = getPaginationParams(req.query)
        try {
            if(typeof name !== 'string'){
                throw new Error('Name must be a string')
            }

            const filteredSeries = await serieService.findByName(name, page, perPage);

            return res.json(filteredSeries);
        }
        catch (err) {
            if(err instanceof Error){
                return res.status(400).json({ message: err.message })
            }
        }
    },
}