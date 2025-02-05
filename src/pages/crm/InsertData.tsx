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


const InsertData: React.FC = () => {

    const { t, i18n } = useTranslation(['translation']);

    const { hash } = useLocation();
    const nombre = hash.replace("#", "");

    const data = [
        {id: "1", nombre: "Hubspot", campos: ['Client id', 'Api Key']},
        {id: "2", nombre: "Brevo", campos: ['Client id', 'Api Key']},
        {id: "3", nombre: "Salesforce", campos: ['Client id', 'Client Secret']},
        {id: "4", nombre: "Dynamics", campos: ['Client id', 'Client Secret']},
        {id: "5", nombre: "Zoho", campos: ['Client id', 'Client Secret', 'code']},
    ];

    const final = data.find((dt) => {
        return dt.nombre === nombre;
    });
    const [inputsCRM, setInputsCRM] = useState(final);

    return (
        <IonPage>
            <IonContent>
                <IonGrid className="ion-text-center ion-padding">

                    <HeaderComponent path="/configcrm" data={[]} />

                    {/* content */}
                    <IonRow>
                        <IonCol>
                            <p className="titulo">
                                <IonText color="primary">{t('crm.conecting') + nombre}</IonText>
                            </p>
                            <p className="seleccionar">
                                <IonText>{t('crm.complete')}</IonText>
                            </p>
                        </IonCol>
                    </IonRow>

                    <RenderInputsCRMComponent data={inputsCRM} />

                    <IonRow>
                        <IonCol>
                            <Link 
                                to={{ 
                                    pathname: "/vercrm",
                                    state: {
                                        data: nombre,
                                    }
                                }}>
                                <IonButton className="ion-margin-top" expand="block">{t('crm.button')}</IonButton>
                            </Link>
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default InsertData;

