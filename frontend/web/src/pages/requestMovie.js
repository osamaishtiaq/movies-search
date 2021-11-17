import React, { useState } from "react";
import { Container } from "../components/shared/layout/container";
import { Title } from "../components/shared/layout/title";
import { Spacer } from "../components/shared/layout/spacer";

import styled from "styled-components";
import Colors from "../components/shared/theme/colors";
import { ApiFetchService } from "../services/apiFetchService";

const RequestMoviePage = () => {
    const [BtnMessage, setBtnMessage] = useState({
        color: Colors.pink,
        message: "submit"
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const apiService = new ApiFetchService();
        const payload = {
            "name": event.target.elements.name.value,
            "email": event.target.elements.email.value,
            "movie_name": event.target.elements.movie_name.value,
            "phone_number": event.target.elements.tel.value,
            "description": event.target.elements.description.value,
        };
        apiService.post('api/v1/forms/movie-request', payload)
        .then(result => {
            setBtnMessage({
                color: "#4BB543",
                message: "Thanks, Your request has been sent"
            });
        })
        .catch(error => console.log('error', error));

    }

    return (
        <Container direction="column" align="center">
            <Spacer value={4} color={Colors.dark}/>
            <Title size={2.1}>Request a movie</Title>
            <Spacer value={2} />
            <Form onSubmit={handleSubmit} id="form">
                <input name="name" placeholder="Enter name" type="text" required/>
                <input name="email" placeholder="Enter email" type="email" required />
                <input name="movie_name" placeholder="Enter movie name" type="text" required />
                <input name="tel" placeholder="Enter phone number" type="tel" required />
                <textarea name="description" required></textarea>
                <Button type="submit" color={BtnMessage.color}>{BtnMessage.message}</Button>
            </Form>
            <Spacer value={2} />
        </Container>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
     
    & input{
        height: 50px;
        width: 100%;
        font-size: 1.2em;
        max-width: 600px;
        border-radius: 30px / 30px;
        border: 0;
        padding: 0 2rem;
        margin-bottom: 20px;
        color: ${Colors.dark};
        box-shadow: 0 10px 20px rgba(0,0,0,0.07);

        :focus{
            outline: ${Colors.pink} solid 2px;
        }
    }

    & textArea{
        width: 100%;
        font-size: 1.2em;
        max-width: 600px;
        border-radius: 10px / 10px;
        border: 0;
        resize: none;
        padding: 1rem 2rem;
        margin-bottom: 20px;
        color: ${Colors.dark};
        box-shadow: 0 10px 20px rgba(0,0,0,0.07);

        :focus{
            outline: ${Colors.pink} solid 2px;
        }
    }
`;

const Button = styled.button`
    height: 50px;
    padding: 0 3rem;
    width: 100%;
    max-width: 650px;
    font-size: 1.2em;
    background: ${(props) => props.color};
    border: none;
    border-radius: 50px / 50px;
    color: ${Colors.white};
    font-weight: 600;
    box-shadow: 0 0 10px  ${(props) => props.color}bf;
    transition: all 1s ease;
    cursor: pointer;

    :hover{
        box-shadow: 0 20px 30px ${(props) => props.color};
    }
`;

export default RequestMoviePage;