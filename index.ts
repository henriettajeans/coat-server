import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import { router as plantRouter} from "./src/routes/router"
import cors from "cors"

const app = express();
const PORT = 4500;

app.use(cors()) //Kopplar samman med frontend, måste ligga överst av app.use
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use("/plants", plantRouter)

app.get('/', (req: Request, res: Response) => {
    res.send("Hemma!")
})


app.listen(PORT, ()=> console.log(`Din server springer på port: http://localhost:${PORT}`))