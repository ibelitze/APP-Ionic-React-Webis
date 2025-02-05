import {get} from "../../Auth/models/SessionVariable"

export async function  GetMesssagesApi(offset:string, token:string){
    try {
        const email = await get('email')
 
        const options = {
          method: `POST`,
          headers: {
            'authorization': 'Bearer '+token,
            'email': email,
            'base': '1',
            'offset' : offset
          }
        };
        
        const url='https://xxxxxxxxxxxxx/gateway/chat/getdata';
        //const url= 'http://localhost:8080/gateway/chat/getdata'
        const response = await fetch(url,options)  
        const messages =  await response.json();

        return  messages[0];
    } 
    catch (error: any) {
        return error;
    }
}


