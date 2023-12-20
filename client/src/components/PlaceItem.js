import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import "./PlaceItem.css"
import star from "../assets/star.png"
import { useNavigate } from 'react-router-dom';
import {PLACE_ROUTE} from "../utils/consts";

const PlaceItem = ({place}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className="mt-3" onClick={() => navigate(PLACE_ROUTE + "/" + place.id)}>
            <Card style={{width: 200, cursor: "pointer"}} border={"light"} className="thebestplaceitem">
                <Image width={200} height={200} src={process.env.REACT_APP_API_URL + place.photo[0].photo}></Image>
                <div className="d-flex flex-column p-lg-2">
                    <div style={{color: "#5F5556"}} className="fs-5">{place.name}</div>
                    {place.feedbacks.length > 0 ?
                        <div className="d-flex align-items-center">
                            <div>{parseFloat(place.feedbacks[0].rate).toFixed(2)}</div>
                            <Image src={star} width={15} height={15} className="m-lg-2"></Image>
                        </div>
                        :
                        ""
                    }
                    <div style={{color: "#918985"}}>{place.description}</div>
                </div>
            </Card>
        </Col>
    );
};

export default PlaceItem;
