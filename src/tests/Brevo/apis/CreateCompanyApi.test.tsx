import '@testing-library/jest-dom';
import {DeleteCompanyApi} from  '../../../backend/Brevo/apis/DeleteCompanyApi'
import {CreateCompanieApi} from '../../../backend/Brevo/apis/CreateCompanieApi'

jest.setTimeout(100000);

describe('Pruebas del api de brevo para crear una compania', ()  => {
  test('Registro de la compania en brevo', async () => {
    const copanyMother: any = {};
    copanyMother.companieName = 'https://webtiginoso.com/';

    const response = await CreateCompanieApi(copanyMother.companieName);
    expect(typeof response).toBe("string")
    
    await DeleteCompanyApi(response);
  })

})

