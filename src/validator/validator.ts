import { body, param, query } from 'express-validator'

class PlantValidator {
  checkCreatedPlant() {
    return [
      body('id')
        .optional()
        .isInt() //Auto increment. Ersatt från isUUID
        .withMessage(
          'The id should be UUID v4 - för att utan autoincrement autogenerera ID',
        ),
      body('name').notEmpty().withMessage('The namn value should not be empty'),
      body('imgurl')
        .notEmpty()
        .withMessage('The imgurl value should not be empty'),
      body('description')
        .notEmpty()
        .withMessage('The beskrivning value should not be empty'),
    ]
  }
  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('The value should be not empty')
        .isInt()
        .withMessage('id ska va ett nr'),
    ]
  }
}
export default new PlantValidator()
