import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createPlace, createType, fetchPlaces, fetchTypes} from "../../http/placeAPI";
import {observer} from "mobx-react-lite";

const CreatePlace = observer(({show, handleClose}) => {
    const {place} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => place.setPlaceTypes(data))
    }, []);

    const [placeTypeId, setTypeId] = useState(1)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [website, setWebsite] = useState("")
    const [address, setAddress] = useState("")
    const [longitude, setLongitude] = useState("")
    const [latitude, setLatitude] = useState("")
    const [photo, setPhoto] = useState(null)


    const addPlace = () => {
        const formData = new FormData()
        formData.append('placeTypeId', `${placeTypeId}`)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('phone_number', phone_number)
        formData.append('website', website)
        formData.append('address', address)
        formData.append('longitude', longitude)
        formData.append('latitude', latitude)
        formData.append('photo', photo)
        createPlace(formData).then(data => handleClose())
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить место</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Выберите тип нового места</Form.Label>
                        <Form.Select aria-label="Выберите тип" onChange={(e) => {
                            setTypeId(Number(e.target.value))
                        }}>
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        type="text"
                        placeholder="Добавьте описание места места"
                        autoFocus
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        type="tel"
                        placeholder="Введите телефон места"
                        autoFocus
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        type="url"
                        placeholder="Введите адрес сайта"
                        autoFocus
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        type="address"
                        placeholder="Введите адрес"
                        autoFocus
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Form.Control
                        required
                        className="mt-2"
                        type="number"
                        placeholder="Введите долготу"
                        autoFocus
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                    <Form.Control
                        required
                        className="mt-2"
                        type="number"
                        placeholder="Введите широту"
                        autoFocus
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        type="file"
                        placeholder="Добавьте фотографию"
                        autoFocus
                        onChange={(e) => {
                            setPhoto(e.target.files[0])
                        }}
                    />
                </Form>
                <hr/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={addPlace}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePlace;
