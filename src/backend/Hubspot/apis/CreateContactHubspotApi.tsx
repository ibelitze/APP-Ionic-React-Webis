export async function  CreateContactHubspotApi(contactEmail:string,firstName:string,lastName:string){
    try {
      const token ='';
      const data = new URLSearchParams(); 
      data.append('contactEmail',contactEmail);
      data.append('firstName',firstName);
      data.append('lastName',lastName);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };
      
      const url='https://xxxxxxxxxxxxxx/api/SendEmailController/HubspotCreateContact';
      const response = await fetch(url,options)
      const company  = await response.json()

      if (company.sucess==0) {
        const err = await response.json();
        const message = `An error has occured: ${company.message}`;
        throw new Error(message);
        return;
      }

      return company['id']; 
     } 
    
    catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= 'An error has occured: Contact already exist'  
      throw response;
    }
  
}


