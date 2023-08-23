import axios from 'axios';
import { AccountModel } from '../Models/AccountModel';


export async function uploadImage(image:any, email:string){
    var formData = new FormData();
    const userToken = localStorage.getItem("userToken");
    formData.append("image", image);
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/uploadImage', formData, {params: {"email": email},headers: {"Authorization" : 'Bearer ' + userToken} });

}
export async function GetShoppers(){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getShoppers', { headers: {"Authorization" : 'Bearer ' + userToken} });
}

export async function GetSellers(){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/users/getSellers', { headers: {"Authorization" : 'Bearer ' + userToken} });
}


export async function GetUserData(email:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL + '/api/users/getUserData', {params : {email: email},  headers: {"Authorization" : 'Bearer ' + userToken}});
}

export async function BlockSeller(sellerId:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/blockSeller?sellerId=' + sellerId, {}, { headers: {"Authorization" : 'Bearer ' + userToken} });
}

export async function VerifySeller(sellerId:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/verifySeller?sellerId=' + sellerId, {}, { headers: {"Authorization" : 'Bearer ' + userToken} });
}

export async function UpdateAccount(user: AccountModel){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL + '/api/users/updateAccount', user, { headers: {"Authorization" : 'Bearer ' + userToken} });

}