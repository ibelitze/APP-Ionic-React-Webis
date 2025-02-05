import '@testing-library/jest-dom';
import {CreateUserService} from '../../../backend/Users/services/CreateUserService'
import {User} from '../../../backend/Users/models/User'
import {standarMother,
        userNoMail,
        userNoBirthday,
        userNoCountry,
        userNoFirstName,
        userNoPage,
        badEmail} from '../mother/UserMother'

describe('Pruebas de la clase CreateUserService', ()  => {
  test('Creacion del objeto exitoso', async () => {
    const userMother = standarMother();
    const userToTest: User = standarMother();

    const user = CreateUserService(userMother);

    expect(user).toEqual(userToTest);

  })

  test('Creacion del objeto fallido, falta el email', async () => {
    const userMother = userNoMail();
    try {
        const user = CreateUserService(userMother)
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('Error, el email es null');
      }
  })

  test('Creacion del objeto fallido, falta el birthday', async () => {
    const userMother = userNoBirthday();
    try {
        const user = CreateUserService(userMother)
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('Error, el birthday es null');
      }
  })

  test('Creacion del objeto fallido, falta el Country', async () => {
    const userMother = userNoCountry();
    try {
        const user = CreateUserService(userMother)
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('Error, el country es null');
      }
  })

  test('Creacion del objeto fallido, falta el First Name', async () => {
    const userMother = userNoFirstName();
    try {
        const user = CreateUserService(userMother)
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('Error, el first name es null');
      }
  })

  test('Creacion del objeto fallido, falta el Page', async () => {
    const userMother = userNoPage();
    try {
        const user = CreateUserService(userMother)
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('Error, el page es null');
      }
  })

  test('Creacion del objeto fallido, email incorrecto', async () => {
    const userMother = badEmail();
    try {
        const user = CreateUserService(userMother)
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('Error, email incorrecto');
      }
  })
  
  

})

