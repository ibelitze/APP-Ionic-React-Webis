import React, { useState } from "react";
import { IonCol, IonIcon } from "@ionic/react";
import { play, stop } from "ionicons/icons";

export const PlayButton = ({ base64Sound }) => {
  const [icon, setIcon] = useState("play");
  const [audio, setAudio] = useState(new Audio(`data:audio/aac;base64,${base64Sound}`));

  
  audio.onended = () => {
    setIcon("play");
  };

  const handleClick = async () => {
    if (audio.paused) {
      audio.oncanplaythrough = () => {
        setIcon("stop");
        audio.play();
      };
    } 
    
    else {
      audio.oncanplaythrough = () => {
        setIcon("play");
        audio.pause();
      };
    }

    audio.load();
  };

  return (
    <div className="chat-play-button-2" >
      <IonCol className="chat-play-button" onClick={handleClick}>
        { icon == "play" &&      <IonIcon icon={play} /> }
        { icon == "stop" &&      <IonIcon icon={stop} /> }
      </IonCol>
    </div>
  );
};