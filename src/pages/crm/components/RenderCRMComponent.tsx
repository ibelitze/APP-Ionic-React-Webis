import React from 'react';
import {
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonIcon,
    IonText,
} from '@ionic/react';
import { arrowForward } from "ionicons/icons";
import { Link } from "react-router-dom";


interface ScanNewProps {
    data: any,
}

const RenderCRMComponent: React.FC<ScanNewProps> = ({ data }) => {

    return (
        <div>
            {data.map((dat: any) => {
                const hsh = "#" + dat.nombre;
                const nomb = dat.nombre.toLowerCase();
                return (
                    <IonRow key={dat.id}>
                        <IonCol className="list-crm">
                            <div className={"crm-icon " + "icon-" + nomb}></div>
                            <div className="crm-name">
                                <IonText color="primary">{dat.nombre}</IonText>
                            </div>
                            <Link className="crm-button"   to={{
                                    pathname: "/crm",
                                    hash: hsh,
                                  }}>
                                <IonIcon slot="end" icon={arrowForward} />
                            </Link>
                        </IonCol>
                    </IonRow>
                )
            })}
        </div>
    )
};

export default RenderCRMComponent;