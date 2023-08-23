import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { UpdatePassword } from "../../Services/UserService";
import Box from "@mui/material/Box";
import toast, { Toaster } from "react-hot-toast";
import { Button, Container, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material";

export default function(){
    
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")

    const updatePassword = () => {
        const loggedInEmail = localStorage.getItem("email");
        if(loggedInEmail != undefined){
            if(newPassword != repeatedPassword){
                toast.error("Passwords do not match!");
            }
            else{
                UpdatePassword(loggedInEmail, oldPassword, newPassword, repeatedPassword)
                .then(response => {
                    toast.success("Password changed successfully");
                })
                .catch(error =>{
                    toast.error("Something went wrong, please try again");
                });
            }
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
                mx: 9,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h6">
                Update password
              </Typography>
              <Box
                sx={{ mt: 0,  display: "flex",
                flexDirection: "column",
                alignItems: "center",}}
                
              >
    
                <TextField
                  margin="normal"
                  fullWidth
                  id="oldPassword"
                  label="Old password"
                  name="oldPassword"
                  autoFocus
                  type="password"
                  value={oldPassword}
                  onChange={(e)=>{setOldPassword(e.target.value)}}
                />
                 <TextField
                  margin="normal"
                  fullWidth
                  id="newPassword"
                  label="New password"
                  name="newPassword"
                  autoFocus
                  type="password"
                  value={newPassword}
                  onChange={(e)=>{setNewPassword(e.target.value)}}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="repeatedPassword"
                  label="Repeat new password"
                  name="repeatedPassword"
                  autoFocus
                  type="password"
                  value={repeatedPassword}
                  onChange={(e)=>{setRepeatedPassword(e.target.value)}}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={updatePassword}
                >
                  Update
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