import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import { CardHeader, Typography } from "@mui/material";
import { Toaster} from 'react-hot-toast';
import { GetProductsForSeller } from "../../../Services/ProductService";

const SellerProducts = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const seller = localStorage.getItem("email");
        const getProducts = async() =>{
            const response = await GetProductsForSeller(seller!);
            setProducts(response.data);
            
        }
        getProducts();
        console.log(products);
    }, []);

return (
        <Container className="mt-5">
            <div><Toaster/></div>
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
                            alt={products['name']}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Description: {products['description']}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Products left: {products['quantity']}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price: {products['price']}
                            </Typography>
                            <CardActions disableSpacing>
                            </CardActions>    
                        </CardContent>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
)
}
export default SellerProducts;