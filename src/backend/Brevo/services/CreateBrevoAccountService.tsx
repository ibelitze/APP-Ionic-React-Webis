import {BrevoAccount} from '../models/BrevoAccount'

export function CreateBrevoAccountService(contactId:string, companieId:string){
    if(!isNull(contactId))  throw ('Error, el contactId es null')
    if(!isNull(companieId))  throw ('Error, el companyId es null')

    const brevoAccount: BrevoAccount = {
        contactId: contactId,
        companieId: companieId
    };
    
    return brevoAccount;

  }

  function isNull(campo: string){
    if (campo === null || campo ==='') return false;
    return true;
  }
