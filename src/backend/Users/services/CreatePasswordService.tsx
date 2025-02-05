import {Password} from '../models/Password'

export function  CreatePasswordService(val:string){

    if(!isNull(val))  throw ('Error, el password es null')
    const password: Password = {
      val: val
    };
    
    return password;
    
  
}

function isNull(campo: string){
  if (campo === null || campo ==='') return false;
  return true;
}
