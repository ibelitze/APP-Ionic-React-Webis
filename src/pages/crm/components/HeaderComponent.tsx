import React from 'react';
import {
    IonRow,
    IonCol,
    IonIcon,
    IonItem,
    IonImg,
} from '@ionic/react';
import { arrowBackOutline } from "ionicons/icons";
import { IonReactRouter } from '@ionic/react-router';
import { Link } from 'react-router-dom';


interface ScanNewProps {
  path: any,
  data: any
}

const HeaderComponent: React.FC<ScanNewProps> = ({ path, data }) => {
    return (
        <IonRow className="row-header">
            <IonCol className="arrow-container">
                <Link to={{
                    pathname: path,
                    state: {
                        data: data,
                    }
                  }}>
                    <IonIcon className="back-button" icon={arrowBackOutline} size="large" />
                </Link>
            </IonCol>
            <IonCol>
                <IonImg src="/assets/webis.svg" alt="Webis" className="webis-horizontal" />
            </IonCol>
        </IonRow>
    );
};

export default HeaderComponent;