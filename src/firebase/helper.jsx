import authStorage from '../utils/authStorage'

//Aqui puede ir el código de login e reingreso, ese tipo de lógica 
export const helper = {
    reauth: ()=>{
        authStorage.getAccessToken().then((res)=> setUserAccount(res))
    }
}