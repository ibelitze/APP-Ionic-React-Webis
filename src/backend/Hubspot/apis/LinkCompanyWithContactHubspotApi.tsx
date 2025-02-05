export async function  LinkCompanyWithContactHubspotApi(contactId:string, companyId:string){
    try {
      const token ="";
      const data = new URLSearchParams(); 
      data.append('contactId',contactId);
      data.append('companyId',companyId);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };

      const url='https://xxxxxxxxxxxxxxxx/api/SendEmailController/HubspotLinkCompanyWithContact';
      const response = await fetch(url,options)
      return await response.json()
    } 
    
    catch (error: any) {
      console.log(error)
      const response: any = {};
      response.ok= 0;
      response.message= 'Link Company With Contact error'  
      throw response;
    }
  
}


