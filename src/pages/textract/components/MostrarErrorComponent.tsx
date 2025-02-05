import React from 'react';
import { IonRow, IonCol, IonItem, IonText } from '@ionic/react';
import '../TextractCSS.css';

interface ScanNewProps {
    mensaje: string
}

const MostrarErrorComponent: React.FC<ScanNewProps> = ({ mensaje }) => {

    return (
        <IonRow>
            <IonCol className="md-centered">
                <IonItem>
                    <IonText className="mensaje-error">{mensaje}</IonText>
                </IonItem>
            </IonCol>
        </IonRow>
    );
};

export default MostrarErrorComponent;