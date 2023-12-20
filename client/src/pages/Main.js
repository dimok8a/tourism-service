import React, {useContext, useEffect} from 'react';
import {Container, Row, Col} from "react-bootstrap";
import PlaceTypeBar from "../components/PlaceTypeBar";
import PlaceList from "../components/PlaceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchPlaces, fetchTypes} from "../http/placeAPI";

const Main = observer(() => {
    const {place} = useContext(Context)


    useEffect(() => {
        fetchTypes().then(data => place.setPlaceTypes(data))
        fetchPlaces(null).then(data => place.setPlaces(data))
    }, []);

    useEffect(() => {
        fetchPlaces(place.selectedType.id).then(data => place.setPlaces(data))
    }, [place.selectedType]);

    return (
        <Container>
            <Col>
                <Col md={3} className="mt-3">
                    <PlaceTypeBar/>
                </Col>
                <Col md={9} className="mt-3">
                    <PlaceList/>
                </Col>
            </Col>
        </Container>
    );
});

export default Main;
