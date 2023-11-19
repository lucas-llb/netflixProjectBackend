import { Op } from "sequelize";
import { Serie } from "../models"

export const serieService = {
    findByIdWithEpisodes: async (id: string) => {
        const serieWithEpisodes = await Serie.findByPk(id, {
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            include: {
                association: 'episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                order: [['order', 'ASC']],
                separate: true
            }
        });

        return serieWithEpisodes;
    },

    getRandomFeaturedSeries: async () => {
        const featuredSeries = await Serie.findAll( {
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                featured: true
            }
        });

        const randomFeaturedSeries = featuredSeries.sort(() => 0.5 - Math.random());

        return randomFeaturedSeries.slice(0, 3);
    },

    getTopTenNewest: async () => {
        const series = await Serie.findAll({
            limit: 10,
            order: [['created_at', 'DESC']]
        })

        return series;
    },

    findByName: async (name: string, page: number, perPage: number) => {
        const offset = ( page - 1) * perPage;
        const {count, rows } = await Serie.findAndCountAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            limit: perPage,
            offset: offset
        })

        return {
            series: rows,
            page: page,
            perPage: perPage,
            total: count
        };
    }
}