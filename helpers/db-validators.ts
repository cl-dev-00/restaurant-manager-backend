import { Account, Category, Employee, MenuItem, Order } from "../models";

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

export const hasExistAccount = async (id: number) => {

    const account = await Account.findByPk(id);

    if (!account) {
        throw new Error('La cuenta no existe');
    }

}

export const hasExistOrder = async (id: number) => {

    const order = await Order.findByPk(id);

    if (!order) {
        throw new Error('La orden no existe');
    }

}