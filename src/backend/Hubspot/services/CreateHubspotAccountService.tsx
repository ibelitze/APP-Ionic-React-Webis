import {HubspotAccount} from '../models/HubspotAccount'

export function CreateHubspotAccountService(contactId:string, companyId:string){
    if(!isNull(contactId))  throw ('Error, el contactId es null')
    if(!isNull(companyId))  throw ('Error, el companyId es null')

    const hubspotAccount: HubspotAccount = {
        contactId: contactId,
        companyId: companyId
    };
    
    return hubspotAccount;

  }

  function isNull(campo: string){
    if (campo === null || campo ==='') return false;
    return true;
  }
