import { Controller, Post, Body, Res } from "@nestjs/common";
import { TextToVoiceService } from "./texttovoice.service";
import { Response } from "express";
import * as fs from 'fs';

@Controller('text-to-voice')
export class TextToVoiceController{
    constructor(private readonly textToVoiceService : TextToVoiceService){}

    @Post()
    async convert(@Body('text') text : string, @Res() res:Response){
        try{
            console.log('text is..',text)
            const result = await this.textToVoiceService.convertTextToVoice(text);

            res.sendFile(result, { root: '.' }, (err) => {
                if (err) {
                  console.error(err);
                  res.status(500).send('Error generating voice file');
                } else {
                  // Optionally, delete the file after sending
                  fs.unlink(result, (unlinkErr) => {
                    if (unlinkErr) console.error(`Failed to delete file: ${result}`);
                  });
                }
              });

        }
        catch(error){
            res.status(500).send('An error occurred while processing the request');
        }
    }
}