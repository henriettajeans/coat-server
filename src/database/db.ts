import sqlite3 from "sqlite3";
import { IPlant } from "../models/IPlant";

export const db = new sqlite3.Database("PlantDB")

db.run(`CREATE TABLE IF NOT EXISTS plants(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    imgurl VARCHAR(255)
)`)



export const createPlant = async(plant: IPlant) => {
    const sql = `INSERT INTO plants (name, description, imgurl) VALUES (?,?,?)`
    const values = [plant.name, plant.imgurl, plant.description]
    db.run(sql, values)
}

export const getAll = async (callback: Function)=> {
    const sql = `SELECT * FROM plants`
    db.all(sql, callback)
}
export const getById = async(id: number, callback: Function) => {
    const sql = `SELECT * FROM plants WHERE id = ?`
    db.get(sql, [id], callback)
}