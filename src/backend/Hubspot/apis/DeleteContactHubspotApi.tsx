export async function  DeleteContactHubspotApi(id:string){
    try {
      const token ="";
      const data = new URLSearchParams(); 
      data.append('id',id);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };
      
      const url='https://xxxxxxxxxxxxxxx/api/SendEmailController/HubspotDeleteAContact';
      const response = await fetch(url,options)  
      return response; 
     } 
    
    catch (error: any) {
      console.log(error)
        return error;
    }
  
}


