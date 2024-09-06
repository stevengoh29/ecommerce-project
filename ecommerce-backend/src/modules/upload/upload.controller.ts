import { Controller, Delete, Get, Param, Post, Put, Query, Res, Body, UseInterceptors, UploadedFile, UploadedFiles } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Response } from 'express';
import converterUtil from "src/utils/converter.util";
import { ResponseUtil } from "src/utils/response.util";

@Controller('upload')
export class UploadController {
    private readonly builder = new ResponseUtil()

    @Post('single')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        const pathName = converterUtil.convertImagePathName(file.path)
        res.json({ filePath: pathName })
    }

    @Post('multiple')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res: Response) {
        const pathNames = files.map((file) => {
            const pathName = converterUtil.convertImagePathName(file.path)
            return pathName
        })

        res.json({ filePath: pathNames })
    }
}