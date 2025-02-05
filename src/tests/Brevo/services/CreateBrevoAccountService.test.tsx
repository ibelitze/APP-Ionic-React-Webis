import '@testing-library/jest-dom';
import {BrevoAccount} from '../../../backend/Brevo/models/BrevoAccount'
import {CreateBrevoAccountService} from '../../../backend/Brevo/services/CreateBrevoAccountService'
describe('Pruebas de la clase CreateBrevoAccountService', ()  => {
  test('Creacion del BrevoAccount exitoso', async () => {
    const brevoAccountMother: any = {};
    brevoAccountMother.contactId = '1';
    brevoAccountMother.companieId = '4as9870aspamsdvaHB';

    const brevoAccountToTest: BrevoAccount = brevoAccountMother;

    const brevoAccount = CreateBrevoAccountService(brevoAccountMother.contactId,brevoAccountMother.companieId);

    expect(brevoAccount).toEqual(brevoAccountToTest);

  })

  test('Creacion del objeto fallido, falta el contactId', async () => {
    const brevoAccountMother: any = {};
    brevoAccountMother.contactId = '';
    brevoAccountMother.companieId = '4as9870aspamsdvaHB';

    try {
        const brevoAccount = CreateBrevoAccountService(brevoAccountMother.contactId,brevoAccountMother.companieId);
        expect(true).toBe(false);
    } 
    
    catch (error) {
        expect(error).toBe('Error, el contactId es null');
    }
  })

  test('Creacion del objeto fallido, falta el companyId', async () => {
    const brevoAccountMother: any = {};
    brevoAccountMother.contactId = '3';
    brevoAccountMother.companieId = '';

    try {
        const brevoAccount = CreateBrevoAccountService(brevoAccountMother.contactId,brevoAccountMother.companieId);
        expect(true).toBe(false);
    } 
    
    catch (error) {
        expect(error).toBe('Error, el companyId es null');
    }
  })

})

