import '@testing-library/jest-dom';
import {CreateUserService} from '../../../backend/Users/services/CreateUserService'
import {CreateBrevoAccountService} from '../../../backend/Brevo/services/CreateBrevoAccountService'
import {RegisterFireStroreApi} from '../../../backend/Auth/apis/RegisterFireStroreApi'
import {DeleteFirestoreApi} from '../../../backend/Auth/apis/DeleteFirestoreApi'
import {CreatePushNotificationIdService} from '../../../backend/PushNotifications/services/CreatePushNotificationIdService'

jest.setTimeout(100000);

describe('Pruebas del api a firestore', ()  => {
  test('Registro en el firestore', async () => {
    const userMother: any = {};
    userMother.email = 'shinsuke@test.com';
    userMother.birthday = '20/07/1999';
    userMother.country = 'Japan';
    userMother.first_name = 'Kita';
    userMother.last_name = 'Test';
    userMother.page = 'https://webtiginoso2.com';

    const user = CreateUserService(userMother);

    
    const pushNotificationId = await CreatePushNotificationIdService();
    const response = await RegisterFireStroreApi(user,pushNotificationId);

    expect(response).toEqual(true);
    await DeleteFirestoreApi(userMother.email);

  })

})

