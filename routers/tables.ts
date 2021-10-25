import { Router } from "express";
import { createTable, deleteTable, getTable, getTablesAvailable, getTablesByComercial, updateTable } from "../controllers/tables";

const router = Router();

router.get('/', [

], getTablesByComercial);

router.get('/available', [

], getTablesAvailable);

router.get('/:id', [

], getTable);

router.get('', [

], );

router.post('/', [

], createTable);

router.put('/:id', [

], updateTable);

router.delete('/:id', [

], deleteTable);

export default router;