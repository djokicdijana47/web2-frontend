import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function NavbarComponent() {
    const navigate = useNavigate();
    const token =  localStorage.getItem("userToken");
    const decodedToken:any = jwt(token!);
    const logout = () => {
        localStorage.clear();
        navigate('../../login');
    }

    if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "admin")
    {
        return (
        <Navbar bg="dark" expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/dashboard/sellers">User Accounts</Nav.Link>
                <Nav.Link href="/dashboard/orders">Orders</Nav.Link>
                <NavDropdown title="Profile" id="basic-nav-dropdown" >
                <NavDropdown.Item href="/dashboard/updateAccount">Update profile</NavDropdown.Item>
                <NavDropdown.Item href="/dashboard/updatePassword">Update password</NavDropdown.Item>

                <NavDropdown.Item onClick={logout}> Log out </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    }
    else if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "seller"){
        return(
        <Navbar expand="lg" className="bg-body-tertiary" bg="primary" data-bs-theme="dark">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/dashboard/addProduct">New product</Nav.Link>
                <Nav.Link href="/dashboard/products">My products</Nav.Link>
                <Nav.Link href="/dashboard/orders">My orders</Nav.Link>
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard/updateAccount">Update profile</NavDropdown.Item>
                <NavDropdown.Item href="/dashboard/updatePassword">Update password</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}> Log out </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    }
    else{
        return(
        <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
        <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/dashboard/newOrder">New order</Nav.Link>
                <Nav.Link href="/dashboard/currentOrder">Current order</Nav.Link>
                <Nav.Link href="/dashboard/myOrders">My orders</Nav.Link>
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item href="/dashboard/updateAccount">Update profile</NavDropdown.Item>
                <NavDropdown.Item href="/dashboard/updatePassword">Update password</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}> Log out </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    }
}

export default NavbarComponent;