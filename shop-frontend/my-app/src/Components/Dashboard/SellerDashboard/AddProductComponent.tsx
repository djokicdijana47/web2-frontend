import { Button, Container, CssBaseline, Grid, InputLabel, MenuItem, Paper, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { useEffect, useState } from "react"
import { toast, Toaster} from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { ProductModel } from "../../../Models/ProductModel";
import { AddProduct } from "../../../Services/ProductService";

export default function(){

    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [imageUrl, setImageUrl] = useState("");

    const addProduct = ()=>{
        const merchantId = localStorage.getItem("email");

        if(merchantId != null){
            const productModel:ProductModel = new ProductModel(name, "", merchantId, description, price, quantity, imageUrl);
            console.log(productModel);
            AddProduct(productModel)
            .then(data =>{
                if(data.status === 204){
                    toast.success("Successfully added ".concat(name));
                    navigate("../dashboard/products");

                }
            })
        }

        
    }
    return (
        <div className="container mt-5">
        <Container component="main" maxWidth="xl">
      <div><Toaster/></div>
      <Box
      sx={{
        mx: 1,
        ml: 60
      }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            sm={8}
            md={5}
            component={Paper}
            elevation={3}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 9,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h6">
                Add a new product
              </Typography>
              <Box
                sx={{ mt: 0,  display: "flex",
                flexDirection: "column",
                alignItems: "center",}}
                
              >

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
                    <TextField
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Product description"
                  name="description"
                  autoComplete="description"
                  autoFocus
                  value={description}
                  onChange={(e)=>{setDescription(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Quantity"
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e)=>{setQuantity(+e.target.value)}}
                />
               
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="price"
                  label="Price"
                  name="price"
                  value={price}
                  onChange={(e)=>{setPrice(+e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="imageUrl"
                  label="Image Url"
                  name="imageUrl"
                  value={imageUrl}
                  onChange={(e)=>{setImageUrl(e.target.value)}}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={addProduct}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
        </div>
    )
}