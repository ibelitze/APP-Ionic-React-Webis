import React from 'react';

import { IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonList, IonInfiniteScroll, IonTextarea, CreateAnimation, useIonViewWillEnter,IonInfiniteScrollContent } from "@ionic/react";
import { micOutline, send, trash } from "ionicons/icons";
import { useRef } from "react";
import { useEffect, useState,} from "react";
import { VoiceRecorder} from 'capacitor-voice-recorder';
import {SendMessageController} from "../../backend/Chat/controllers/SendMessageController"
import {GetMesssagesController} from "../../backend/Chat/controllers/GetMesssagesController"
import {PlayButton} from "../components/PlayButton"
import "./Chat.css"
import "./webis.css"
import { ChatBottomDetails } from "../components/ChatBottomDetails";

const Chat = () => {
    //  Global State
    const [chat, setChat] = useState([]);

    //  Local state
    const [ message, setMessage ] = useState("");
    const [ showSendButton, setShowSendButton ] = useState(false);
    const [ showSendAudioButton, setShowSendAudioButton ] = useState(false);
    const [ booleanScroll, setBooleanScroll ] = useState(true);

    const [ replyToMessage, setReplyToMessage ] = useState(false);
    const [ intitialState, setIntitialState ] = useState(true);
    const [ messageSent, setMessageSent ] = useState(false);
    const [durationDisplay, setDurationDisplay] = useState("0:00");
    const [offset, setOffset] = useState(0);
   
    let variableTest=0;

    //  Refs
    const contentRef = useRef();
    const swiperRefs = useRef([]);
    const textareaRef = useRef();
    const sideRef = useRef();
    const sendRef = useRef();

    const sendChatMessage = (is_tipo,contactId, message, reply = false, replyID = false, image = false, imagePath = false, sent = true, id= 9999, is_audio = false, duration = "00:00") => {

        const today = new Date();
        const currentTime = `${ today.getHours() < 10 ? `0${ today.getHours() }` : today.getHours() }:${ today.getMinutes() < 10 ? `0${ today.getMinutes() }` : today.getMinutes() }`;
    
    
            const newChat = {
    
                id: id,
                preview: message,
                received: false,
                sent: sent,
                date: currentTime,
                read: true,
                starred: false,
                reply,
                replyID,
                image: image,
                imagePath: imagePath,
                is_audio: is_audio,
                duration: duration,
                is_tipo: is_tipo
            };
    
            chat.push(newChat);
    }

    const sendChatMessage2 = (contactId, message, reply = false, replyID = false, image = false, imagePath = false, sent = true, id= 9999, is_audio=false, duration = "00:00") => {
        const today = new Date();
        const currentTime = `${ today.getHours() < 10 ? `0${ today.getHours() }` : today.getHours() }:${ today.getMinutes() < 10 ? `0${ today.getMinutes() }` : today.getMinutes() }`;
    
    
            const newChat = {
    
                id: id,
                preview: message,
                received: false,
                sent: sent,
                date: currentTime,
                read: true,
                starred: false,
                reply,
                replyID,
                image: image,
                imagePath: imagePath,
                is_audio: is_audio,
                duration: duration
            };
        
            chat.unshift(newChat);	
    }

    const deleteMessage = (contactId) => {
        chat.pop()
    }


    const scrollToBottom = async () => { contentRef.current.scrollToBottom();}
    

    const widthAnimation = {
        property: "width",
        fromValue: "110%",
        toValue: "100%"
    };

    const fadeAnimation = {
        property: "opacity",
        fromValue: "100%",
        toValue: "0%"
    };

    const sideButtonsAnimation = {
        duration: 200,
        direction: showSendButton ? "normal" : "reverse",
        iterations: "1",
        fromTo: [ fadeAnimation ],
        easing: "ease-in-out"
    };

    const sendButtonAnimation = {
        duration: showSendButton ? 300 : 100,
        direction: !showSendButton ? "normal" : "reverse",
        iterations: "1",
        fromTo: [ fadeAnimation ],
        easing: "ease-in-out"
    };

    const sendAudioAnimation = {
        duration: showSendButton ? 300 : 100,
        direction: !showSendButton ? "normal" : "reverse",
        iterations: "1",
        fromTo: [ fadeAnimation ],
        easing: "ease-in-out"
    };

    const textareaAnimation = {
        duration: 1,
        direction: !showSendButton ? "normal" : "reverse",
        iterations: "1",
        fromTo: [ widthAnimation ],
        easing: "ease-in-out"
    };
    
    //  Set the state value when message val changes
    useEffect(() => {
        setShowSendButton(message !== "");
    }, [ message ]);

    //  Play the animations when the state value changes
    useEffect(() => {
        textareaRef.current.animation.play();
        sideRef.current.animation.play();
        sendRef.current.animation.play();
    }, [ showSendButton ]);

    //  Set the state value when message val changes
    useEffect(() => {
        VoiceRecorder.requestAudioRecordingPermission().then((result) => console.log(result.value))
        generateItems();
    }, [  ]);

    const sendMessage = async (image = false, imagePath = false) => {
        if (message !== "" || image === true) {
  
            try {    
                    const contexto=""
                    const respuesta_tipo= "Escribiendo..."
                    sendChatMessage(false,1, message, replyToMessage, replyToMessage ? replyToMessage.id : false, image, imagePath);
                    sendChatMessage(true,1, respuesta_tipo, replyToMessage, false,  image, imagePath,false);
                    setMessage("");
                    setMessageSent(true);

                    setTimeout(() => setMessageSent(false), 10);
                    image && setTimeout(() => scrollToBottom(), 100);

                    try {
                        const message_received = await SendMessageController(message,'false',"00:00",contexto)
                        deleteMessage(1)
                        sendChatMessage(false, 1, message_received, replyToMessage, false,  image, imagePath,false);
                        setMessage("");
                    
                        setMessageSent(false);
                        setTimeout(() => setMessageSent(true), 10);
                        image && setTimeout(() => scrollToBottom(), 100);
                    }
                    
                    catch (error) {
                        console.log('ocurrio un error')
                        console.log(error);
                        
                    }


                }
                catch (error) {
                    console.error('ERROR al enviar los datos:', error);
                }
        }
    }

    const calculateDuration = () => {
        VoiceRecorder.getCurrentStatus()
        .then((result) => {
            const status = result.status

            if(status=='NONE'|| status=='PAUSED'){
                clearInterval();
                variableTest =0
                setShowSendAudioButton(false)
                return;
            }
            variableTest +=1
            const minutes = Math.floor(variableTest/60)
            const seconds = (variableTest % 60).toString().padStart(2,'0')
            setDurationDisplay(minutes+':'+seconds)
            
            setTimeout(() =>{
                calculateDuration();
            },1000)
        })
        .catch(error => console.log(error))
        setShowSendAudioButton(true)

    }

    const sendAudio = async (image = false, imagePath = false) => {
        setShowSendAudioButton(false)
        VoiceRecorder.stopRecording()
        .then(async (result) => {
            console.log(result)
            if(result.value && result.value.recordDataBase64){
                try {
                    const message= result.value.recordDataBase64;
                    const respuesta_tipo= "Escribiendo..."
                    sendChatMessage(false, 1, message, replyToMessage, replyToMessage ? replyToMessage.id : false, image, imagePath, true, 9999, true,durationDisplay);
                    sendChatMessage(true, 1, respuesta_tipo, replyToMessage, false,  image, imagePath,false);

                    setMessage("");
                
                    setMessageSent(true);
                    setTimeout(() => setMessageSent(false), 10);
                    image && setTimeout(() => scrollToBottom(), 100);

                    const message_received = await SendMessageController(message,'true',durationDisplay,"")
                    
                    deleteMessage(1);
                    sendChatMessage(false, 1, message_received, replyToMessage, false, image, imagePath,false, 9999, false);
                    setMessage("");
                
                    setMessageSent(false);
                    setTimeout(() => setMessageSent(true), 10);
                    image && setTimeout(() => scrollToBottom(), 100);
                }

                catch (error) {
                    console.error('ERROR al enviar los datos:', error);
                  }
            }
        })
        .catch(error => {
            console.log('error')
            console.log(error)
        })
    }

    const playAudio = async () => {
        VoiceRecorder.startRecording()
        .then((result) =>{calculateDuration();})
        .catch(error => console.log(error))
        setShowSendAudioButton(true)
    }

    const stopAudio = async () => {
        VoiceRecorder.stopRecording()
        .then((result) => {setShowSendAudioButton(false)})
        .catch(error => console.log(error))
    }

    const generateItems = async () => {
        if(!booleanScroll) return;
        setBooleanScroll(false)
        let messages= await GetMesssagesController(offset);
        if(messages.length==0) return;
        if(offset>0) messages.reverse();
        for (let i=messages.length - 1; i >= 0; i--) {
            let elemento=messages[i]
            let sent = elemento['received']
            let id = elemento['id']
            let is_audio = elemento['is_audio']
            let duration = elemento['duration']
            let message = elemento['content']
            if(is_audio == true) message = elemento['audioEncode64']

            if(offset ==0) sendChatMessage(false, 1, message, false, replyToMessage ? replyToMessage.id : false, '', '',!sent,id,is_audio,duration);
            else         sendChatMessage2(1, message, false, replyToMessage ? replyToMessage.id : false, '', '',!sent,id,is_audio,duration);
        }

        if(offset==0) {
            setTimeout(() => scrollToBottom(), 100);
            setTimeout(() => setMessageSent(true), 10);
        }
        

        setOffset(offset+10)
        setBooleanScroll(true)
    };


    return (

        <IonPage className="chat-page">

            <IonContent id="main-chat-content" ref={ contentRef }>

            <IonList className="asdasd">
                    { chat.map((message, index) => {
                        return (
                            <div ref={ ref => swiperRefs.current[index] = ref } id={ `chatBubble_${ message.id }`} key={ index } className={ `chat-bubble ${ message.sent ? "bubble-sent" : "bubble-received" }` }>
                                <div id={ `chatText_${ message.id }`}>


                                <div className="chat-message-data">
                                   { !message.sent && <img className="chat-contact-img" src="/assets/ezgif.com-webp-to-png.png" alt="avatar" />}
                                   { message.sent && <img className="chat-contact-img" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="avatar" />}

                                    <div>
                                        { !message.sent &&  
                                        <div className="header-chat-webis">
                                            <div className="color-blue"><strong>Webis</strong></div>
                                        </div>}
                                        { message.sent && <div className="color-blue2"><strong>Tú</strong></div>}
                                        { !message.is_audio && !message.is_tipo &&  message.preview }
                                        { !message.is_audio && message.is_tipo &&  <i className="italic-message-tipo"> {message.preview} </i> }
                                        
                                        { message.is_audio &&  <div className="chat-contact-contet-data"> 
                                            <PlayButton base64Sound={message.preview}/>
                                            <img className="chat-contact-img-2" src="/assets/image.png" alt="avatar" />
                                        </div>}
                                    
                                        <ChatBottomDetails message={ message }/>
                                    </div>
                                </div>
                            
                                </div>

                                <div className={ `bubble-arrow ${ message.sent && "alt" }` }></div>
                            </div>
                        );
                    })}
            </IonList>

            <IonInfiniteScroll position= 'top'
            threshold="1%"
                    onIonInfinite={(ev) => {
                    generateItems();
                    setTimeout(() => ev.target.complete(), 3000);
                    }}>
                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
            </IonInfiniteScroll>


          
                    </IonContent>


            <IonFooter className="chat-footer" id="chat-footer">
                <IonGrid>
                    <IonRow className="ion-align-items-center">
                    {showSendAudioButton && 
                            <CreateAnimation ref={ sideRef } { ...sideButtonsAnimation }>
                                <IonCol size="1">
                                    <IonIcon icon={ trash } color="black" onClick={ stopAudio } />
                                </IonCol>
                            </CreateAnimation>
                            }

                        <div className="chat-input-container">
                        {!showSendAudioButton && 
                            <CreateAnimation ref={ textareaRef } { ...textareaAnimation }>
                                <IonTextarea rows="1" value={ message } onInput={ e => setMessage(e.target.value) }  />
                            </CreateAnimation>
                            }


                            {showSendAudioButton && 
        
                            <CreateAnimation ref={ textareaRef } { ...textareaAnimation }>
                                <IonTextarea rows="1" value={ durationDisplay } />
                            </CreateAnimation>
                            }
                        </div>

                        {!showSendAudioButton &&  <CreateAnimation ref={ sideRef } { ...sideButtonsAnimation }>
                            <IonCol size="1">
                                <IonIcon icon={ micOutline } color="black" onClick={ playAudio } />
                            </IonCol>
                        
                        </CreateAnimation>
                        }

                        <CreateAnimation ref={ sendRef } { ...sendButtonAnimation }>
                            <IonCol size="1" className="chat-send-button" onClick={ sendMessage }>
                                <IonIcon icon={ send } />
                            </IonCol>
                        </CreateAnimation>

                        {showSendAudioButton && 
                        <CreateAnimation { ...sendAudioAnimation }>
                            <IonCol size="1" className="chat-send-button" onClick={ sendAudio }>
                                <IonIcon icon={ send } />
                            </IonCol>
                        </CreateAnimation>
                        }
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonPage>
        
    );
}

export default Chat;