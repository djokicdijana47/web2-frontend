import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardHeader from '@mui/material/CardHeader';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { getAllOrdersSeller, getNewOrdersSeller } from "../../../Services/OrderService";
import { OrderModel } from "../../../Models/OrderModel";


const SellerOrdersComponent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const user = localStorage.getItem("email");

    const [newOrders, setNewOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        const getNewOrders = async() =>{
            const response = await getNewOrdersSeller(user!)
            console.log(response.data);
            setNewOrders(response.data);
           
        }
        getNewOrders();
        console.log(newOrders);
    }, []);

    useEffect(() => {
        const getAllOrders = async() =>{
            const response = await getAllOrdersSeller(user!)
            console.log(response.data);

            setAllOrders(response.data);
        }
        getAllOrders();
    }, []);

    const columns = useMemo<MRT_ColumnDef<OrderModel>[]>(
        () => [
          {
            accessorKey: 'id',
            header: 'Id',
            size: 150,
          },
          {
            accessorKey: 'customerAddress',
            header: 'Address',
            size: 150,
          },
          {
            accessorKey: 'customerEmail',
            header: 'Customer',
            size: 150,
          },
          {
            accessorKey: 'orderPlacedTime',
            header: 'Ordered time',
            size: 150,
          },
          {
            accessorFn: (originalRow) => originalRow.orderedProducts.map(x => x.productName + '\n'),
            header: 'Products',
            size: 150,

          },
        ],
        [],
      );

    return (
        <div className="container mt-5">
        <Accordion defaultExpanded={true}>
         <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Past orders
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See past orders</Typography>
            </AccordionSummary>
             <AccordionDetails>
             <MaterialReactTable columns={columns} data={allOrders} />

            </AccordionDetails>
        </Accordion>
        <Container>   
         <Accordion
         defaultExpanded={true}>
         <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                New and in progress orders
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>See new orders</Typography>
            </AccordionSummary>
             <AccordionDetails>
                <Row>
                {newOrders.map((newOrders, k) => (
                        <Col key={k} xs={12} md={4} lg={3}>
                            <Card sx={{ maxWidth: 345, width: 300 }}>
                                    <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                    Customer: {newOrders['customerEmail']}
                                  </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                            Order id: {newOrders['id']}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Time left: 
                                        <Countdown date={new Date(newOrders['orderCompletedTime'])}></Countdown>
                                    </Typography>
                                   
                                    <Typography variant="body2" color="text.secondary">
                                        Order address: {newOrders['shopperAddress']}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                    ))}
                </Row>
        </AccordionDetails>
        </Accordion>
    </Container>
    </div>    
    )
}
export default SellerOrdersComponent;