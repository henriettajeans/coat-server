import bodyParser from "body-parser";
import express from "express";
import PlantValidator from "../validator/validator";
import Middleware from "../middleware/middleware";
import PlantController from "../controller/plantController"

export const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))

router.post("/", 
    PlantValidator.checkCreatedPlant(),
    Middleware.handleValidationError, 
    PlantController.add )
    

router.get("/", 
    // PlantValidator.checkIdParam(),
    Middleware.handleValidationError, 
    PlantController.getAllPlants )

    router.get("/:id", 
    PlantValidator.checkIdParam(),
    Middleware.handleValidationError, 
    PlantController.getPlantById )