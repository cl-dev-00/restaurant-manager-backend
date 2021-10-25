import { Request, Response } from "express"
import { Category } from "../models"


const getCategories = async (req: Request, res: Response): Promise<Response> => {

    try {
        const categories = await Category.findAll({
            where: {
                deletedAt: null
            }
        });

        return res.json({
            ok: true,
            collection: {
                hasItems: categories.length > 0 ? true : false,
                items: categories,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
}
const getCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {

        const category = await Category.findByPk(id);

        return res.json({
            ok: true,
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }

}
const createCategory = async (req: Request, res: Response): Promise<Response> => {

    const payload = req.body;

    try {

        const category = await Category.create(payload);

        return res.json({
            ok: true,
            category
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
}
const updateCategory = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {


        const payload = req.body;

        const category = await Category.findByPk(id);

        await category?.update(payload);

        return res.json({
            ok: true,
            category
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
}
const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);

        await category?.destroy({
            force: false
        });

        return res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false
        });
    }
}

export {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
}