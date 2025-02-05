import React from 'react';

import { IonIcon } from "@ionic/react";
import { checkmarkDone, star } from "ionicons/icons";
import {PlayButtonTextToSpeech} from "../components/PlayButtonTextToSpeech"

export const ChatBottomDetails = ({ message }) => (

    <span className="chat-bottom-details" id={ `chatTime_${ message.id }`}>
         { message.is_audio &&   <span className="chat-bottom-details"><span>{message.duration}</span>    </span> }
        { !message.is_tipo && <span>{ message.date }</span> }
        { message.sent && <IonIcon icon={ checkmarkDone } color="primary" style={{ fontSize: "0.8rem" }} /> }
        { message.starred && <IonIcon icon={ star } /> }
        { !message.sent && !message.is_tipo && <div className="header-chat-webis"><PlayButtonTextToSpeech text={message.preview}/></div> }
    </span>
    

    
);