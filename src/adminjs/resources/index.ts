import { ResourceWithOptions } from "adminjs";
import { Category, Episode, Serie } from "../../models";
import { categoryResourceOptions } from "./category";
import { serieResourceOptions } from "./serie";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource: Serie,
        options: serieResourceOptions
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    }
]