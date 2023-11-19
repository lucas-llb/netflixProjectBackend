import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";


export const episodesController = {
    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query;

        try {
            if(typeof videoUrl !== 'string'){
                throw new Error('VideoUrl must be a string');
            }
            const range = req.headers.range; //bytes=0-1024

            episodeService.streamEpisodeToResponse(res, videoUrl, range);
        }
        catch (err) {
            if (err instanceof Error){
                res.status(400).json( { message: err.message })
            }
        }
    }
}