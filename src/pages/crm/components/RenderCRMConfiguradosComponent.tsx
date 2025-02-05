import React from 'react';
import {
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonText,
    IonIcon,
} from '@ionic/react';
import { Link } from "react-router-dom";
import { checkmark, addCircleOutline } from "ionicons/icons";


interface ScanNewProps {
    data: any,
    crm: any,
}

const RenderCRMConfiguradosComponent: React.FC<ScanNewProps> = ({ data, crm }) => {
    return (
        <div>
            {data.map((dat: any) => {
                const hsh = "#" + dat.nombre;
                const nomb = dat.nombre.toLowerCase();
                if (dat.nombre === crm) {
                    return (
                        <IonRow key={dat.id}>
                            <IonCol>
                                <Link className="list-crm" 
                                    to={{ pathname: "/micrm" }}>
                                    <div className={"crm-icon " + "icon-" + nomb}></div>
                                    <div className="crm-name">
                                        <IonText className="crm-name-true">{dat.nombre}</IonText>
                                    </div>
                                    <div className="crm-button button-true">
                                        <IonIcon slot="end" icon={checkmark} size="large" />
                                    </div>
                                </Link>
                            </IonCol>
                        </IonRow>
                    )
                }
                else {

                    return (
                        <IonRow key={dat.id}>
                            <IonCol className="">
                                <div className="crm-button">
                                    <Link className="list-crm" 
                                        to={{ 
                                            pathname: "/crm",
                                            hash: hsh, 
                                        }}>
                                        <div className={"crm-icon " + "icon-" + nomb}></div>
                                        <div className="crm-name">
                                            <IonText className="primary">{dat.nombre}</IonText>
                                        </div>
                                        <div className="crm-button button-true">
                                            <IonIcon slot="end" icon={addCircleOutline} size="large" />
                                        </div>
                                    </Link>
                                </div>
                            </IonCol>
                        </IonRow>
                    )
                }
            })}
        </div>
    )
};

export default RenderCRMConfiguradosComponent;