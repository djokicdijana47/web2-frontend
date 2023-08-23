import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { OrderModel } from "../../../Models/OrderModel";
import { GetAllOrders } from "../../../Services/OrderService";
import { useNavigate } from 'react-router-dom';
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
function ViewOrdersComponent() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
      
    }
    const columns = useMemo<MRT_ColumnDef<OrderModel>[]>(
        () => [
          {
            accessorKey: 'id',
            header: 'Id',
            size: 150,
          },
    
          {
            accessorKey: 'customerEmail',
            header: 'User',
            size: 150,
          },
    
          {
            accessorKey: 'customerAddress',
            header: 'Address',
            size: 150,
          }, 
          {
            accessorFn:(originalRow) => originalRow.orderedProducts.map(x => x.productName + '\n') ,
            header: 'Products',
            size: 150,
          }
        ],
        [],
      );

    useEffect(() => {
        const getOrders = async() =>{
            const response = await GetAllOrders()
            setOrders(response.data);
        }
        getOrders();
    }, []);
    return (
        <div className="container">
            <Accordion
            defaultExpanded={true} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Orders
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>See all the orders on the platform</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <MaterialReactTable columns={columns} data={orders} />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default ViewOrdersComponent