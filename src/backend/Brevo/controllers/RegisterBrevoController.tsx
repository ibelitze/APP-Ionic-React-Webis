import { CreateContactApi } from '../apis/CreateContactApi';
import { CreateCompanieApi } from '../apis/CreateCompanieApi';
import { LinkCompanyWithContactApi } from '../apis/LinkCompanyWithContactApi';
import { CreateBrevoAccountService } from '../services/CreateBrevoAccountService';

export async function RegisterBrevoController(contactEmail: string, firstName: string, lastName: string, companieName: string) {
  try {
    const contactId  = await CreateContactApi(contactEmail, firstName, lastName);
    const companieId = await CreateCompanieApi(companieName);
    const link       = await LinkCompanyWithContactApi(contactId, companieId);

    const brevoAccount = CreateBrevoAccountService(contactId, companieId);
    return brevoAccount;

  } catch (error: any) {
      const response: any = {};
      response.ok= 0;
      response.message= error.message  
      throw response;
  }
}