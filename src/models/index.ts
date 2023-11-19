import { Category } from "./Category";
import { Episode } from "./Episode";
import { Serie } from "./Serie";
import { User } from "./User";

Category.hasMany(Serie, {as: 'series'});
Serie.belongsTo(Category);
Serie.hasMany(Episode, { as: 'episodes'});
Episode.belongsTo(Serie);

export {
    Category,
    Serie,
    Episode,
    User
}