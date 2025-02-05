import '@testing-library/jest-dom';
import {DeleteContactHubspotApi} from  '../../../backend/Hubspot/apis/DeleteContactHubspotApi'
import {CreateContactHubspotApi} from '../../../backend/Hubspot/apis/CreateContactHubspotApi'

jest.setTimeout(100000);

describe('Pruebas del api de Hubspot para crear un contacto', ()  => {
  test('Registro del contacto en Hubspot', async () => {
    const userMother: any = {};
    userMother.contactEmail = 'CreateContactApi1@test.com';
    userMother.firstName = 'Kita';
    userMother.last_name = 'Test';

    const response = await CreateContactHubspotApi(userMother.contactEmail,userMother.firstName,userMother.last_name);

    expect(Number(response)).toBeGreaterThan(1);
    await DeleteContactHubspotApi(response);

  })


 

  test('Validar que no se pueda registrar un cliente ya registrado', async () => {
    const userMother: any = {};
    userMother.contactEmail = 'CreateContactApi2@test.com';
    userMother.firstName = 'Kita';
    userMother.last_name = 'Test';

    const user = await CreateContactHubspotApi(userMother.contactEmail,userMother.firstName,userMother.last_name);
    
    try {
      const response = await CreateContactHubspotApi(userMother.contactEmail,userMother.firstName,userMother.last_name);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.ok).toBe(0);
      await DeleteContactHubspotApi(user);
    }
   
})
   


})

