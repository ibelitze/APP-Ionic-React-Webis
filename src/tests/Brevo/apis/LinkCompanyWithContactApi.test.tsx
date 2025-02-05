import '@testing-library/jest-dom';
import {DeleteContactApi}  from  '../../../backend/Brevo/apis/DeleteContactApi'
import {DeleteCompanyApi}  from '../../../backend/Brevo/apis/DeleteCompanyApi'
import {CreateCompanieApi} from '../../../backend/Brevo/apis/CreateCompanieApi'
import {CreateContactApi}  from '../../../backend/Brevo/apis/CreateContactApi'
import {LinkCompanyWithContactApi} from '../../../backend/Brevo/apis/LinkCompanyWithContactApi'

jest.setTimeout(100000);

describe('Pruebas del api de brevo para linkear un contacto y una compania', ()  => {
  test('Linkeo exitoso', async () => {

    const contactMother: any = {};
    contactMother.contactEmail = 'LinkCompanyWithContactApi@test.com';
    contactMother.firstName = 'Kita';
    contactMother.last_name = 'Test';

    const contactId = await CreateContactApi(contactMother.contactEmail,contactMother.firstName,contactMother.last_name);

    const copanyMother: any = {};
    copanyMother.companieName = 'https://webtiginoso.com/';

    try {
      const companieId = await CreateCompanieApi(copanyMother.companieName);
      const response = await LinkCompanyWithContactApi(contactId,companieId);
  
      expect(response['sucess']).toBe(true);
      await DeleteContactApi(contactMother.contactEmail);
      await DeleteCompanyApi(companieId)

    } catch (error) {
      console.log(error)
      expect(false).toBe(true);
    }

   

  })
})

