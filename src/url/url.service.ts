import { Injectable , Param, NotFoundException,InternalServerErrorException} from "@nestjs/common";
import { Url, UrlModel } from "./url.schema";
import { Model } from "mongoose";
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from "@nestjs/mongoose";
import * as shortid from 'shortid'

@Injectable()
export class UrlService {
    constructor(
        @InjectModel('Url') private readonly urlModel : Model<Url>
    ) {}

   
    async generateShortUrl(urlData : Record<string,any>): Promise<any>{
        try{
            let longurl = urlData.url;
            let BASEURL = 'localhost:4000'
            
            // check duplicate longurl
            let checkDuplicate = await this.urlModel.findOne({longUrl : longurl}) 
            if(checkDuplicate){
                return {
                    status : false,
                    message : 'LongUrl is already stored in Db'
                }
            }

            let shortId = shortid.generate();
            let checkId = await this.urlModel.findOne({shortId : shortId});
            if(checkId){
                return {
                    status : false,
                    message : 'Duplicate Url'
                }
            }

            let shortUrl = BASEURL + '/' + shortId
            let url_data = {
                _id : uuidv4(),
                url : longurl,
                shortId : shortId
            }

            console.log('data is....',url_data)
            let createData = await this.urlModel.create(url_data);

            return {
                status : true,
                data : createData,
                shortUrl : shortUrl
            }
        }
        catch(err){
            return {
                status : false,
                message : err.message
            }
        }
    }

    async getUrl(shortid : string): Promise<any>{
        const urlRecord = await this.urlModel.findOne({ shortId: shortid }).lean();

        if (!urlRecord) {
            throw new NotFoundException('No URL found for the provided shortid');
        }

        return {
            status : true,
            data : urlRecord.url
        }

    }

    async getAllUrl():Promise<any>{
        try{
            let getData = await this.urlModel.find().lean()
            // console.log('getdata is...',getData)
            if(getData.length > 0){
                return {
                    status : true,
                    data : getData
                }
            }
            else{
                return {
                    status : false,
                    data : []
                }
            }
        }
        catch(err){
            return {
                status : false,
                message : err.message
            }

        }
    }

    async updateUrl(newData : Record<string,any>, id : string): Promise<any>{
         try{
            let {url,shortId} = newData;
            let updatedata = {
                url : url,
                shortId : shortId
            };

            let updateData = await this.urlModel.findOneAndUpdate({_id : id},{$set : updatedata});
            
            return {
                status : true,
                message : 'Data Updated'
            }
         }
         catch(err){
             throw new InternalServerErrorException('Internal Server Error');
         }
    }
}