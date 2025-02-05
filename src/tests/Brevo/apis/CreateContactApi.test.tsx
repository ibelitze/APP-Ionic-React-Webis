import '@testing-library/jest-dom';
import {DeleteContactApi} from  '../../../backend/Brevo/apis/DeleteContactApi'

import {CreateContactApi} from '../../../backend/Brevo/apis/CreateContactApi'

jest.setTimeout(100000);

describe('Pruebas del api de brevo para crear un contacto', ()  => {
  test('Registro del contacto en brevo', async () => {
    const userMother: any = {};
    userMother.contactEmail = 'CreateContactApi1@test.com';
    userMother.firstName = 'Kita';
    userMother.last_name = 'Test';

    const response = await CreateContactApi(userMother.contactEmail,userMother.firstName,userMother.last_name);

    expect(response).toBeGreaterThan(1);
    await DeleteContactApi(userMother.contactEmail);

  })


 

  test('Validar que no se pueda registrar un cliente ya registrado', async () => {
    const userMother: any = {};
    userMother.contactEmail = 'CreateContactApi2@test.com';
    userMother.firstName = 'Kita';
    userMother.last_name = 'Test';
    
    try {
      const user = await CreateContactApi(userMother.contactEmail,userMother.firstName,userMother.last_name);
      const response = await CreateContactApi(userMother.contactEmail,userMother.firstName,userMother.last_name);
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.ok).toBe(0);
      await DeleteContactApi(userMother.contactEmail);
    }
   
})
   


})

