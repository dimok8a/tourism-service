import React, {useContext} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";

const ApprovePlace = ({show, handleClose}) => {
    const {place} = useContext(Context)

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Принять/отклонить новые места</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Выберите тип нового места</Form.Label>
                        <Form.Select aria-label="Выберите тип">
                            {place.placeTypes.map(type =>
                                <option key={type.id} value={type.id}>{type.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Control
                        required
                        className="mt-2"
                        type="text"
                        placeholder="Введите название места"
                        autoFocus
                    />
                    <Form.Control
                        className="mt-2"
                        type="text"
                        placeholder="Добавьте описание места места"
                        autoFocus
                    />
                    <Form.Control
                        className="mt-2"
                        type="tel"
                        placeholder="Введите телефон места"
                        autoFocus
                    />
                    <Form.Control
                        className="mt-2"
                        type="url"
                        placeholder="Введите адрес сайта"
                        autoFocus
                    />
                    <Form.Control
                        className="mt-2"
                        type="address"
                        placeholder="Введите адрес"
                        autoFocus
                    />
                    <Form.Control
                        required
                        className="mt-2"
                        type="number"
                        placeholder="Введите долготу"
                        autoFocus
                    />
                    <Form.Control
                        required
                        className="mt-2"
                        type="number"
                        placeholder="Введите широту"
                        autoFocus
                    />
                    <Form.Control
                        className="mt-2"
                        type="file"
                        placeholder="Добавьте фотографию"
                        autoFocus
                    />
                </Form>
                <hr/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ApprovePlace;
