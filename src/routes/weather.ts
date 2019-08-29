import * as express from "express";
const router = express.Router();
import weathetController from "../controllers/weatherController";

/* GET weather listing. */
router.get("/weather/:city", weathetController.getWeatherList);

export default router;
