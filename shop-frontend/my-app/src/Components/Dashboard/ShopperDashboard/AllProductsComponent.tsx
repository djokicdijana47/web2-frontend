import { useEffect, useState } from "react"
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { Button, CardHeader, Typography } from "@mui/material";
import { Toaster, toast }  from "react-hot-toast";
import { GetProducts } from "../../../Services/ProductService";
import { ProductModel } from "../../../Models/ProductModel";

const AllProductsComponent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async() =>{
                await GetProducts().then(response => {
                setProducts(response.data);

            }).catch(error =>
                {
                if(error.response.status == 401){
                    localStorage.clear();
                    navigate("../login");
                }
            });
        }
        getProducts()
    }, []);
    
    function addToCartAction(productId:string, orderQuantity:number) {
        const allProducts = products as ProductModel[];
        let cartString = localStorage.getItem("cart");
        if(cartString == null){
            cartString = "[]";
        }
        const cart:ProductModel[] = JSON.parse(cartString!);
        for(let i = 0; i < allProducts.length; i++){
            if(allProducts[i].id == productId){
                for(let j = 0; j < orderQuantity; j++){
                    cart.push(allProducts[i]);
                    toast.success(allProducts[i].productName + " added to cart");
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify(cart));
    }



    return(
        <div className="container mt-5">
            <div><Toaster/></div>

        <Container>
        <Row>
            {products.map((products, k) => (
                <Col key={k} xs={12} md={4} lg={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader 
                        title={products['productName']}/>
                         <CardMedia
                            component="img"
                            height="194"
                            image={products['productImage']}
                            alt={products['productName']}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {products['description']}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Products left: {products['quantity']}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: {products['price']}
                            </Typography>
                            <CardActions disableSpacing>
                            <Button style={{width: "120px", marginLeft:"40px"}} variant="outlined" size="small" color="secondary" type="submit" onClick={() => { addToCartAction(products['id'], (document.getElementById("orderQuantity_"+products['id']) as HTMLInputElement).valueAsNumber )} }>Add to cart</Button>
                            <input  style={{width: "50px", marginLeft:"10px"}} min={0} max={products['quantity']} id={"orderQuantity_" + products['id']} type="number" placeholder="0"/>
                            </CardActions>    
                        </CardContent>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
    </div>

    )
}

export default AllProductsComponent;