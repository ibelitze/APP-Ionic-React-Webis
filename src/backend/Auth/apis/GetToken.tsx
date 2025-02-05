

export async function  GetToken(){
    try {
      const options = {
        method: `POST`,
        headers: {
          "user": "user",
          "password": "pass",
          "basic_auth": "",
        }
      };
      
      const url='https://xxxxxxxxxxxxx/gateway/auth/login';
      const response = await fetch(url,options)
      const token  = await response.json()
      return token; 
    
    } 
    catch (error) {
      return false;
    }
}
