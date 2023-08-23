import { ProductModel } from "./ProductModel";

export class OrderModel{
    id:string;
    customerEmail:string;
    customerAddress:string;
    orderedProducts:ProductModel[];
    orderStatus: number = 0;
    orderPlacedTime: Date;
    orderCompletedTime: Date;
    constructor(id:string, customerEmail:string, customerAddress:string, orderedProducts:ProductModel[], orderPlacedTime:Date, orderCompletedTime:Date){
        this.id = id;
        this.customerEmail = customerEmail;
        this.customerAddress = customerAddress;
        this.orderedProducts = orderedProducts;
        this.orderPlacedTime = orderPlacedTime;
        this.orderCompletedTime = orderCompletedTime;

    }

}