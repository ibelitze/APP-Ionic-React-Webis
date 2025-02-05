import axios from 'axios';
import {get} from "../../Auth/models/SessionVariable"

export async function  SendMessageApi(message:string, uuid:string,is_audio:string, duration:string,contexto:string,token: string){
    try {

        const email = await get('email')
        console.log('el email es: '+email)

        const id = '30';
        const url = 'https://xxxxxxxxxxxxxxx';
        //const url= 'http://localhost:8080' 
        const response = await axios({
          method: 'POST',
          baseURL: url,
          url: '/gateway/chat/insertdata',
          responseType: 'json',
          headers: {
            'authorization': 'Bearer '+token,
            'user_email': email,
            'uuid': uuid,
            'id': id,
            'is_audio':is_audio,
            'duration': duration,
          },
          data: { 
            content: btoa(message),
            contexto: btoa("hola") 
          }
        });
        
          
        return response.data.content;
     } 
    
    catch (error: any) {
      return 'Ha ocurrido un error';
    }
  
}


