import { Order, Commercial, Category, Employee, MenuItem, OrderDetail, Table } from "../models";
import CashRegister from '../models/CashRegister';
import { Op } from 'sequelize';

export const hasExistCategory = async (id: number) => {

    const category = await Category.findByPk(id);

    if (!category) {
        throw new Error('La categoria buscada no existe');
    }

}

export const hasExistMenuItem = async (id: number) => {

    const menuItem = await MenuItem.findByPk(id);

    if (!menuItem) {
        throw new Error('El item del menu buscado no existe');
    }

}

export const hasExistEmployee = async (id: number) => {

    const employee = await Employee.findByPk(id);

    if (!employee) {
        throw new Error('El empleado no existe');
    }

}

export const hasExistOrder = async (id: number) => {

    const account = await Order.findByPk(id);

    if (!account) {
        throw new Error('La ordern no existe');
    }

}

export const hasExistOrderDetail = async (id: number) => {

    const orderDetail = await OrderDetail.findByPk(id);

    if (!orderDetail) {
        throw new Error('El detalle de la orden no existe');
    }
}

export const hasExistComercial = async (idComercial: number) => {

    const commercial = await Commercial.findByPk(idComercial);

    if (!commercial) {
        throw new Error('La sucursal no existe');
    }

}

export const hasExistTable = async (idTable: number) => {

    const table = await Table.findByPk(idTable);

    if (!table) {
        throw new Error('No existe la mesa');
    }

}

export const hasExistCashRegister = async (id: number) => {

    const cashRegister = await CashRegister.findByPk(id);

    if (!cashRegister) {
        throw new Error('No existe el registro de caja');
    }

}

export const hasExistCashRegisterByDate = async (date: string) => {

    const cashRegister = await CashRegister.findOne({
        where: {
            fecha: date
        }
    });

    if (cashRegister) {
        throw new Error('Esta caja de arqueo ya se cerro');
    }

}