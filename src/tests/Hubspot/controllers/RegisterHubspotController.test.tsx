import '@testing-library/jest-dom';
import {RegisterHubspotController} from '../../../backend/Hubspot/controllers/RegisterHubspotController'
import {CreateContactHubspotApi} from '../../../backend/Hubspot/apis/CreateContactHubspotApi'
import {DeleteContactHubspotApi} from  '../../../backend/Hubspot/apis/DeleteContactHubspotApi'
import {DeleteCompanyHubspotApi} from  '../../../backend/Hubspot/apis/DeleteCompanyHubspotApi'
 
jest.setTimeout(100000);
describe('Pruebas de la clase CreateHubspotAccountService', ()  => {
    test('Creacion del controlador de registro en Hubspot fallido, el correo ya existe', async () => {
        const userMother: any = {};
        userMother.contactEmail = 'RegisterHubspotController1@test.com';
        userMother.firstName = 'Kita';
        userMother.last_name = 'Test';
        userMother.copanieName = 'https://webtiginoso.com/';

        const HubspotAccount = await RegisterHubspotController(userMother.contactEmail,userMother.firstName,userMother.last_name,userMother.copanieName)
       
        expect(typeof HubspotAccount).toBe('object');

        await DeleteCompanyHubspotApi(HubspotAccount.companyId);
        await DeleteContactHubspotApi(HubspotAccount.contactId);
    
      })


  test('Creacion del controlador de registro en Hubspot fallido, el correo ya existe', async () => {
    const userMother: any = {};
    userMother.contactEmail = 'RegisterHubspotController2@test.com';
    userMother.firstName = 'Kita';
    userMother.last_name = 'Test';
    userMother.copanieName = 'https://webtiginoso.com/';

    const contactId = await CreateContactHubspotApi(userMother.contactEmail,userMother.firstName,userMother.last_name);

    try {
        const response = await RegisterHubspotController(userMother.contactEmail,userMother.firstName,userMother.last_name,userMother.copanieName)
        expect(response).toBe(true);
        await DeleteContactHubspotApi(contactId);
    } 
    catch (error: any) {
        expect(error.message).toBe("An error has occured: Contact already exist");
        await DeleteContactHubspotApi(contactId);
    }

  })

})

