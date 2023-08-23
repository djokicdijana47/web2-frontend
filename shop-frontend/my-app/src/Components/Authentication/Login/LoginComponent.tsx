import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { login, socialLogin } from "../../../Services/AuthenticationService";
import { useState } from "react";
import { ProductModel } from "../../../Models/ProductModel";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { LoginModel } from "../../../Models/LoginModel";
import { useGoogleLogin } from "@react-oauth/google";
import { AccountModel } from "../../../Models/AccountModel";
import axios from "axios";
import GoogleButton from "react-google-button";

export default function () {
 
  
  const navigate = useNavigate();
  const token =  localStorage.getItem("userToken");
  if(token != null){
    if(token != ''){
      navigate("../dashboard");
    }
  }

  const [ user, setUser ] = useState<any>();
  const [ profile, setProfile ] = useState([]);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      if (codeResponse) {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setProfile(res.data);
                const cart: ProductModel[] = [];
                const accountModel:AccountModel = new AccountModel(res.data.given_name, res.data.family_name, "", res.data.email, new Date(), res.data.id, 0, res.data.picture);
                socialLogin(accountModel).then(response =>{
                  if(response.data == "User not verified"){
                    toast.error("User not verified");
                  }
                  else{
                    localStorage.setItem("userToken", response.data)
                    localStorage.setItem("email", res.data.email);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    localStorage.setItem("imageUrl", res.data.picture);
                    console.log(response);
                    navigate("../dashboard");
                    window.location.reload();
                  }
                }).catch(error => {
                  window.location.reload();
                  toast.error(error);
                })

            })
            .catch((err) => console.log(err));
    }
    },
    onError: (error) => console.log('Login Failed:', error),
    onNonOAuthError: (error) => console.log('Login Failed:', error)
  });

  const loginAction = (event: { preventDefault: () => void; }) =>{
    event.preventDefault();
    if(email != "" && password != ""){

      const loginModel:LoginModel = new LoginModel(email, password);
      const cart: ProductModel[] = [];

      login(loginModel)
      .then(response =>{
        if(response.data == "User not verified"){
          toast.error(response.data);

        }
        else if (response.data == "" || response.data == undefined){
          toast.error("Wrong email or password, please try again");
        }
        else
        {
        toast.success("Logging in...");
        localStorage.setItem("userToken", response.data)
        localStorage.setItem("email", email);
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("imageUrl", response.data.imageUrl);
        console.log(response.data);
        navigate("../dashboard");
        //window.location.reload();
        }
      })
      .catch(error =>{
            toast.error("Wrong email or password, please try again");
      });

    }
  }
  return (
    <div style={{ 
      backgroundImage: `url("https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")` 
    }}>
    <Container component="main" maxWidth="lg">
        <div><Toaster/></div>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://img.freepik.com/free-vector/gradient-instagram-shop-logo-template_23-2149704603.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in to make your first order!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={loginAction}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e)=>{setEmail(e.target.value)}}

                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={(e)=>{setPassword(e.target.value)}}

                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>
                <GoogleButton style={{marginLeft:"90px", marginTop:"10px"}} onClick={() => googleLogin()}/> 
                <Grid container style={{marginTop:"10px"}}
                 display="flex"
                 justifyContent="center"
                 alignItems="center">
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </div>
  );
}