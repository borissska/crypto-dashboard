import { Router } from "express";
import { addPortfolioElement, getData, getPortfolioData, getShortData } from "../controllers/dataController";

const router = Router();

router.post("/getData", getData)
router.post("/getShortData", getShortData)
router.post("/getPortfolioData", getPortfolioData)
router.post("/addPortfolioElement", addPortfolioElement)

export default router;
