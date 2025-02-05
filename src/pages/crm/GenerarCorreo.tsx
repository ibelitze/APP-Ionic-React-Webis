import React, {BaseSyntheticEvent, useState, useEffect, useRef} from 'react';
import {
    IonPage,
    IonRow,
    IonCol,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonPopover,
    IonText,
    IonTextarea,
    IonButton,
    IonIcon,
} from '@ionic/react';
import '@ionic/react/css/core.css';
import moment from 'moment';
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import axios from 'axios';
import { useStopwatch } from 'react-timer-hook';
import HeaderComponent from './components/HeaderComponent';
import PopoverMessagesComponent from './components/PopoverMessagesComponent';
import PlayButtonTextToSpeech from './components/TextToSpeechComponent';
import LoadingComponent from './components/LoadingComponent';

// importando código para obtener email del usuario actual
import { get } from "../../backend/Auth/models/SessionVariable"; 

import './CssCRM.css';

import { micOutline, micOffOutline, caretForwardCircleOutline } from "ionicons/icons";
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';



const GenerarCorreo: React.FC = () => {

    // const { contacts } = useLocation();

    // traducción a diferentes idiomas
    const { t, i18n } = useTranslation(['translation']);

    const location = useLocation();
    const [dataState, setdataState] = useState<any>(location.state);

    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        reset,
      } = useStopwatch({ autoStart: false });

    // popup
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const [canUseRecorder, setCanUseRecorder] = useState(false);
    const [textoRedactado, setTextoRedactado] = useState("");
    const [showText, setShowText] = useState(false);

    const [mostrarEspera, setMostrarEspera] = useState(false);
    const [mostrarError, setMostrarError] = useState(false);

    // mostrar loading
    const [loading, setLoading] = useState(false);

    // correo redactado por la IA
    const [editandoCorreo, setEditandoCorreo] = useState(false);
    const [subject, setSubject] = useState("");
    const [textoConvertido, setTextoConvertido] = useState("");
    const [textoParaCorreo, setTextoParaCorreo] = useState("");
    const [arrayMensajes, setArrayMensajes] = useState<any>();

    // para icono de reproducir (voz de la IA)
    const [icon, setIcon] = useState("play");

    // tokens de los logins en api gateway y salesforce
    const [gatewayToken, setGatewayToken] = useState('');
    const [salesforceToken, setSalesforceToken] = useState('');

    // Boolean para saber si se está grabando o no.
    const [recording, setRecording] = useState(false);


    useEffect(() => {
        axios({
            method: 'POST',
            url: 'https://ag-ppal-001.webis.io/gateway/auth/login',
            headers: {
                'basic_auth': '$2a$15$XkweBAqjwQD/BnxjbCF8geKi0u4svAqR/hM2juOPp3N4W3R2zEuXW',
            }
        }).then((response: any) => {
            const token = response.data.token;
            setGatewayToken(token);

            axios({
                method: 'POST',
                url: 'https://ag-ppal-001.webis.io/gateway/crm/getclientandlogin',
                headers: {
                    'authorization': 'Bearer ' + token,
                    'app_id': 'salesforce'
                },
                data: {
                    id: "a45671795f4f4bc7b0ddcfc4d6fb4d40",
                    url: "https://webtiginoso-dev-ed.develop.my.salesforce.com"
                },
            }).then((response: any) => {

                const tokenSalesforce = response.data.access_token;
                setSalesforceToken(tokenSalesforce);

            }).catch((error: any) => {
                console.log('Error al intentar obtener los contactos');  
            });

        }).catch((error: any) => {
            console.log('Error al intentar loguearse');  
        });
    }, []);


    // Cuando el correo está redactado por la IA: se muestra el textarea 
    useEffect(() => {
        if (textoConvertido.length > 0) {
            setShowText(true);
            returnTextoConvertido();

            // guardamos el correo en un obj (como contexto)
            const temp = {
                'contexto': textoConvertido,
                'peticion': "",
            };
            setArrayMensajes(temp);
        }
    }, [textoConvertido]);


    const returnErrorGeneral = () => {
        if (mostrarError) {
            return (
                <IonRow>
                    <IonCol className="md-centered2">
                        <div>
                            <p className="crm-messages">{t('mails.error')}</p>
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
        if (textoConvertido.length > 0 && editandoCorreo) {
            return ( 
                <>
                    <IonItem>
                        <IonInput label="Título del correo" labelPlacement="stacked" type="text" onIonInput={(e: any) => setSubject(e.target.value)}></IonInput>
                    </IonItem>
                    <IonTextarea
                        labelPlacement="stacked"
                        label="Mensaje"
                        onIonInput={(e: any) => setTextoConvertido(e.target.value)}
                        fill="outline"
                        value={textoConvertido}
                        autoGrow={true}
                    ></IonTextarea>
                    <div className="md-centered2 md-margin">
                        <IonButton 
                            className="button-editar-mail"
                            onClick={() => { 
                                const temp = !editandoCorreo;
                                setEditandoCorreo(temp);
                            }}
                        >Finalizar</IonButton> 
                    </div>
                </>
            );
        }
        else if (textoConvertido.length > 0 && !editandoCorreo) {
            return ( 
                <div className="bubble">
                    <p className="bubble-text">{textoConvertido}</p>

                    <div className="bubble-actions">
                        <IonButton 
                            className="button-editar-mail"
                            onClick={() => { 
                                const temp = !editandoCorreo;
                                setEditandoCorreo(temp);
                            }}
                        >Editar</IonButton>
                        <PlayButtonTextToSpeech text={textoConvertido} /> 
                    </div>
                </div>
            );
        }
        return <></>;
    }

    const returnBotonEnviar = () => {
        if (textoConvertido.length > 0 && !editandoCorreo) {
            return (<IonButton className="button-send-email" onClick={sendMail}>
                Enviar correo
            </IonButton>);
        }

        return <></>;
    }

    const activateActionRecording = (e: BaseSyntheticEvent) => {
        if (!recording) {
            startRecording(e);
            start();
        } else {
            stopRecording(e);
            reset();
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
        setMostrarError(false);
        VoiceRecorder.startRecording()
        .then((result: GenericResponse) => console.log(result.value))
        .catch((error: any) => console.log(error))
    }

    const stopRecording = async (e: BaseSyntheticEvent) => {
        VoiceRecorder.stopRecording()
        .then(async (result: RecordingData) => {

            if(result.value && result.value.recordDataBase64) {

                setMostrarEspera(true);
                setLoading(true);
                let peticion = "";

                if (textoConvertido.length > 0) {
                    peticion = "¿Puedes corregir este correo?: (" + textoConvertido + "). Necesito que lo corrijas bajo las siguientes instrucciones: ";
                } else {
                    peticion = "Hola, necesito redactar un correo de máximo 80 palabras, sobre lo siguiente: ";
                }

                axios({
                    method: 'POST',
                    url: 'https://ag-ppal-001.webis.io/gateway/salesforce/speechIa',
                    headers: {
                        'authorization': 'Bearer ' + gatewayToken,
                        'app_id': 'salesforce',
                    },
                    data: {
                        'content': result.value.recordDataBase64,
                        'peticion': peticion,
                    }
                }).then((response: any) => {
                    const temporal = response.data.replace(/\n/g, '<br>');
                    setTextoParaCorreo(temporal);

                    setTextoConvertido(response.data);
                    setMostrarEspera(false);
                    setMostrarError(false);
                    setLoading(false);

                }).catch((error: any) => {
                    console.log(error);
                    setMostrarEspera(false);
                    setMostrarError(true);  
                    setLoading(false);
                });
            }
        })
        .catch((error: any) => 
          {
            console.log(error);
        })
    }

    const returnMensajeDeEspera = () => {
        if (mostrarEspera) {
            return  (<IonRow>
                        <IonCol className="md-centered2">
                            <p style={{textAlign: "center"}} className="crm-messages">{t('mails.creating')}</p>
                        </IonCol>
                    </IonRow>);
        }

        return <></>;
    }

    // Función que envía finalmente el correo electrónico, basado en los contactos seleccionados
    const sendMail = async (e: BaseSyntheticEvent) => {
        // const finals = dataState.contacts.filter((el: any) => {
        //     if (el.checked) {return true;} return false;
        // });
        // const emailArr : any[] = [];
        // // generar un array con los emails (contactos)

        // finals.forEach((contc: any) => {
        //     if (contc.Email) {
        //         emailArr.push(contc.Email);
        //     }
        // });
        // const emailAddrss = emailArr.join(',');
        
        try {

            const arr = [];
            const email = await get('email');

            if (email) {
                console.log(email);
                arr.push(email);

                axios({
                    method: 'POST',
                    url: 'https://ag-ppal-001.webis.io/gateway/salesforce/sendEmails',
                    headers: {
                        'access_token': salesforceToken,
                        'url': 'https://webtiginoso-dev-ed.develop.my.salesforce.com',
                        'authorization': 'Bearer ' + gatewayToken,
                        'app_id': 'salesforce'
                    },
                    data: {
                        "emailBody": textoParaCorreo,
                        "emailAddresses": email,
                        "emailSubject": "Generado por IA + Webis"
                    }
                }).then((response: any) => {

                    // aquii
                    setPopoverOpen(true);
                    console.log("se ha enviado el correo correctamente");

                }).catch((error: any) => {
                    console.log(error);
                });
            }
            else {
                console.log("no hay mail registrado");
                setPopoverOpen(true);
            }

            // axios({
            //     method: 'POST',
            //     url: 'https://ag-ppal-001.webis.io/gateway/salesforce/sendEmails',
            //     headers: {
            //         'access_token': dataState.crm,
            //         'url': 'https://webtiginoso-dev-ed.develop.my.salesforce.com',
            //         'authorization': 'Bearer ' + gatewayToken,
            //         'app_id': 'salesforce'
            //     },
            //     data: {
            //         "emailBody": textoParaCorreo,
            //         "emailAddresses": emailAddrss,
            //         "emailSubject": "Generado por IA + Webis"
            //     }
            // }).then((response: any) => {

            //     // aquii
            //     setPopoverOpen(true);

            // }).catch((error: any) => {
            //     console.log(error);
            // });

            // setPopoverOpen(true);


        } catch (e) {
            console.log(e);
        }

    }

    const returnLoading = () => {
        if (loading) { return <LoadingComponent /> } else { return <></> }
    }

    const returnSegundero = () => {
        if (recording) {
            return (
                <IonRow>
                    <IonCol className="md-centered2">
                        <p>{minutes + ":" + seconds}</p>
                    </IonCol>
                </IonRow>
            );
        } else {
            return <></>;
        }
    }

    return (
        <IonPage>
            <IonContent>

                    {/* HEADER */}
                    <IonRow className="header-sticky">
                        <div className="sticky-content">
                            
                            <HeaderComponent path="/temporal-menu" data={""} />

                            {/* Título básico + traducciones */}
                            <IonRow>
                                <IonCol>
                                    <p className="titulo">
                                        <IonText color="primary">{t('mails.title')}</IonText>
                                    </p>
                                </IonCol>
                            </IonRow>
                        </div>
                    </IonRow>

                    {/* POPUP de mensajes */}
                    <PopoverMessagesComponent 
                        refer={popover}
                        popoverOpenMessages={popoverOpen}
                        setPopoverOpenMessages={setPopoverOpen}
                    />

                    <IonRow>
                        <IonCol className="md-centered2">
                            <p className="crm-messages" style={{ textAlign: "center" }}>{
                                    textoConvertido.length > 0 ? t('mails.editing') : t('mails.generating')
                            }</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="md-centered2">
                            <IonButton className={recording ? "button-recording" : "button-recordless"} onClick={AskPermissionRecording}>
                                {returnIcon(recording)}
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    {returnSegundero()}

                    {returnMensajeDeEspera()}
                    {returnLoading()}
                    {returnErrorGeneral()}

                    <IonRow>
                        <IonCol className="md-padding">
                            {returnTextoConvertido()}
                        </IonCol>
                    </IonRow>


                    <IonRow>
                        <IonCol className="md-centered2">
                            {returnBotonEnviar()}
                        </IonCol>
                    </IonRow>

                    


            </IonContent>
        </IonPage>
    );
};

export default GenerarCorreo;