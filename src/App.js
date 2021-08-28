import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import Author from './components/Author';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import {Accordion, Spinner} from 'react-bootstrap';

function App() {

    const [input, setInput] = useState('');
    const [authorsList, setAuthorsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const instance = axios.create({
        baseURL: "https://openlibrary.org/search",
    })

    async function fetchAuthorsListData() {
        const query= "/authors.json?q="+ input;
        const request = await instance.get(query);

        setAuthorsList(request.data.docs);
        setIsLoading(false);
        setSearched(true);
        return request;
    }

    const searchAuthors = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetchAuthorsListData();
    }

    const searchAuthorsEnter = (e) => {
        e.preventDefault();
        if(e.key === 'Enter'){
            setIsLoading(true);
            fetchAuthorsListData();
        }
    }

    const handleChange = (e) => {
        setInput(e.target.value);
        setSearched(false);
    }

    return (
        <div className="App">
            <div className="App__container">
                <h1>Welcome to the world of books</h1>

                {/* Search box */}
                <InputGroup className="App__containerSearchBox">
                    <FormControl
                        placeholder="Enter an author's name"
                        type="text" 
                        onKeyUp={searchAuthorsEnter} 
                        value={input} 
                        onChange={handleChange}
                    />
                    <Button variant="outline-secondary" disabled={!input} type="submit" onClick={searchAuthors}>
                        Search
                    </Button>
                </InputGroup>

                {/* Loading Spinner */}
                {(isLoading)?<Spinner animation="border" variant="primary" />:(<p></p>)}

                {/* List of authors */}
                <div>
                    {(authorsList?.length === 0) 
                        ?
                        ((input?.length !== 0 && searched)
                            ? <h5>There are no authors named {input}</h5> 
                            : <h5>Please search for the authors in the above search box to view the author's info.</h5>)
                        :
                        (<Accordion className="App__containerAuthorsList">
                            {/* Author name item expandable */}
                            {authorsList?.map((author) => (
                                <Author 
                                    name= {author.name}
                                    birthDate= {author.birth_date}
                                    topWork= {author.top_work}
                                    workCount= {author.work_count}
                                />
                            ))}
                        </Accordion>)
                    }
                </div>

            </div>

        </div>
    );
}

export default App;
