import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreatePlace from "../components/modals/CreatePlace";
import CreateType from "../components/modals/CreateType";

const AdminPage = () => {
    const [typeVisible, setTypeVisible] = useState(false);
    const [placeVisible, setPlaceVisible] = useState(false);
    return (
        <Container className="d-flex flex-column">
            <Button onClick={() => setTypeVisible(true)} variant="success" className="mt-2 p-2">Добавить тип</Button>
            <Button onClick={() => setPlaceVisible(true)} variant="success" className="mt-2 p-2">Добавить место</Button>
            <CreateType show={typeVisible} handleClose={() => setTypeVisible(false)}/>
            <CreatePlace show={placeVisible} handleClose={() => setPlaceVisible(false)}/>
        </Container>
    );
};

export default AdminPage;
