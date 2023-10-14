import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse } from '../../store/responseAISlice';
import { useNavigate } from 'react-router-dom';

import { Spin } from "antd";
import ChatBubble from '../../components/bubble-chat/ChatBubble';
import "bootstrap/dist/css/bootstrap.min.css";
import './ContentGenerate.css';


export default function ContentGenerate() {
    const isLoading = useSelector((state) => state.response.isLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { content: 'Halo, ada yang bisa saya bantu?', isUser: false},
    ]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setMessages((prevMessages) => [
            ...prevMessages,
            {content: input, isUser: true},
        ]);
        
        dispatch(getResponse(input))
        .then((response) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {content: response.payload, isUser: false},
            ]);
        });
        setInput("");
    };

    const handleBack = () => {
        navigate('/');
    }


    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
            <div className='column'>
                <button style={{marginLeft: '10px', marginTop: '10px'}} onClick={handleBack}>
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
                <h2 style={{textAlign: 'center'}}>AI Chat</h2>
            </div>
            <div className="mainContainer">
                <div className="chatContainer">
                    <div className='chatMessage'>
                        {messages.map((message, index) => (
                            <ChatBubble key={index} content={message.content} isUser={message.isUser}/>
                            ))}
                    </div>
                    <Spin spinning={isLoading} size="large" tip="Loading..." style={{marginTop: "5px"}}></Spin>
                </div> 
            </div>
            <div className='inputContainer'>
                <form>
                    <div className='inputWrapper'>
                        <div className='inputWithIcon'>
                            <textarea 
                                name="input"
                                className='form-control' 
                                placeholder="Masukkan input Anda"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            ></textarea>
                            <button onClick={handleSubmit}>
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}