export class ProductModel{
    id:string;
    productName: string;
    seller:string;
    description:string;
    price:number;
    quantity:number;
    productImage:string;
    constructor(productName:string, id:string, sellerId:string, description:string, price:number, quantity:number, imageUrl:string){
        this.productName = productName;
        this.id = id;
        this.seller = sellerId;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.productImage = imageUrl;
    }
}