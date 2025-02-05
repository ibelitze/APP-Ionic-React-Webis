import React, {useState, useEffect, BaseSyntheticEvent} from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonItem, 
     IonButton, IonText, IonIcon, IonGrid } from '@ionic/react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { folderOpenOutline, cameraOutline } from "ionicons/icons";
import HeaderComponent from '../crm/components/HeaderComponent';
import LoadingComponentConMensaje from './components/LoadingComponentConMensaje';
import MostrarErrorComponent from './components/MostrarErrorComponent';

// capacitor - camara
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import './TextractCSS.css';

const Textract: React.FC = () => {

    // traducción a diferentes idiomas
    const { t, i18n } = useTranslation(['translation']);

    const [selectedImage, setSelectedImage] = useState<File>();
    const [imageCamera, setImageCamera] = useState<File>();

    // tipos: documento o foto
    const [tipoDocumento, setTipoDocumento] = useState("documento");

    // tipos: documento o formulario
    const [tipoVisualizacion, setTipoVisualizacion] = useState("documento");

    const [espera, setEspera] = useState(false);
    const [error, setError] = useState({ existe: false, tipo: '' });

    // texto extraído por textract
    const [keyData, setKeyData] = useState<any[]>([]);
    const [lineas, setLineas] = useState<any[]>([]);
    const [palabras, setPalabras] = useState<any[]>([]);

    // token de login en api gateway
    const [gatewayToken, setGatewayToken] = useState('');


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
            console.log('logueado bien');
            setError({ existe: false, tipo: "" });

        }).catch((error: any) => {
            console.log(error);  
        });
    }, []);


    const setImage = async (_event: any) => {
        setSelectedImage(_event.target.files[0]);
        setError({ existe: false, tipo: "" });

        const finalUrl = '/gateway/textract/analyzeForm';
        const form = new FormData();

        setEspera(true);
        setError({ existe: false, tipo: "" });

        if (_event.target.files[0]) {
            form.append('file', _event.target.files[0]);
        }
        else {
            setEspera(false);
            setError({ existe: true, tipo: t('textract.no-image') });
            return;
        }

        try {
            const config: AxiosRequestConfig = {
                method: 'POST',
                baseURL: 'https://ag-ppal-001.webis.io',
                url: finalUrl,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "authorization": 'Bearer ' + gatewayToken,
                    "app_id": "textract"
                },
                data: form,
            };
            const response: AxiosResponse = await axios(config);

            if (response) {
                setEspera(false);
                setLineas(response.data.lineas);
                setPalabras(response.data.palabras);

                // aquii
                if (response.data['key-values'] && Object.keys(response.data['key-values']).length > 3) {
                    const arr = [];
                    arr.push(response.data['key-values']);
                    setKeyData(arr);
                }
            }
        } catch(e) {
            console.log('no funciona el método');
        }

        setEspera(false);
    }

    const generarAleatorio = (length: number) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    const addNewToGallery = async () => {

        // funcionando
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Base64,
            allowEditing: false,
            source: CameraSource.Prompt,
            quality: 100
        });

        if (capturedPhoto) {

            setEspera(true);

            let aleatorio = generarAleatorio(10);
            aleatorio = aleatorio + ".png";

            const json = {
                'file': capturedPhoto.base64String,
                'mimetype': capturedPhoto.format,
                'originalname': aleatorio
            }

            const finalUrl = '/gateway/textract/analyzeForm';

            axios({
                method: 'POST',
                baseURL: 'https://ag-ppal-001.webis.io',
                url: finalUrl,
                headers: { 
                    "Content-Type": "application/json",
                    "authorization": 'Bearer ' + gatewayToken,
                    "app_id": "textract",
                    "type_image": "base64"
                },
                data: JSON.stringify(json),
            }).then((response: any) => {

                if (response.data) {

                    setLineas(response.data.lineas);
                    setPalabras(response.data.palabras);

                    // aquii
                    if (response.data['key-values'] && Object.keys(response.data['key-values']).length > 3) {
                        const arr = [];
                        arr.push(response.data['key-values']);
                        setKeyData(arr);
                    }
                    setEspera(false);
                }

            }).catch((error: any) => {
                console.log(error);  
            });


        }
        else {
            setError({ existe: true, tipo: t('textract.no-image') });
        }
        
    }

    const divAnalizador = () => {
        if (tipoDocumento == "documento") {

            let nombreImagen;

            if (selectedImage) {
                nombreImagen = (
                    <IonRow>
                        <IonCol className="md-centered">
                            <p>{ selectedImage.name }</p>
                        </IonCol>
                    </IonRow>
                );
            } else { nombreImagen = <></> }


            return (
                <>
                    <br></br>
                    <IonRow>
                        <IonCol className="md-centered">
                            <p className="crm-messages">Presione para subir imagen o pdf</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="md-centered">
                            <IonItem>
                                <input
                                    className="input-file"
                                    id="file-upload"
                                    type="file"
                                    name="myImage"
                                    onChange={setImage}
                                />
                                <IonButton className="button-archivo" onClick={() => {
                                    (document as any).getElementById("file-upload").click();
                                }}>
                                    <IonIcon icon={folderOpenOutline} />
                                </IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    {nombreImagen}
                </>
            );
        }
        else {

            return (
                <>
                    <br></br>
                    <IonRow>
                        <IonCol className="md-centered">
                            <p className="crm-messages">Presione para usar la cámara</p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="md-centered">
                            <IonItem>
                                <IonButton className="button-archivo" onClick={addNewToGallery}>
                                    <IonIcon icon={cameraOutline} />
                                </IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </>
            );
        }
    }

    const returnResultadoTexto = () => {
        if (tipoVisualizacion == "documento" && !espera && lineas && lineas.length > 0) {
            const temp = lineas.join(' ');
            return (
                <IonRow className="bubble">
                    <IonCol className="md-centered">
                        <IonItem>
                            <p className="bubble-text">{temp}</p>
                        </IonItem>
                    </IonCol>
                </IonRow>
            );
        }
        else {
            return <></>;
        }
    }

    const returnResultadoTabla = () => {
        if (tipoVisualizacion == "formulario" && !espera 
            && (keyData.length && Object.keys(keyData[0]).length > 0)) {

            const resultTable = Object.keys(keyData[0]).map((key, index) => {
                return (
                    <IonRow key={index}>
                        <IonCol className="ion-align-items-center">{key}</IonCol>
                        <IonCol className="wti_col ion-align-items-center">{keyData[0][key]}</IonCol>
                    </IonRow>
                );
            });

            return (
                <IonRow>
                    <IonGrid className="wti_table">
                        {resultTable}
                    </IonGrid>
                </IonRow>
            );
        }
        else if (tipoVisualizacion != "formulario") {
            return <></>;
        }
        else {
                return <IonRow className="bubble">
                    <IonCol className="md-centered">
                        <IonItem>
                            <p className="bubble-text">No hay datos en formato tabla</p>
                        </IonItem>
                    </IonCol>
                </IonRow>;
        }
    }


    const returnLoading = () => {
        if (espera) { return <LoadingComponentConMensaje mensaje={t('textract.process')} /> } else { return <></> }
    }

    const returnErrores = () => {
        if (error.existe) { 
            return <MostrarErrorComponent mensaje={error.tipo} /> 
        } else { return <></> }
    }

    const returnVisualizarResultado = () => {

        if (!espera && (lineas.length > 0 || keyData.length > 0)) {
            return (
                <IonRow>
                    <IonCol className="md-centered2">
                        <IonItem>
                            <div
                                className="button-visualizar"
                                onClick={(e: BaseSyntheticEvent) => {
                                    e.preventDefault();
                                    setError({ existe: false, tipo: "" });
                                    setTipoVisualizacion("documento");
                                }}
                            >
                                {t('textract.see-doc')}
                            </div>
                        </IonItem>
                    </IonCol>
                    <IonCol className="md-centered2">
                        <IonItem>
                            <div
                                className="button-visualizar"
                                onClick={(e: BaseSyntheticEvent) => {
                                    e.preventDefault();
                                    setError({ existe: false, tipo: "" });
                                    setTipoVisualizacion("formulario");
                                }}
                            >
                                {t('textract.see-form')}
                            </div>
                        </IonItem>
                    </IonCol>
                </IonRow>
            );
        }
    }

    return (
        <IonPage>
            <IonContent>
                {/* Header sticky */}
                <IonRow className="header-sticky">
                    <div className="sticky-content">
                        {/* HEADER */}
                        <HeaderComponent path="/temporal-menu" data={""} />

                        {/* Título básico + traducciones */}
                        <IonRow>
                            <IonCol>
                                <p className="titulo">
                                    <IonText color="primary">{t('textract.title')}</IonText>
                                </p>
                            </IonCol>
                        </IonRow>
                    </div>
                </IonRow>

                {/* Body */}
                <IonRow>
                    
                </IonRow>
                    <IonCol className="md-centered2" style={{ background: "#F7F7F7" }}>
                        <p className="crm-messages" style={{ textAlign: "center" }}>
                            Suba un pdf/imagen o tome una foto con la cámara para probar la extracción de texto.
                        </p>
                    </IonCol>
                <IonRow className="tab-margins">

                    <IonCol className="tab-margins">
                        <div    className={tipoDocumento == "documento" 
                                    ? "div-contenedor-tab fromRight" : "div-contenedor-tab" }
                                onClick={(e: any) => {
                                    setError({ existe: false, tipo: "" });
                                    setTipoDocumento("documento");
                                }}>
                            <div
                                className="button-menu">
                                <IonIcon icon={folderOpenOutline} />
                            </div>
                            <p className="crm-messages" style={{ textAlign: "center" }}>
                                Subir documento
                            </p>
                        </div>

                    </IonCol>
                    <IonCol className="tab-margins">
                        <div    className={tipoDocumento == "foto" 
                                    ? "div-contenedor-tab fromRight" : "div-contenedor-tab" }
                                onClick={(e: any) => {
                                    setError({ existe: false, tipo: "" });
                                    setTipoDocumento("foto");
                                }}>
                            <div className="button-menu">
                                <IonIcon icon={cameraOutline} />
                            </div>
                            <p className="crm-messages" style={{ textAlign: "center" }}>
                                Tomar foto
                            </p>
                        </div>
                    </IonCol>
                </IonRow>

                {divAnalizador()}

                {returnLoading()}

                {returnErrores()}

                {returnVisualizarResultado()}

                {returnResultadoTexto()}
                {returnResultadoTabla()}

            </IonContent>
        </IonPage>
    );
};

export default Textract;