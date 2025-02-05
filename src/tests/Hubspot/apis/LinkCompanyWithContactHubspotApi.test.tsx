import '@testing-library/jest-dom';
import {DeleteContactHubspotApi} from  '../../../backend/Hubspot/apis/DeleteContactHubspotApi'
import {DeleteCompanyHubspotApi} from  '../../../backend/Hubspot/apis/DeleteCompanyHubspotApi'
import {CreateCompanyHubspotApi} from '../../../backend/Hubspot/apis/CreateCompanyHubspotApi'
import {CreateContactHubspotApi} from '../../../backend/Hubspot/apis/CreateContactHubspotApi'
import {LinkCompanyWithContactHubspotApi} from '../../../backend/Hubspot/apis/LinkCompanyWithContactHubspotApi'

jest.setTimeout(100000);

describe('Pruebas del api de Hubspot para linkear un contacto y una compania', ()  => {
  test('Linkeo exitoso', async () => {

    const contactMother: any = {};
    contactMother.contactEmail = 'LinkCompanyWithContactHubspotApi@test.com';
    contactMother.firstName = 'Kita';
    contactMother.last_name = 'Test';

    const contactId = await CreateContactHubspotApi(contactMother.contactEmail,contactMother.firstName,contactMother.last_name);

    const copanyMother: any = {};
    copanyMother.companyName = 'https://webtiginoso.com/';

    try {
      const companyId = await CreateCompanyHubspotApi(copanyMother.companyName);
      const response = await LinkCompanyWithContactHubspotApi(contactId,companyId);
  
      expect(response['sucess']).toBe(true);
      await DeleteContactHubspotApi(contactId);
      await DeleteCompanyHubspotApi(companyId)

    } catch (error) {
      console.log(error)
      expect(false).toBe(true);
    }

   

  })
})

