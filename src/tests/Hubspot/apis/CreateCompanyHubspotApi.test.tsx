import '@testing-library/jest-dom';
import {DeleteCompanyHubspotApi} from  '../../../backend/Hubspot/apis/DeleteCompanyHubspotApi'
import {CreateCompanyHubspotApi} from '../../../backend/Hubspot/apis/CreateCompanyHubspotApi'

jest.setTimeout(100000);

describe('Pruebas del api de Hubspot para crear una compania', ()  => {
  test('Registro de la compania en Hubspot', async () => {
    const copanyMother: any = {};
    copanyMother.companieName = 'https://webtiginoso.com/';

    const response = await CreateCompanyHubspotApi(copanyMother.companieName);
    expect(typeof response).toBe("string")
    
    await DeleteCompanyHubspotApi(response);
  })

})

