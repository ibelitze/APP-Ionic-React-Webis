export async function  GenerateTokenApi(email:string){

    try {

        const user = email;
        const password = ""
        const basic_auth = ""

        const response = await fetch("https://xxxxxxxxxxxxxx/gateway/auth/login", {
        method: "POST",
        headers: {
            "user": user,
            "password": password,
            "basic_auth": basic_auth,
        },
        });

        if (response.status === 200) {
            const data = await response.json();
            return data['token'];
        } 
        return false;
     } 
    
    catch (error: any) {
      console.log(error)
        return error;
    }
  
}


