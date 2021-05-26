import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import UserDropDown from "./profilDropDawn"

export default function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav locale>
                    {localStorage.token === undefined &&
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button href={'/registration'}>Регистрация</Button>
                        <Button href={'/sign-in'}>войти</Button>
                    </ButtonGroup>
                    }
                    {localStorage.token &&
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <UserDropDown />
                        {/*<Button onClick={logout}>выйти</Button>*/}
                    </ButtonGroup>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
