import express from "express"
import cors from 'cors';
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";
import { router } from "./routes";

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use(adminJs.options.rootPath, adminJsRouter);

app.use(router);

const Port = process.env.PORT || 3000;

app.listen(Port, () =>{
    sequelize.authenticate().then(() => {
        console.log('Db connected')
    })
    console.log(`server started on port ${Port}`);
});