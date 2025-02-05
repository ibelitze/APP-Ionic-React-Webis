export async function  DeleteCompanyHubspotApi(companyId:string){
    try {
      const token ="";
      const data = new URLSearchParams(); 
      data.append('id',companyId);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };
      
      const url='https://xxxxxxxxxxxxxxxx/api/SendEmailController/HubspotDeleteACompany';
      const response = await fetch(url,options)  
      return response; 
     } 
    
    catch (error: any) {
      console.log(error)
        return error;
    }
  
}


