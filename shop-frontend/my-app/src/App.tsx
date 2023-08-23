import './App.css';
import axios from 'axios';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css"
import LoginComponent from './Components/Authentication/Login/LoginComponent';
import RegisterComponent from './Components/Authentication/Register/RegisterComponent';
import NavbarComponent from './Components/Navbar/NavbarComponent';
import ViewSellersComponent from './Components/Dashboard/AdminDashboard/ViewSellersComponent';
import ViewOrdersComponent from './Components/Dashboard/AdminDashboard/ViewOrdersComponent';
import UpdateAccountComponent from './Components/Shared/UpdateAccountComponent';
import AddProductComponent from './Components/Dashboard/SellerDashboard/AddProductComponent';
import SellerOrdersComponent from './Components/Dashboard/SellerDashboard/SellerOrdersComponent';
import SellerProducts from './Components/Dashboard/SellerDashboard/SellerProductsComponent';
import AllProductsComponent from './Components/Dashboard/ShopperDashboard/AllProductsComponent';
import CurrentOrderComponent from './Components/Dashboard/ShopperDashboard/CurrentOrderComponent';
import ShopperOrdersComponent from './Components/Dashboard/ShopperDashboard/ShopperOrdersComponent';
function App() {

  const navigate = useNavigate();
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
  if (error.response.status === 401) {
    localStorage.clear();
    navigate("../../login");
  }
  return error;
});

const adminStyle={
  backgroundImage:
    "url('https://cdn.wallpapersafari.com/58/93/8eKYud.jpg')",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const sellerStyle={
  background:
  "radial-gradient(circle, rgba(217,241,105,1) 0%, rgba(99,131,163,1) 100%)",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};
const shopperStyle={
  backgroundImage:
    "url('https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg')",
  height:'100vh',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


    const DashboardLayoutAdmin = () => (
      
      <div style={adminStyle}>
        <NavbarComponent />
        <div className="screens-container" >
          <main className="main">
            <Outlet /> 
          </main>
        </div>
      </div>

    );

    const DashboardLayoutSeller = () => (
      
      <div style={sellerStyle}>
        <NavbarComponent />
        <div className="screens-container" >
          <main className="main">
            <Outlet /> 
          </main>
        </div>
      </div>

    );

    const DashboardLayoutShopper = () => (
      
      <div style={shopperStyle}>
        <NavbarComponent />
        <div className="screens-container" >
          <main className="main">
            <Outlet /> 
          </main>
        </div>
      </div>

    );


    const token =  localStorage.getItem("userToken");
    if(token == null){
      return(
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />

        </Routes>
      )
    }
    else{
        const decodedToken:any = jwt(token!);
        if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "admin"){
          console.log("edmin");
          return (
            <Routes>
            <Route element={<DashboardLayoutAdmin />} >
              <Route path="/dashboard" element ={<ViewSellersComponent/>}/>
              <Route path="/dashboard/sellers" element ={<ViewSellersComponent/>}/>
              <Route path="/dashboard/orders" element ={<ViewOrdersComponent/>}/>
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>


            </Route>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />

          </Routes>    
          );       
        }
        else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "seller"){
          return (
          <Routes>
          <Route element={<DashboardLayoutSeller />} >
          <Route path="/dashboard" element ={<AddProductComponent/>}/>
              <Route path="/dashboard/addProduct" element ={<AddProductComponent/>}/>
              <Route path="/dashboard/orders" element ={<SellerOrdersComponent/>}/>
              <Route path="/dashboard/products" element ={<SellerProducts/>}/>
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>
          </Route>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
         );
        }
        else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "shopper"){
          return (
            <Routes>
            <Route element={<DashboardLayoutShopper />} >
             <Route path="/dashboard" element={<AllProductsComponent/>} />
              <Route path="/dashboard/newOrder" element={<AllProductsComponent />} />
              <Route path="/dashboard/currentOrder" element={<CurrentOrderComponent />} />
              <Route path="/dashboard/updateAccount" element ={<UpdateAccountComponent/>}/>\
              <Route path="/dashboard/myOrders" element ={<ShopperOrdersComponent/>}/>
            </Route>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>    
          ); 
        }
        return(
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />

          </Routes>
        )
    }

}

export default App;