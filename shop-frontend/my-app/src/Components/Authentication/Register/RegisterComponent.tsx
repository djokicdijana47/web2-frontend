import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { UserModel } from "../../../Models/UserModel";
import { register } from "../../../Services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import toast, { Toaster } from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
export default function () {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [dateOfBirth, setDateOfBirth] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [accountType, setAccountType] = useState("2")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const registerAction = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        const accountModel:UserModel = new UserModel(name, lastname, address, Number(accountType) ,password, confirmPassword,email, new Date(dateOfBirth?.toString() as string), username);
        
        if(password != confirmPassword){
            toast.error("Passwords do not match, please try again");
            return;
        }

        register(accountModel)
            .then(response =>{
                if(response.status === 204){
                    toast.success("Successfully registered!");
                    navigate("../login");
                }
            })
            .catch(error =>{
                toast.error(error.response.data);
            })
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
       minHeight="70vh"
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://cdn.pixabay.com/photo/2021/07/10/15/45/online-shop-6401739_1280.png)",
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
            elevation={3}
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
              <Typography component="h1" variant="h6">
                Create your account!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={registerAction}
                sx={{ mt: 0 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  onChange={(e)=>{setUsername(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="repeatedPassword"
                  label="Repeat Password"
                  type="password"
                  id="repeatedPassword"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e)=>{setConfirmPassword(e.target.value)}}
                  />
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
                  required
                  fullWidth
                  id="lastname"
                  label="Lastname"
                  name="lastname"
                  value={lastname}
                  onChange={(e)=>{setLastname(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <DatePicker 
                        value={dateOfBirth}
                        onChange={(newValue) => setDateOfBirth(newValue)}
                    />
                </LocalizationProvider>
                <InputLabel id="demo-simple-select-label">Account type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={accountType}
                    label="Account type"
                    onChange={(e)=>{setAccountType(e.target.value)}}
                    
                >
                    <MenuItem value={0}>Administrator</MenuItem>
                    <MenuItem value={1}>Shopper</MenuItem>
                    <MenuItem value={2}>Seller</MenuItem>
                </Select>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container
                 display="flex"
                 justifyContent="center"
                 alignItems="center">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {"Already have an account? Log in"}
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