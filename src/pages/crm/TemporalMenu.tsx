import React, {useState, useEffect} from 'react';
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonLabel,
    IonText,
    IonImg,
    IonIcon,
    IonButton,
} from '@ionic/react';
import {useLocation} from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import HeaderComponent from './components/HeaderComponent';
import RenderInputsCRMComponent from './components/RenderInputsCRMComponent';


const TemporalMenu: React.FC = () => {



    return (
        <IonPage>
            <IonContent>
                <IonGrid className="ion-text-center ion-padding">

                    <HeaderComponent path="/login" data={[]} />


                    <IonRow>
                        <IonCol>
                            <Link 
                                to={{ 
                                    pathname: "/generarCorreo",
                                }}>
                                <IonButton className="ion-margin-top" expand="block">Correos por IA</IonButton>
                            </Link>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <Link 
                                to={{ 
                                    pathname: "/view-chat/1",
                                }}>
                                <IonButton className="ion-margin-top" expand="block">Chat</IonButton>
                            </Link>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <Link 
                                to={{ 
                                    pathname: "/textract",
                                }}>
                                <IonButton className="ion-margin-top" expand="block">Textract</IonButton>
                            </Link>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default TemporalMenu;

