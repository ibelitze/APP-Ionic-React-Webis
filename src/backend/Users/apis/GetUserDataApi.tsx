import {firebaseConfig} from '../../../FirebaseConfig';


export async function  GetUserDataApi(email:string){
    try {

        const cityRef = await firebaseConfig.firestore().collection('users').doc(email);
        const doc = await cityRef.get();
        if (!doc.exists) throw new Error ('No such document!')
        return doc.data();
    } 
    catch (error) {
        return error.message;
    }
}
