import express from "express"
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";


const app = express();
app.use(express.static('public'));
app.use(adminJs.options.rootPath, adminJsRouter);

const Port = process.env.PORT || 3000;

app.listen(Port, () =>{
    sequelize.authenticate().then(() => {
        console.log('Db connected')
    })
    console.log(`server started on port ${Port}`);
});