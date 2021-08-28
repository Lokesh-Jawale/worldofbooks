import React, {useState} from 'react';
import './Author.css';
import {Accordion} from 'react-bootstrap';

function Author({name, birthDate, topWork, workCount}) {

    return (
        <div className="author">
            <div>
                <Accordion.Item eventKey={name}>

                    <Accordion.Header className="author__header">
                        <p>{name}</p>
                    </Accordion.Header>

                    <Accordion.Body className="author__info">
                            <h5>Authors Details</h5>
                            <ul>
                                <li>Birth Date : {(birthDate)?birthDate: " Not Known "}</li>
                                <li>Top Work : {(topWork)?topWork: " Not Known "}</li>
                                <li>Total Books : {(workCount)?workCount: " Not Known "}</li>
                            </ul>
                    </Accordion.Body>

                </Accordion.Item>
            </div>
            
        </div>
    )
}

export default Author;
