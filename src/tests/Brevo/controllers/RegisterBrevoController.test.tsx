import '@testing-library/jest-dom';
import {RegisterBrevoController} from '../../../backend/Brevo/controllers/RegisterBrevoController'
import {DeleteContactApi} from  '../../../backend/Brevo/apis/DeleteContactApi'
import {DeleteCompanyApi} from  '../../../backend/Brevo/apis/DeleteCompanyApi'
import {CreateContactApi} from '../../../backend/Brevo/apis/CreateContactApi'
 
jest.setTimeout(100000);
describe('Pruebas de la clase CreateBrevoAccountService', ()  => {
    test('Creacion del controlador de registro en brevo fallido, el correo ya existe', async () => {
        const userMother: any = {};
        userMother.contactEmail = 'RegisterBrevoController1@test.com';
        userMother.firstName = 'Kita';
        userMother.last_name = 'Test';
        userMother.copanieName = 'https://webtiginoso.com/';
    
        await DeleteContactApi(userMother.contactEmail);


        const brevoAccount = await RegisterBrevoController(userMother.contactEmail,userMother.firstName,userMother.last_name,userMother.copanieName)
       
        expect(typeof brevoAccount).toBe('object');

        await DeleteCompanyApi(brevoAccount.companieId);
        await DeleteContactApi(userMother.contactEmail);
    
      })


  test('Creacion del controlador de registro en brevo fallido, el correo ya existe', async () => {
    const userMother: any = {};
    userMother.contactEmail = 'RegisterBrevoController2@test.com';
    userMother.firstName = 'Kita';
    userMother.last_name = 'Test';
    userMother.copanieName = 'https://webtiginoso.com/';


    try {
        const contactId = await CreateContactApi(userMother.contactEmail,userMother.firstName,userMother.last_name);
        const response = await RegisterBrevoController(userMother.contactEmail,userMother.firstName,userMother.last_name,userMother.copanieName)
        expect(true).toBe(false);
    } 
    catch (error: any) {
        expect(error.message).toBe("An error has occured: Contact already exist");
        await DeleteContactApi(userMother.contactEmail);
    }

  })

})

