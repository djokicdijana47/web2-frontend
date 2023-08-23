import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Button, Typography } from "@mui/material";
import { Row, Col, Container } from "react-bootstrap";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { toast, Toaster} from "react-hot-toast";
import { getCanceledOrdersShopper, getNonCanceledOrdersShopper, cancelOrderById } from "../../../Services/OrderService";
import { OrderModel } from "../../../Models/OrderModel";

const ShopperOrdersComponent = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("userToken");
    if(token == null || token == ''){
        navigate("../login");
    }
    const user = localStorage.getItem("email");

    const [nonCanceledOrders, setNonCanceledOrders] = useState([]);

    useEffect(() => {
        const getNonCanceledOrders = async() =>{
            const response = await getNonCanceledOrdersShopper(user!)
            setNonCanceledOrders(response.data);
        }
        getNonCanceledOrders();
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
            accessorFn: (originalRow) => originalRow.orderedProducts.map(x => x.productName + '\n'),
            header: 'Products',
            size: 150,
          },
        ],
        [],
      );


    const cancelOrder = (order:OrderModel) => {
        var date = new Date(order.orderPlacedTime);
        date.setHours(date.getHours() + 1);
        if(new Date().getTime() > date.getTime()){
          console.log(order);

          cancelOrderById(order.id).then(response => { 
            toast.success("Order " + order.id + " canceled!");
        })
      }
        else{

          toast.error("Can't cancel the order yet! You can cancel the order at " + date)

        }
    }
    
    return (
        <main className="container mt-5">
          <div><Toaster/></div>
            <Accordion defaultExpanded={true}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  Past orders
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>See past orders</Typography>
              </AccordionSummary>
              <AccordionDetails>
              <Row>
                  {nonCanceledOrders.map((nonCanceledOrders, k) => (
                          <Col key={k} xs={12} md={4} lg={3}>
                              <Card sx={{ maxWidth: 345, width: 300 }}>
                                  <CardHeader>
                                  </CardHeader>
                                      <CardContent>
                                      <Typography variant="body2" color="text.secondary">
                                              Order id: {nonCanceledOrders['id']}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                          Time left:
                                      </Typography>
                                      <Countdown date={new Date(nonCanceledOrders['orderCompletedTime'])}></Countdown>
                                      <Typography variant="body2" color="text.secondary">
                                          Order address: {nonCanceledOrders['customerAddress']}
                                      </Typography>
                                      <Button disabled={new Date(nonCanceledOrders['orderCompletedTime']).getTime() < new Date().getTime()} variant="contained" size="small" color="error" type="submit" style={{marginLeft:"87px", marginTop:"10px"}} onClick={() => cancelOrder(nonCanceledOrders)}>Cancel</Button>
                                  </CardContent>
                              </Card>
                          </Col>
                      ))}
                  </Row>
              </AccordionDetails>
            </Accordion> 
        </main>    
    )
}
export default ShopperOrdersComponent;