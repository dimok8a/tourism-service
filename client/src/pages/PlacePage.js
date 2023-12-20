import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import star from "../assets/star.png";
import scam from "../assets/scam.jpg"
import "./PlacePage.css"
import FeedbackItem from "../components/FeedbackItem"
import CreateFeedback from "../components/modals/CreateFeedback";
import {useParams} from "react-router-dom"
import {fetchOnePlace} from "../http/placeAPI";
const PlacePage = () => {
    const [place, setPlace] = useState({feedbacks: [], photo: [{photo: "???"}]})
    const {id} = useParams()

    useEffect(() => {
        fetchOnePlace(id).then(data => setPlace(data))
    }, []);

    const feedbacks = []

    const [newFeedbackVisible, setNewFeedbackVisible] = useState(false);
    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <Row>
                        <h2>{place.name}</h2>
                            {place.rate ?
                                <div className="d-flex align-items-center">
                                    <div className="fs-2">{parseFloat(place.rate).toFixed(2)}</div>
                                    <Image src={star} width={40} height={40} className="m-lg-2"></Image>
                                </div>
                                :
                                ""
                            }
                        <div>{place.description}</div>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        <Image width={300} height={300} src={process.env.REACT_APP_API_URL  + place.photo[0].photo} className="align-self-center" />
                        <Button variant="success" className="ml-3 mt-3 thebestbutton" onClick={()=> setNewFeedbackVisible(true)}>Оставьте свой отзыв прямо сейчас</Button>
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center align-items-center mt-3">
                <div>
                    <div className="fs-2">Местоположение: {place.latitude}, {place.longitude}</div>
                    <Image src={scam} />
                </div>
            </Row>
            <Row>
                {
                    place.feedbacks.map(feedback => <FeedbackItem key={feedback.id} feedback={feedback}></FeedbackItem>)
                }
            </Row>
            <CreateFeedback show={newFeedbackVisible} handleClose={() => setNewFeedbackVisible(false)}/>
        </Container>
    );
};

export default PlacePage;
