import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import PlaceItem from "./PlaceItem";

const PlaceList = observer(() => {
    const {place} = useContext(Context)

    return (
        <Row className="d-flex">
            {place.places.map(currentPlace => <PlaceItem key={currentPlace.id} place={currentPlace}/>)
            }
        </Row>
    );
});

export default PlaceList;
