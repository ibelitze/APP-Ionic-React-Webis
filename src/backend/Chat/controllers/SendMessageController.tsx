
import {CreateUUidService} from "../services/CreateUUidService"
import {SendMessageApi} from "../apis/SendMessageApi"
import {get} from "../../Auth/models/SessionVariable"
import {GetToken} from "../../Auth/apis/GetToken"

export async function SendMessageController(message: string, is_audio:string, duration:string, contexto:"") {
  try {
    const tokenData =   await GetToken();
    const token = tokenData['token']
    //const token = await get('tokenSession')
    const uuid = await CreateUUidService();
    const messages = await SendMessageApi(message, uuid,is_audio,duration,contexto,token);
    return messages;

  } 
  
  catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= error.message  
      throw response;
  }
}