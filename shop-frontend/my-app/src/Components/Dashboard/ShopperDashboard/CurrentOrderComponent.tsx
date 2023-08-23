import { Avatar, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, styled, Typography, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toaster, toast }  from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Row, Col, Container } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ProductModel } from "../../../Models/ProductModel";
import { OrderModel } from "../../../Models/OrderModel";
import { confirmOrder } from "../../../Services/OrderService";
export default function(){
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const orderedProducts = localStorage.getItem("cart");
    const user = localStorage.getItem("email");
    const [address, setAddress] = useState("");
    let sum: number = 0;
    //const allProducts:Map<ProductModel, number> = JSON.parse(orderedProducts!) as Map<ProductModel, number>;
    console.log(localStorage.getItem("cart"));
    const products:ProductModel[] = JSON.parse(orderedProducts!) as ProductModel[];
    const confirmOrderAction = () => {
        const allProducts:ProductModel[] = JSON.parse(orderedProducts!) as ProductModel[];
        let orderModel:OrderModel = new OrderModel("", user!, address, allProducts, new Date(), new Date());

        confirmOrder(orderModel)
        .then( response => {
            toast.success("Order placed successfully!");
            localStorage.setItem("cart", "[]");
        }
        );
        
    }
    
    products.forEach(x => sum += x.price);

    const removeFromCart = (product: ProductModel) =>{
        let index = products.indexOf(product);
        products.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(products));
        toast.success(product.productName + " removed from cart");
        window.location.reload();
    }

    return (
        <div className="container mt-5">
            <Typography variant="h5" color="text.primary" style={{marginLeft:"40px", marginTop:"40px"}}>
                                Total price: {sum}
            <TextField variant="filled" label="Delivery address" style={{marginLeft:"40px", marginBottom: "20px"}}  onChange={(e)=>{setAddress(e.target.value)}}/>

              <Button variant="contained" size="small" color="success" type="submit" style={{marginLeft:"40px"}} onClick={() => confirmOrderAction()}>CONFIRM ORDER</Button>
            </Typography>
          <Accordion
          defaultExpanded={true}>
          <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Products in cart
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See all the products in your cart</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Row>
                {products!.map((products, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardHeader 
                            title={products.productName}/>
                            <CardMedia
                                component="img"
                                height="194"
                                image={products.productImage}
                                alt={products.productName}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Price: {products.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Button  variant="contained" size="small" color="error" type="submit" style={{marginLeft:"40px"}} onClick={() => removeFromCart(products)}>Remove from cart</Button>
                            </CardActions>
                        </Card>
                    </Col>
                ))}
                </Row>
                </AccordionDetails>
        </Accordion>
        <div><Toaster/></div>
            
        </div>

    )
}