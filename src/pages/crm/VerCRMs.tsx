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
    IonItem,
} from '@ionic/react';
import { addCircleOutline, arrowBackOutline, checkmark } from "ionicons/icons";
import { Link } from "react-router-dom";
import GetAllCRM from "../../backend/crm/getDataCRM";
import './CssCRM.css';
import HeaderComponent from './components/HeaderComponent';
import RenderCRMConfiguradosComponent from './components/RenderCRMConfiguradosComponent';
import { useTranslation } from 'react-i18next';
import {useLocation} from "react-router-dom";

interface AppState {
   value: any
}

const VerCRMs: React.FC = () => {

    const { t, i18n } = useTranslation(['translation']);
    const location = useLocation();

    const data = [
        {id: "1", nombre: "Hubspot"},
        {id: "2", nombre: "Brevo"},
        {id: "3", nombre: "Salesforce"},
        {id: "4", nombre: "Dynamics"},
        {id: "5", nombre: "Zoho"},
    ];
    const [dataCRM, setDataCRM] = useState(data);
    const [elegido, setElegido] = useState<any>(location.state);

    /* usamos (de momento no funciona) la llamada GET para obtener todos los CRMs */
    useEffect(() => {
        // const data = GetAllCRM().then((dat) => {
        //     console.log(dat);
        // });
    }, []);


    return (
        <IonPage>
        <IonContent>
            <IonGrid className="ion-text-center ion-padding">

                {/* Webis top menu and Logo */}
                <HeaderComponent path="/configcrm" data="" />

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

                {/* Usamos el componente que creamos abajo para renderizar los CRMs configurados */}
                <RenderCRMConfiguradosComponent data={dataCRM} crm={elegido.data} />

            </IonGrid>
        </IonContent>
        </IonPage>
    );
}

export default VerCRMs;


