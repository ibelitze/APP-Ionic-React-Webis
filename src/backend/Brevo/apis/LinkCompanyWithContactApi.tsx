import axios from 'axios';
export async function  LinkCompanyWithContactApi(contactId:string, companieId:string){
    try {
      const token ="";
      const data = new URLSearchParams(); 
      data.append('contactId',contactId);
      data.append('companyId',companieId);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };

      const url='https://xxxxxxxxxxxxxxx/api/SendEmailController/LinkCompanyWithContactService';
      const response = await fetch(url,options)
      return await response.json()
    } 
    
    catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= 'Link Company With Contact error'  
      throw response;
    }
  
}


