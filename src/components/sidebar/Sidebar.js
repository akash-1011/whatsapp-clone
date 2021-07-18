import React, { useState, useEffect } from 'react';
import "./sidebar.css";
import {Avatar, IconButton} from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from "../../firebase";
import { useStateValue } from '../../provider/StateProvider';

export default function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(async () => {
        await db.collection("rooms").onSnapshot((snapshot) => setRooms(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        })))
        );

        // console.log(rooms)

        
    },[]);

    return (
        <div className="sidebar">
        {console.log(rooms)}
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} />
                <div className="sidebar-header-right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            
            <div className="sidebar-search">
                <div className="sidebar-search-container">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start a new chat" type="text"/>
                </div>    
            </div>
            
            <div className="sidebar-chats">
                <SidebarChat addNewChat />
                {rooms.map(room => <SidebarChat key={room.id} id={room.id} name={room.data.name}/>)}
            </div>
        </div>
    )
}
