export async function  CreateCompanyHubspotApi(companyName:string){
    try {
      const token ='';
      const data = new URLSearchParams(); 
      data.append('name',companyName);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };
      
      const url='https://xxxxxxxxxx/api/SendEmailController/HubspotCreateCompany';
      const response = await fetch(url,options)
      const company  = await response.json()
      return company['id']; 
     } 
    
    catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= 'Create Company error'  
      throw response;
    }
  
}


