import React,{useEffect, useState} from 'react';
import "./chat.css";
import { Avatar, IconButton } from '@material-ui/core';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import AttachFile from '@material-ui/icons/AttachFileOutlined';
import MoreVert from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from "react-router-dom";
import db from "../../firebase";
import { useStateValue } from '../../provider/StateProvider';
import firebase from "firebase";

export default function Chat() {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId){
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => (setRoomName(snapshot.data().name)));
            
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp','asc')
                .onSnapshot((snapshot) => (setMessages(snapshot.docs.map(doc => doc.data()))));
        }
    },[roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('You typedd >>>', input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput('');
    };

    return (
        <div className="chat">

            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat-header-info">
                    <h2>{roomName}</h2>
                    <p>Last seen at {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat-header-right">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat-body">
                {messages.map((message) => (
                    <p className={`chat-message ${message.name === user.displayName && "chat-reciever"}`}>
                <span className={`chat-name ${message.name === user.displayName && "you"}`}>{message.name}</span>
                {message.message}
                <span className="chat-timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                ))}
                
            </div>
            
            <div className="chat-footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit"/>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
