import React, {useState, useEffect} from 'react';
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonImg,
    IonIcon,
} from '@ionic/react';
import { arrowBackOutline, arrowForward } from "ionicons/icons";
import { Link } from "react-router-dom";
import GetAllCRM from "../../backend/crm/getDataCRM";
import './CssCRM.css';
import { useTranslation } from 'react-i18next';
import HeaderComponent from './components/HeaderComponent';
import RenderCRMComponent from './components/RenderCRMComponent';
import axios from 'axios';

const Config: React.FC = () => {

    const { t, i18n } = useTranslation(['translation']);

    const data = [
        {id: "1", nombre: "Hubspot"},
        {id: "2", nombre: "Brevo"},
        {id: "3", nombre: "Salesforce"},
        {id: "4", nombre: "Dynamics"},
        {id: "5", nombre: "Zoho"},
    ];
    const [dataCRM, setDataCRM] = useState(data);

    /* usamos (de momento no pongo la real) la llamada GET para obtener todos los CRMs */
    useEffect(() => {
        // const data = GetAllCRM().then((dat) => {
        //     console.log(dat);
        // });
    }, []);

    return (
        <IonPage>
        <IonContent>
            <IonGrid className="ion-text-center ion-padding">

                <HeaderComponent path="/temporal-menu" data="" />

                {/* content */}
                <IonRow>
                    <IonCol>
                        <p className="titulo">
                            <IonText color="primary">{t('crm.title')}</IonText>
                        </p>
                        <p className="seleccionar">
                            <IonText>{t('crm.info')}</IonText>
                        </p>
                    </IonCol>
                </IonRow>

                {/* Usamos el componente que creamos abajo para renderizar los CRMs */}
                <RenderCRMComponent data={dataCRM} />

            </IonGrid>
        </IonContent>
        </IonPage>
    );
}

export default Config;


