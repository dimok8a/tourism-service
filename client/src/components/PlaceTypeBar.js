import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const PlaceTypeBar = observer(() => {
    const {place} = useContext(Context)
    const {placeTypes} = place
    return (
        <div>
            <ListGroup horizontal>
                {placeTypes.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === place.selectedType.id}
                    onClick={() => place.setSelectedType(type)}
                    key={type.id}>
                    {type.name}
                </ListGroup.Item>)}
            </ListGroup>
        </div>
    );
});

export default PlaceTypeBar;
