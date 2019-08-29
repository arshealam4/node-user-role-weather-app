import * as express from "express";
const router = express.Router();
import userController from "../controllers/userController";

/* GET users listing. */
router.post("/add-user", userController.addUser);
router.put("/update-user", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.get("/single-user/:id", userController.getUser);
router.get("/list-user/:pageNo?/:limit?", userController.getUserList);

export default router;
