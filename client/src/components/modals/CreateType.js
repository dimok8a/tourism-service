import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/placeAPI";

const CreateType = ({show, handleClose}) => {
    const [value, setValue] = useState("")
    const addType = () => {
        createType(value).then(data => {
            setValue("")
            handleClose()
        })
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Название нового типа места</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введите название типа"
                            autoFocus
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={addType}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
