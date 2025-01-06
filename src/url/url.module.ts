import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UrlController } from "./url.controller";
import { UrlService } from "./url.service";
import { UrlModel } from "./url.schema";

@Module({
    imports : [
        MongooseModule.forFeature([{name : 'Url', schema : UrlModel.schema}])
    ],
    controllers : [UrlController],
    providers : [UrlService]
})
export class UrlModule{}