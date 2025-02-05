import React, {BaseSyntheticEvent, useState, useEffect} from 'react';
import {
    IonRow,
    IonCol,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonPopover,
    IonTextarea,
    IonButton,
    IonIcon,
} from '@ionic/react';
import axios from 'axios';

import { happyOutline } from "ionicons/icons";


interface ScanNewProps {
    refer: any,
    popoverOpenMessages: boolean,
    setPopoverOpenMessages: any
}


const PopoverMessagesComponent: React.FC<ScanNewProps> = ({ 
    refer, popoverOpenMessages, setPopoverOpenMessages
}) => {

    const [canUseRecorder, setCanUseRecorder] = useState(false);


    return (
        <IonPopover 
			ref={refer} 
			isOpen={popoverOpenMessages}
			className="popup-email" 
			trigger="top-center" 
			side="top" 
			alignment="center" 
			onDidDismiss={() => setPopoverOpenMessages(false)}>
            <IonContent class="ion-padding popup-content">

                <IonRow>
                    <IonCol className="md-centered2">
                        <IonIcon className="ionicon-big" icon={happyOutline} />
                    </IonCol>
                </IonRow>
                <IonRow>
					<IonCol className="md-centered2">
						<div>
							<h1 className="crm-messages" style={{textAlign: "center"}}>{"Correos enviados satisfactoriamente"}</h1>
						</div>
					</IonCol>
                </IonRow>

            </IonContent>
        </IonPopover>
    );
};

export default PopoverMessagesComponent;