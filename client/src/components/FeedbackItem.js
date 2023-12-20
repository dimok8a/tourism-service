import React from 'react';
import {Container, Image, Row} from "react-bootstrap";
import {format} from 'date-fns';
import star from "../assets/star.png";


const FeedbackItem = ({feedback}) => {
    const feedbackDate = new Date(feedback.createdAt)
    return (
        <Container className="mt-5 fs-4">
            <Row>
                <div>{feedback.userName}</div>
            </Row>
            <Row>
                <div>{feedbackDate.getDay()}.{feedbackDate.getMonth()}.{feedbackDate.getFullYear()}</div>
            </Row>
            <Row>
                <div className="d-flex align-items-center">
                    <div>{feedback.rate}</div>
                    <Image src={star} width={20} height={20} className="m-lg-2"></Image>
                </div>
            </Row>
            <Row>
                <div>{feedback.body}</div>
            </Row>
        </Container>
    );
};

export default FeedbackItem;
