import React, {useContext, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {observable} from "mobx";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {createFeedback} from "../../http/feedbackAPI";

const CreateFeedback = observer(({show, handleClose}) => {
    const {user} = useContext(Context)
    const [body, setBody] = useState("")
    const [rate, setRate] = useState(1)
    const [is_anonymous, setIsAnonymous] = useState(false)
    const {id} = useParams()
    const addFeedback = () => {
        const newFeedback = {body, rate, is_anonymous, placeId: id, userId: user.user.id}
        createFeedback(newFeedback).then(() => handleClose())
    }

    return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Оставить отзыв</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control
                            required
                            className="mt-2"
                            type="text"
                            placeholder="Расскажите о своем опыте"
                            autoFocus
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <Form.Select aria-label="Как вы оцените это место" className="mt-3" onChange={(e) => setRate(e.target.value)}>
                            <option disabled>Как вы оцените это место?</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Form.Select>
                        <Form.Check
                            className="mt-3"
                            type="switch"
                            id="custom-switch"
                            label="Опубликовать анонимно"
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addFeedback}>
                        Оставить отзыв
                    </Button>
                </Modal.Footer>
            </Modal>
    );
})

export default CreateFeedback;
