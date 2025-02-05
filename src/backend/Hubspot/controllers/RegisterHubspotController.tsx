import { CreateContactHubspotApi } from '../apis/CreateContactHubspotApi';
import {CreateCompanyHubspotApi} from '../apis/CreateCompanyHubspotApi'
import {LinkCompanyWithContactHubspotApi} from '../apis/LinkCompanyWithContactHubspotApi'
import {CreateHubspotAccountService} from '../services/CreateHubspotAccountService'

export async function RegisterHubspotController(contactEmail: string, firstName: string, lastName: string, companyName: string) {
  try {
    const contactId  = await CreateContactHubspotApi(contactEmail,firstName,lastName);
    const companyId  = await CreateCompanyHubspotApi(companyName);
    const link       = await LinkCompanyWithContactHubspotApi(contactId, companyId);

    const hubspotAccount = CreateHubspotAccountService(contactId, companyId);
    return hubspotAccount;

  } catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= error.message  
      throw response;
  }
}