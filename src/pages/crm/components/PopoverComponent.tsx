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

import { micOutline, micOffOutline } from "ionicons/icons";
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';


interface ScanNewProps {
    refer: any,
    popoverMail: any,
    setPopoverOpenMail: any,
    setSubject: any,
    setTextMail: any,
    sendMail: any,
    recording: any,
    setRecording: any,
    setTextoConvertido: any,
    textoConvertido: string
}


const PopoverComponent: React.FC<ScanNewProps> = ({ 
    refer, popoverMail, setPopoverOpenMail, setSubject, setTextMail, 
    sendMail, recording, setRecording, setTextoConvertido, textoConvertido
}) => {

    const [canUseRecorder, setCanUseRecorder] = useState(false);
    const [textoRedactado, setTextoRedactado] = useState('');
    const [showText, setShowText] = useState(false);
    const [tipoMail, setTipoMail] = useState('redactar');
    const [mostrarEspera, setMostrarEspera] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);

    const [tokenLogin, setTokenLogin] = useState('');


    // Cuando el correo está redactado por la IA: se muestra el textarea 
    useEffect(() => {
        if (textoConvertido.length > 0 && tipoMail === "grabar") {
            setShowText(true);
            returnTextoConvertido();
        }
    }, [textoConvertido]);


    useEffect(() => {
        returnTextoConvertido();
    }, [tipoMail]);


    const returnCSSclass = () => {
        if (textoConvertido.length > 0 && tipoMail === "grabar") {
            return 'popup-email-with-text';
        } else {
            return 'popup-email';
        }
    }

    const returnErrorGeneral = () => {
        if (mostrarError) {
            return (
                <IonRow>
                    <IonCol className="md-centered2">
                        <div>
                            <p className="crm-messages">Por favor, vuelva a grabar hablando claro y alto.</p>
                        </div>
                    </IonCol>
                </IonRow>
            );
        }
        return <></>;        
    }


    const returnIcon = (recording: boolean) => {
        if (recording) {
            return <IonIcon icon={micOffOutline} />
        }
        return <IonIcon icon={micOutline} />;
    }

    const returnTextoConvertido = () => {
        if (textoConvertido.length > 0 && tipoMail === "grabar") {
            return ( <IonItem>
                        <IonTextarea
                            onIonInput={(e: any) => setTextoConvertido(e.target.value)}
                            fill="outline"
                            value={textoConvertido}
                            autoGrow={true}
                        ></IonTextarea>
                    </IonItem> );
        }
        return <></>;
    }

    const returnBotonEnviar = () => {
        if (textoConvertido.length > 0) {
            return (<IonButton className="button-send-email" onClick={sendMail}>
                Enviar correo
            </IonButton>);
        }

        return <></>;
    }

    const activateActionRecording = (e: BaseSyntheticEvent) => {
        if (!recording) {
            startRecording(e);
        } else {
            stopRecording(e);
        }
        setRecording(!recording);
    }

    const AskPermissionRecording = async (e: BaseSyntheticEvent) => {
        if (!canUseRecorder) {

            await VoiceRecorder.requestAudioRecordingPermission().then((result: GenericResponse) => {
                if (result.value) {
                    activateActionRecording(e);
                }
            });

        } else {
            activateActionRecording(e);
        }
    }

    const canDeviceVoiceRecord = async (e: BaseSyntheticEvent) => {
        VoiceRecorder.canDeviceVoiceRecord().then((result: GenericResponse) => console.log(result.value))
    }

    const startRecording = async (e: BaseSyntheticEvent) => { 
        VoiceRecorder.startRecording()
        .then((result: GenericResponse) => console.log(result.value))
        .catch((error: any) => console.log(error))
    }

    const stopRecording = async (e: BaseSyntheticEvent) => {
        VoiceRecorder.stopRecording()
        .then(async (result: RecordingData) => {

            if(result.value && result.value.recordDataBase64) {

                setMostrarEspera(true);

                axios({
                    method: 'POST',
                    url: 'https://ag-ppal-001.webis.io/gateway/auth/login',
                    headers: {
                        'basic_auth': '$2a$15$XkweBAqjwQD/BnxjbCF8geKi0u4svAqR/hM2juOPp3N4W3R2zEuXW',
                    }
                }).then((respon: any) => {

                    const token = respon.data.token;
                    setTokenLogin(token);

                    axios({
                        method: 'POST',
                        url: 'https://ag-ppal-001.webis.io/gateway/salesforce/speechIa',
                        headers: {
                            'authorization': 'Bearer ' + token,
                            'app_id': 'salesforce',
                        },
                        data: {
                            'content': result.value.recordDataBase64,
                        }
                    }).then((response: any) => {
                        setTextoConvertido(response.data);
                        setMostrarEspera(false);
                        setMostrarError(false);

                    }).catch((error: any) => {
                        setMostrarEspera(false);
                        setMostrarError(true);

                        // if (error.code == "ERR_BAD_REQUEST") {
                        //     setMostrarError(true);
                        // }                
                    });

                }).catch((error: any) => 
                {
                    console.log(error)
                })
            }
        })
        .catch((error: any) => 
          {
            console.log('error')
            console.log(error)
          })
    }

    const returnTypeOfSend = () => {

        if (tipoMail === "redactar") {
            return (
                <>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Título del correo</IonLabel>
                                <IonInput type="text" onIonInput={(e: any) => setSubject(e.target.value)}></IonInput>
                            </IonItem>
                            <IonItem>
                                      <IonTextarea
                                        onIonInput={(e: any) => setTextMail(e.target.value)}
                                        label="Outline textarea"
                                        labelPlacement="floating"
                                        fill="outline"
                                      ></IonTextarea>
                            </IonItem>
                            
                        </IonCol>
                    </IonRow>
                </>
            );
        }

        return (<>
            <IonRow>
                <IonCol className="md-centered2">
                    <div>
                        <p className="crm-messages">Grabe el asunto de su correo alto y claro</p>
                    </div>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol className="md-centered2">
                    <IonButton className="button-record" onClick={AskPermissionRecording}>
                        {returnIcon(recording)}
                    </IonButton>
                </IonCol>
            </IonRow>
            {returnErrorGeneral()}
        </>);
    }


    const returnMensajeDeEspera = () => {
        if (mostrarEspera) {
            return  (<IonRow>
                        <IonCol className="md-centered2">
                            <div>
                                <p className="crm-messages">Generando su mail a través de inteligencia artificial...</p>
                            </div>
                        </IonCol>
                    </IonRow>);
        }

        return <></>;
    }


    return (
        <IonPopover ref={refer} isOpen={popoverMail} className={returnCSSclass()} trigger="top-center" side="top" alignment="center" onDidDismiss={() => setPopoverOpenMail(false)}>
            <IonContent class="ion-padding popup-content">

                <IonRow>
                    <IonCol className="md-centered2">
                        <IonButton className={tipoMail == 'redactar' ? 'button-send-email-active' : 'button-send-email'} onClick={() => setTipoMail('redactar')}>Redactar</IonButton>
                    </IonCol>
                    <IonCol className="md-centered2">
                        <IonButton className={tipoMail == 'grabar' ? 'button-send-email-active' : 'button-send-email'} onClick={() => setTipoMail('grabar')}>Grabar</IonButton>
                    </IonCol>
                </IonRow>

                {returnTypeOfSend()}

                {returnMensajeDeEspera()}

                <IonRow>
                    <IonCol>
                        {returnTextoConvertido()}
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol className="md-centered2">
                        {returnBotonEnviar()}
                    </IonCol>
                </IonRow>

            </IonContent>
        </IonPopover>
    );
};

export default PopoverComponent;