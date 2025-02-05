import '@testing-library/jest-dom';
import {CreatePasswordService} from '../../../backend/Users/services/CreatePasswordService'

describe('Pruebas de la clase CreatePasswordService', ()  => {
  test('Creacion del password exitoso', async () => {
    const passwordMother='test1234';

    const password = CreatePasswordService(passwordMother);
    expect(password.val).toBe("test1234")

  })

  test('Creacion del password fallido, falta el valor', async () => {
    const passwordMother='';

    try {
        const password = CreatePasswordService(passwordMother);
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('Error, el password es null');
      }

    
  })

  

})

