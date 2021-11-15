import { Request, Response } from 'express';
import { v2 } from 'cloudinary';
import Employee from '../models/employee';
import { UploadedFile } from 'express-fileupload';

const uploadImage = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    const employee = await Employee.findByPk(id);

    if (employee?.url) {

        const nameArr = employee.url.split('/');
        const img = nameArr[nameArr.length-1];
        const [id_publico] = img.split('.');
        
        v2.uploader.destroy(id_publico);
        
    }
    
    const {tempFilePath} = req.files!.file as  UploadedFile;
    
    const { secure_url } = await v2.uploader.upload(tempFilePath);
    

    await employee?.update({
        url: secure_url
    })

    return res.json({
        ok: true,
        employee
    });
}

export {
    uploadImage
}