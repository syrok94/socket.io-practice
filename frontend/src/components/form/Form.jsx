import React, { useState, useEffect } from 'react';
import "./Form.css";
import io from "socket.io-client"; 

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const [chat , setChat] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Create the socket connection once when the component mounts
        const newSocket = io("ws://localhost:5000");
        setSocket(newSocket);

        // Clean up the socket connection when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Emit the message to the server
        if (socket) {
            socket.emit("receive message", inputValue);
        }

        // Update the chat state
        setChat([...chat , inputValue]);
        setInputValue("");
    };

    return (
        <div>
            <form className="simple-form" onSubmit={handleSubmit}>
                <input
                    className="input-field"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter something"
                />
                <button className="submit-button" type="submit">Submit</button>
            </form>

            <div>
                {chat.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>

            <h1 style={{textAlign : "center"}}>Total {chat.length} chats have been done</h1>
        </div>
    );
}

export default Form;
