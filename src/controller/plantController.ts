import {Request, Response} from "express"
import { createPlant, getAll, getById } from "../database/db"
import { IPlant } from "../models/IPlant"
import Error from "sqlite3"


class PlantController{
    async add(req: Request, res: Response){
        try{
            const record = await createPlant(req.body)
            return res.json({record, message: "Lyckades skapa!", status: 201})

        } catch(e){
            return res.json({ message: "Ojoj detdär gick inte! :(", status: 404})
        }
    }

    async getAllPlants(req: Request, res: Response) {
        try{
            await getAll((err: Error, plants: IPlant[])=>{
                if (!plants) 
                return res.json({ err, message: "Oops gick inte att hämta data om växterna", status: 404 })
            console.log(plants)
            return res.json({ plants, message: "Det gick bra", status: 200 })
            
})
        } catch (e) {
            return res.json({ message: "Gick inte att hämta datan om växterna :(", status: 500})
        }
    }


    async getPlantById(req: Request, res: Response) {
        const id = +req.params.id
        try{
            await getById(id, (err: Error, plant: IPlant)=>{
                if (!plant) {
                    return res.json({ err, message: `Det finns ingen data med id:t - ${id}`, status: 404})
                } else {
                    return res.json({plant, message: `Hämtat växten med id - ${id}`, status: 200})
                }
            })

        } catch {
            return res.json({message: "Något har gått fel va...", status: 500, route: '/plants/:id'})

        }
    }
}

export default new PlantController()