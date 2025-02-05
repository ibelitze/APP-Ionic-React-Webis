

export async function  CreateContactApi(contactEmail:string,firstName:string,lastName:string){
    try {
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              'api-key': ''
            },
            body: JSON.stringify({
              email: contactEmail,
              emailBlacklisted: false,
              smsBlacklisted: false,
              listIds: [37],
              updateEnabled: false,
              smtpBlacklistSender: [contactEmail]
            })
        };
          
        const response = await fetch('https://api.brevo.com/v3/contacts', options);
        if (!response.ok) {
          const err = await response.json();
          const message = `An error has occured: ${err.message}`;
          throw new Error(message);
        }
        const contact = await response.json();
        return contact['id'];


    } 
    
    catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= error.message  
      throw response;
    }
  
}


