import axios from 'axios';
import { ProductModel } from '../Models/ProductModel';

export async function AddProduct(product:ProductModel){
    const userToken = localStorage.getItem("userToken");
    return await axios.post(process.env.REACT_APP_API_URL+'/api/product/new', product, { headers: {"Authorization" : `Bearer ${userToken}`} });
}

export async function GetProducts(){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/product/all', { headers: {"Authorization" : `Bearer ${userToken}`} });
}

export async function GetProductsForSeller(sellerId:string){
    const userToken = localStorage.getItem("userToken");
    return await axios.get(process.env.REACT_APP_API_URL+'/api/product/sellerProducts', {params : {sellerId: sellerId}, headers: {"Authorization" : `Bearer ${userToken}`}});
}