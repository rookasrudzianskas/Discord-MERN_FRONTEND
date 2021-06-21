import React from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CradGiftcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmoticonsIcon from '@material-ui/icons/EmojiEmotions'
import Message from './Message'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { selectChannelId, selectChannelName } from './features/appSlice'
import { useState } from 'react'
import { useEffect } from 'react'
import db from './firebase'
import firebase from 'firebase'
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher('eb7cd7f1e1f39229a9e3', {
    cluster: 'eu'
});

const Chat = () => {
    const user = useSelector(selectUser)
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, sendMessages] = useState([])

    const getConversation = (channelId) => {
        if(channelId) {
            axios.get(`/get/conversation?id=${channelId}`).then((res) => {
                sendMessages(res.data[0].conversation);
            })
        }
    }

    useEffect(() => {
        getConversation(channelId);

        const channel = pusher.subscribe("conversation");
        channel.bind("newMessage", function (data) {
            getConversation(channelId);
        });

    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault()

        axios.post(`/new/message?id=${channelId}`, {
            message: input,
            timestamp: Date.now(),
            user: user,
        })

        setInput('');
    }

    return (
        <div className='chat' >
            <ChatHeader channelName={channelName} />

            <div className="chat__messages">
                {messages.map((message) => {
                    console.log(message)
                })}
                {messages.map(message => (
                    <Message key={message.timestamp} message={message.message} timestamp={message.timestamp} user={message.user} />
                ))}
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize='large' />
                <form>
                    <input type="text" disabled={!channelId} value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                    <button className='chat__inputButton' hidden onClick={sendMessage} disabled={!channelId} type='submit'>Send Message</button>
                </form>

                <div className="chat__inputIcon">
                    <CradGiftcardIcon fontSize='large' />
                    <GifIcon fontSize='large' />
                    <EmojiEmoticonsIcon fontSize='large' />
                </div>
            </div>
        </div>
    )
}

export default Chat
