import {User} from '../models/User'

export function  CreateUserService(data: {[key: string]: any}){

    if(!isNull(data['email']))        throw ('Error, el email es null')
    if(!isNull(data['birthday']))     throw ('Error, el birthday es null')
    if(!isNull(data['country']))      throw ('Error, el country es null')
    if(!isNull(data['first_name']))   throw ('Error, el first name es null')
    if(!isNull(data['page']))         throw ('Error, el page es null')
    if(!validateEmail(data['email'])) throw ('Error, email incorrecto')

    const user: User = {
      email: data['email'],
      birthday: data['birthday'],
      country: data['country'],
      first_name: data['first_name'],
      last_name: data['last_name'],
      page: data['page']
    };
    
    return user;

}

  function isNull(campo: string){
    if (campo === null || campo ==='') return false;
    return true;
  }



  function validateEmail(email: string) {
      const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
      return re.test(String(email).toLowerCase());
  }

