export async function  CreateCompanieApi(companieName:string){
    try {
      const token ='';
      const data = new URLSearchParams(); 
      data.append('name',companieName);
      data.append('token',token);

      const options = {
        method: `POST`,
        body: data
      };
      
      const url='https://xxxxxxxxxxxx/api/SendEmailController/CreateCompanieService';
      const response = await fetch(url,options)
      const company  = await response.json()
      return company['id']; 
     } 
    
    catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= 'Create Companie error'  
      throw response;
    }
  
}


