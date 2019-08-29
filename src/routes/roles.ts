import * as express from "express";
const router = express.Router();
import roleController from "../controllers/roleController";

/* GET roles listing. */
router.post("/add-role", roleController.addRole);
router.put("/update-role", roleController.updateRole);
router.delete("/delete-role/:id", roleController.deleteRole);
router.get("/single-role/:id", roleController.getRole);
router.get("/list-role/:pageNo?/:limit?", roleController.getRoleList);

export default router;
