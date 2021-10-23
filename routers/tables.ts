import { Router } from "express";
import { createTable, deleteTable, getTable, getTablesAvailable, getTablesByComercial, updateTable } from "../controllers/tables";

const router = Router();

router.get('/commercial/:idComercial', [

], getTablesByComercial);

router.get('/available/commercial/:idComercial', [

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