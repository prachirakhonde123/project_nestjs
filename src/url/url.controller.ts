import { Controller, Post, Get, Body, HttpCode,Res,Header, Param,BadRequestException,NotFoundException,InternalServerErrorException } from "@nestjs/common";
import { UrlService } from "./url.service";
import { Response } from "express";


@Controller('url')
export class UrlController {
    constructor (private readonly urlService : UrlService) {}

    @Post('create-shorturl')
    // @Header('Cache-Control', 'no-store') // way to add header
    @HttpCode(201)
    async generateShortUrl(@Body() urlData : Record<string,any>):Promise<any>{
        try{
            let getData = await this.urlService.generateShortUrl(urlData);
            return {
                status : true,
                data : getData
            }
        }
        catch(err){
            return {
                status : false,
                message : err.message
            }
        }
    }

    // Setting Header for Response -- another way using res for setting header
    @Get(':shortid')
    async getUrl(@Param('shortid') shortid: string, @Res() res:Response): Promise<void>{
        // console.log('params is.......',shortid);
        if (!shortid) {
            throw new BadRequestException('Invalid Request: Missing shortid');
        }

        const urlData = await this.urlService.getUrl(shortid);

        if (!urlData) {
            throw new NotFoundException('URL not found');
        }

        /*
        Here we add header in response of api 
        This header is commonly used when the response contains sensitive or
        dynamic data that should not be stored in caches
        */
        res.setHeader('Cache-Control','no-store')
        res.status(200).json({
            status: true,
            data: urlData.data,
        });

        // return {
        //     status: true,
        //     data: urlData.data,
        // };
    }

    @Get('get/fetchUrls')
    async getAllData(){
        try{
            let getData = await this.urlService.getAllUrl();
            // console.log('data is...........',getData);
            return {
                status : true,
                data : getData
            }
        }
        catch(err){
            return {
                status : false,
                message : err.message
            }
        }
    }

    @Post('update/:id')
    async updateUrl(@Body() newData: Record<string,any>,@Param('id') id : string){
        try{
            if(!id){
                return {
                    status : false,
                    message : 'Invalid Request'
                }
            }
            
            let updateData = await this.urlService.updateUrl(newData,id)
            return {
                status : true,
                message : 'Data updated'
            }
        }
        catch(err){
           throw new InternalServerErrorException('Internal Server Error')
        }
    }
}