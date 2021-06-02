import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import UserDropDown from "./profilDropDawn"

export default function Header() {
    let user = [];
    if (localStorage.getItem('User') !== null){
        user = JSON.parse(localStorage.getItem('User'));
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">ТТИТ</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {user.role_id === 1 &&
                        <Nav.Link href="/admin-panel">Административная панель</Nav.Link>
                    }

                    {user.role_id === 2 &&
                        <Nav.Link href="/applications">заявки для расмотрения</Nav.Link>
                    }
                    <Nav.Link href="/category">Специальности и профессии</Nav.Link>
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
                        <UserDropDown />}
                    </ButtonGroup>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
