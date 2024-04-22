import { APIv1Response } from "../APIv1";
import { Request } from "express";
// import * as fs from 'fs';

class FileHandlerController {
    constructor () {

    }

    uploadSinglePDF = async (req: Request): Promise<APIv1Response> => {
        // console.log(req.headers);
        // console.log(req.files);
        // validate
        if(!req.files) throw new Error("a pdf is required.");
        const files: any = req.files as any;
        if(!files['pdf' as keyof typeof files]) throw new Error("required file not found.");        

        // move to proper directory
        const pdfFile = files['pdf'][0];
        console.log(pdfFile);

        // const date = new Date();
        // const year = date.getFullYear();
        // const month = date.getMonth()+1;
        // const day =date.getDate();

        // const destDir = `./public/pdfs/${year}/${month}/${day}`;
        // fs.mkdirSync(destDir, {recursive: true});

        // const destPath = `${destDir}/${pdfFile.filename}`;
        // fs.renameSync(`./${pdfFile.path}`, destPath);

        // return the path
        return {status: true, code: 200, message: "OK", data: {"temp_path": pdfFile.path}};
    }
}

export default FileHandlerController;