import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Nav, Row} from "react-bootstrap";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useLocation, useNavigate} from "react-router-dom"
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate();
    const click = async () => {
        let data
        try {
            if (isLogin)
            {
                data = await login(mail, password)
            }
            else
            {
                data = await registration(name, mail, password)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{ isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form>
                    {!isLogin ?
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        :
                        ""
                    }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите e-mail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form>
                <Row className="d-flex justify-content-between mt-3">
                    {isLogin ?
                        <div>
                        Нет аккаунта?<Nav.Link style={{color: "blue"}} href={REGISTRATION_ROUTE}>Зарегистрируйтесь</Nav.Link>
                        </div>
                        :
                        <div>
                        Есть аккаунт?<Nav.Link style={{color: "blue"}} href={LOGIN_ROUTE}>Войдите</Nav.Link>
                        </div>
                    }
                    <Button className="mt-3" variant="outline-success" onClick={() => click()}>
                        {isLogin ? "Войти" : "Зарегистрироваться"}
                    </Button>
                </Row>

            </Card>
        </Container>
    );
});

export default Auth;
