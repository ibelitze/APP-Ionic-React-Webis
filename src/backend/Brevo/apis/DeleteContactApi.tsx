export async function  DeleteContactApi(email:string){
    try {
      const token ="";
      const data = new URLSearchParams(); 
      data.append('email',email);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };
      
      const url='https://xxxxxxxxxxxxxxxxxx/api/SendEmailController/DeleteAContact';
      const response = await fetch(url,options)  
      return response; 
     } 
    
    catch (error: any) {
      console.log(error)
        return error;
    }
  
}


