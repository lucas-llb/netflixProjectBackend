import { Category } from "./Category";
import { Episode } from "./Episode";
import { Serie } from "./Serie";

Category.hasMany(Serie);
Serie.belongsTo(Category);
Serie.hasMany(Episode);
Episode.belongsTo(Serie);

export {
    Category,
    Serie,
    Episode
}