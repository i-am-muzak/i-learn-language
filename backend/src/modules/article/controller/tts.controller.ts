import { Body, Controller, HttpStatus, HttpException, Post, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { TtsDto } from '../dto/tts.dto';
import { GCSManager } from 'src/lib/google_cloud_storage/GcsUpload';
import { textToSSML } from 'src/helper/functions';

@Controller('tts')
export class TTSController {
  @Post("prepare-ssml")
  @UsePipes(new ValidationPipe())
  async prepareSSML(@Body() ttsDto: TtsDto) {
    const gcsManager = new GCSManager("i-learn", "test/moruk", "testtttttertert");
    const ssmlText = textToSSML(ttsDto.text);
    
    const uploadResult = await gcsManager.upload(true)
    if(!uploadResult) {
      throw new HttpException("An error occured while uploading the file into Storage system.", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    // const signedUrl = await gcsManager.generateV4ReadSignedUrl()
    // if(!signedUrl) {
    //   throw new HttpException("An error occured while generating a signed url for the uploaded object.", HttpStatus.INTERNAL_SERVER_ERROR)
    // }

    Logger.log(`SSML Length: ${ssmlText.length}`);

    return {
      "ssml": ssmlText,
      "signedUrl": uploadResult
    }
  }
}
