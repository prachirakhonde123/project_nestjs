import { Injectable, Req, Res, Body } from "@nestjs/common";
import * as fs from 'fs'
import {exec} from 'child_process'
import { promisify } from "util";


@Injectable()
export class TextToVoiceService{
    async convertTextToVoice(text:string):Promise<any>{
        console.log('text is...',text);
        
        const outputDir = './output'
        if(!fs.existsSync(outputDir)){
            fs.mkdirSync(outputDir)
        }

        const fileName = `voice-${Date.now()}.mp3`;
        const pathName = `${outputDir}/${fileName}`

        // const isMacOS = process.platform === 'darwin';
        const ttsCommand = `espeak "${text}" --stdout | ffmpeg -i - -f mp3 ${pathName}`;

        const execPromise = promisify(exec);

        try{
            await execPromise(ttsCommand);
            return pathName;
        }
        catch(err){
            console.error('Error executing text-to-speech:', err);
            throw new Error('Text-to-speech conversion failed');
        }
    }
}

