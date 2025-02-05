import React from 'react';
import {
    IonCol,
    IonIcon,
    IonText,
    IonCheckbox,
} from '@ionic/react';
import { close } from "ionicons/icons";


interface ScanNewProps {
    selectedContcs: any,
    dismissAll: any,
    checkboxAll: any,
}

const ButtonDismissComponent: React.FC<ScanNewProps> = ({ selectedContcs, dismissAll, checkboxAll }) => {

    if (selectedContcs) {
        return <>
            <IonCol className="md-centered">
                <IonText>Dejar de seleccionar</IonText>
                <IonIcon icon={close} size="large" onClick={dismissAll} />
            </IonCol>
            <IonCol className="md-centered">
                <IonText>Seleccionar todo</IonText>
                <IonCheckbox justify="space-between" className="content-menu-crm" onIonChange={checkboxAll}></IonCheckbox>
            </IonCol>
        </>;
    }
    else {
        return <></>;
    }
};

export default ButtonDismissComponent;