
import {GetMesssagesApi} from "../apis/GetMesssagesApi"
import {get} from "../../Auth/models/SessionVariable"
import {GetToken} from "../../Auth/apis/GetToken"

export async function GetMesssagesController(offset: string) {
  try {
    const tokenData =   await GetToken();
    const token = tokenData['token']
    //const token = await get('tokenSession')

    const messages = await GetMesssagesApi(offset,token);
    if(!messages || messages.length==0)return [];
    for (let i=messages.length - 1; i >= 0; i--) {
            const elemento=messages[i]
            
            const sent = elemento['received']
            const id = elemento['id']
            const is_audio = elemento['is_audio']
            const duration = elemento['duration']
            let message = elemento['content']
            if(is_audio == true){
              message = elemento['audioEncode64']
            }
    }
    return messages;
  } 
  
  catch (error: any) {
     console.log(error)
      const response: any = {};
      response.ok= 0;
      response.message= error.message  
      throw response;
  }
}