import { Switch, Components, Typography, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { AccountModel } from "../../../Models/AccountModel";
import { BlockSeller, GetSellers, GetShoppers, VerifySeller } from "../../../Services/UserService";
import {toast, Toaster} from 'react-hot-toast';
import { MDBInput } from "mdb-react-ui-kit";

function ViewSellersComponent() {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
      
    }
    const [sellers, setsellers] = useState([]);
    const [shoppers, setShoppers] = useState([]);
    const [sellerId, setsellerId] = useState("");
    const columns = useMemo<MRT_ColumnDef<AccountModel>[]>(
        () => [
          {
            accessorKey: 'username',
            header: 'Username',
            size: 150,
          },
    
          {
            accessorKey: 'name',
            header: 'Name',
            size: 150,
          },
    
          {
            accessorKey: 'lastname',
            header: 'Last Name',
            size: 150,
          },
    
          {
            accessorKey: 'email',
            header: 'Email',
            size: 150,
          },
          {
            accessorKey: 'address',
            header: 'Address',
            size: 150,
          },
          {
            accessorKey: 'dateOfBirth',
            header: 'Date of birth',
            size: 150,
          },
          {
            accessorFn: (row:AccountModel) => accountStatusString(row.accountStatus),
            header: 'Account Status',
            size: 150,
          }
        ],
        [],
      );
      const accountStatusString = (accountStatus:Number) => {
        if(accountStatus == 0){
          return "New";
        }
        else if(accountStatus == 1){
          return "Verified";
        }
        else{
          return "Blocked";
        }
      }
      const blockSellerAction = () => {
        BlockSeller(sellerId)
        .then(response =>{
            console.log(response);
            toast.success("seller " + sellerId +" blocked.");
            const getUsers = async() =>{
              const response = await GetSellers()
              setsellers(response.data);
              
            }
            getUsers();
        })
        .catch(error => {
          toast.error(error);
        })
    }

    const verifySeller = () => {
      VerifySeller(sellerId)
      .then(response =>{
          toast.success("seller " + sellerId +" verified.");
          const getUsers = async() =>{
            const response = await GetSellers()
            setsellers(response.data);
            
          }
          getUsers();
        })
        
      .catch(error => {
        toast.error(error);
      })
      
    }


    useEffect(() => {
        const getUsers = async() =>{
            const response = await GetSellers()
            setsellers(response.data);
            
        }
        getUsers().catch(error => {
          toast.error(error);
          localStorage.removeItem("userToken");
          localStorage.removeItem("email");
          localStorage.removeItem("cart");
          navigate("../../login");
        });
    }, []);
    useEffect(() => {
        const getUsers = async() =>{
            const response = await GetShoppers()
            setShoppers(response.data);
        }
        getUsers().catch(error => {
          toast.error(error);
          localStorage.removeItem("userToken");
          localStorage.removeItem("email");
          localStorage.removeItem("cart");
          navigate("../../login");
        });
    }, []);
    return (
        <div className="container mt-5">
            <div><Toaster/></div>
            <Accordion
            defaultExpanded={true} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Shoppers
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See all the shoppers on the platform</Typography>
            </AccordionSummary>
            <AccordionDetails>

                <MaterialReactTable columns={columns} data={shoppers}
                
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
            defaultExpanded={true} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Sellers
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See all the sellers on the platform</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <label>Input a seller email</label>
                <MDBInput placeholder="example@email.com" type="email" value={sellerId} onChange={(e)=>{setsellerId(e.target.value)}}/>
                <Button variant="contained" sx={{marginRight: '20px', marginTop:'10px'}} color="success" onClick={() => verifySeller()}> Verify</Button>
                
                <Button variant="contained" color="error" sx={{marginRight: '20px', marginTop:'10px'}} onClick={() => blockSellerAction()}> Block</Button>
                <MaterialReactTable columns={columns} data={sellers} />
              </AccordionDetails>
            </Accordion>

        </div>
    )
}

export default ViewSellersComponent