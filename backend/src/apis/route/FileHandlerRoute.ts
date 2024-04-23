import express from "express";
import { APIv1 } from "../APIv1";
import FileHandlerController from "../controller/FileHandlerController";

class FileHandlerRoute extends APIv1{
    private controller: FileHandlerController;
    
    constructor(routeId: string, app: express.Application){
        super(routeId, app, "file-handler");
        this.controller = new FileHandlerController();
    }

    configure(): void{
        this.addFormDataPostRoute('upload-single-pdf', this.controller.uploadSinglePDF, [
            { name: 'pdf', maxCount: 1 },
        ]);
    }
}

export default FileHandlerRoute;