import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Form, Nav, Navbar, NavDropdown, NavLink} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import "./navbar.css"
import { useNavigate } from 'react-router-dom';
import CreatePlace from "./modals/CreatePlace";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [placeVisible, setPlaceVisible] = useState(false);

    const logOut = () => {
        user.setUser(null)
        user.setIsAuth(false)
        navigate(MAIN_ROUTE)
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary thebestnavbar">
            <Container fluid>
                <Nav.Link href={MAIN_ROUTE} style={{ marginLeft: "10px", color: "#5F5556", fontFamily: "Roboto", fontWeight: 500 }}>
                    Отзовичок боровичок
                </Nav.Link>
                <Container className="d-flex justify-content-between align-items-center">
                    <Button variant="light" onClick={() => setPlaceVisible(true)}>Добавить новое место</Button>
                    {user.isAuth ? (
                        <div className="d-flex align-self-end">
                            <Button variant="dark" style={{ marginLeft: "10px" }} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                            <Button variant="dark" style={{ marginLeft: "10px" }} onClick={() => logOut()}>Выйти</Button>
                        </div>
                    ) : (
                        <Button variant="dark" onClick={() => navigate(LOGIN_ROUTE)}>Войти</Button>
                    )}
                </Container>
            </Container>
            <CreatePlace show={placeVisible} handleClose={() => setPlaceVisible(false)}/>
        </Navbar>
    );
});


export default NavBar;
