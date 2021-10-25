import { Router } from "express";
import { getRoles } from "../controllers/roles";

const router = Router();

router.get('/', getRoles);

export default router;