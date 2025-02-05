import React from 'react';
import {
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
} from '@ionic/react';


interface ScanNewProps {
    data: any,
}

const RenderInputsCRMComponent: React.FC<ScanNewProps> = ({ data }) => {
    return (
        <div>
            {data.campos.map((dat: any) => {
                return (
                    <IonRow key={dat.id}>
                        <IonCol className="list-crm">
                            <IonItem className="crm-item">
                                <IonLabel position="floating">{dat}</IonLabel>
                                <IonInput className="crm-input" type="text"></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                )
            })}
        </div>
    )
};

export default RenderInputsCRMComponent;