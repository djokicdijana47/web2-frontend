import axios from 'axios';
import { LoginModel } from '../Models/LoginModel';
import { AccountModel } from '../Models/AccountModel';
import { UserModel } from '../Models/UserModel'


export async function register(accountModel:UserModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/auth/register', accountModel);
}

export async function login(loginModel:LoginModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/auth/login', loginModel);

}

export async function socialLogin(accountModel:AccountModel){
    return await axios.post(process.env.REACT_APP_API_URL+'/api/auth/socialLogin', accountModel);
}
