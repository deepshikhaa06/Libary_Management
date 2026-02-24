import UserController from "../controllers/UserController";
import  express  from "express";
import { Schemas, ValidateSchema } from "../middleware/Validation";

const router = express.Router();

router.get("/",UserController.getAllUsers);
router.get("/:userId",ValidateSchema(Schemas.user.userId ,'params'),UserController.getUserById);
router.put("/",ValidateSchema(Schemas.user.update ,'body'),UserController.updateUser);
router.delete("/:userId",ValidateSchema(Schemas.user.userId ,'params'),UserController.deleteUser);

export = router