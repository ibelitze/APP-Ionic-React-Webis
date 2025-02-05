import '@testing-library/jest-dom';
import {HubspotAccount} from '../../../backend/Hubspot/models/HubspotAccount'
import {CreateHubspotAccountService} from '../../../backend/Hubspot/services/CreateHubspotAccountService'
describe('Pruebas de la clase CreateHubspotAccountService', ()  => {
  test('Creacion del HubspotAccount exitoso', async () => {
    const HubspotAccountMother: any = {};
    HubspotAccountMother.contactId = '1';
    HubspotAccountMother.companyId = '4as9870aspamsdvaHB';

    const hubspotAccountToTest: HubspotAccount = HubspotAccountMother;

    const hubspotAccount = CreateHubspotAccountService(HubspotAccountMother.contactId,HubspotAccountMother.companyId);

    expect(hubspotAccount).toEqual(hubspotAccountToTest);

  })

  test('Creacion del objeto fallido, falta el contactId', async () => {
    const HubspotAccountMother: any = {};
    HubspotAccountMother.contactId = '';
    HubspotAccountMother.companyId = '4as9870aspamsdvaHB';

    try {
        const hubspotAccount = CreateHubspotAccountService(HubspotAccountMother.contactId,HubspotAccountMother.companyId);
        expect(true).toBe(false);
    } 
    
    catch (error) {
        expect(error).toBe('Error, el contactId es null');
    }
  })

  test('Creacion del objeto fallido, falta el companyId', async () => {
    const HubspotAccountMother: any = {};
    HubspotAccountMother.contactId = '3';
    HubspotAccountMother.companyId = '';

    try {
        const hubspotAccount = CreateHubspotAccountService(HubspotAccountMother.contactId,HubspotAccountMother.companyId);
        expect(true).toBe(false);
    } 
    
    catch (error) {
        expect(error).toBe('Error, el companyId es null');
    }
  })

})

