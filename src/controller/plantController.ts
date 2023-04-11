import { Request, Response } from 'express'
import { createPlant, deleteById, getAll, getById } from '../database/db'
import { IPlant } from '../models/IPlant'
import Error from 'sqlite3'

class PlantController {
  async add(req: Request, res: Response) {
    try {
      const record = await createPlant(req.body)
      return res.json({ record, message: 'Lyckades skapa!', status: 201 })
    } catch (e) {
      return res.json({ message: 'Ojoj detdär gick inte! :(', status: 404 })
    }
  }

  async getAllPlants(req: Request, res: Response) {
    try {
      await getAll((err: Error, plants: IPlant[]) => {
        if (!plants)
          return res.json({
            err,
            message: 'Oops gick inte att hämta data om växterna',
            status: 404,
          })

        return res.send(plants)
      })
    } catch (e) {
      return res.json({
        message: 'Gick inte att hämta datan om växterna :(',
        status: 500,
      })
    }
  }

  async getPlantById(req: Request, res: Response) {
    const id = +req.params.id
    try {
      await getById(id, (err: Error, plant: IPlant) => {
        if (!plant) {
          return res.json({
            err,
            message: `Det finns ingen data med id:t - ${id}`,
            status: 404,
          })
        } else {
          return res.send(plant)
        }
      })
    } catch {
      return res.json({
        message: 'Något har gått fel va...',
        status: 500,
        route: '/plants/:id',
      })
    }
  }

  async deletePlanById(req: Request, res: Response) {
    const id = +req.params.id
    try {
      await deleteById(id, (err: Error, row: any) => {
        if (!err) {
          return res.json({ row, mgs: 'tos bort hehe', status: 200 })
        } else {
          return res.json({ err, mgs: 'obbs', status: 404 })
        }
      })
    } catch (e) {
      return res.json({ mgs: 'nåt gick fel', status: 500 })
    }
  }
}

export default new PlantController()
