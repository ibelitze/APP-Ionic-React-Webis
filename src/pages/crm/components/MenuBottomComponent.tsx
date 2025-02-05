import React from 'react';
import {
    IonRow,
    IonIcon,
    IonPopover,
    IonContent,
    IonButton,
} from '@ionic/react';
import { menu } from "ionicons/icons";
import { Link } from "react-router-dom";


interface ScanNewProps {
    selected: any,
    selctConts: any,
    popover: any,
    popoverRef: any,
    popoverOpen: any,
    setPopoverOpen: any,
    listOfChecks: any,
    gatewayToken: string,
    tokenLogin: string,
    dataCRM: any,
}

const MenuBottomComponent: React.FC<ScanNewProps> = ({ selected, selctConts, popover, 
    popoverRef, popoverOpen, setPopoverOpen, listOfChecks, gatewayToken, tokenLogin, dataCRM 
}) => {


    const returnMainButtons = () => {
        if (!selected) {
            return <IonButton className="button-select-contact" onClick={selctConts}>Seleccionar contactos</IonButton>;
        }
        else {
            return <>
                <Link 
                    to={{ 
                        pathname: "/generarCorreo",
                        state: {
                            contacts: listOfChecks,
                            all: dataCRM,
                            token: gatewayToken,
                            crm: tokenLogin,
                        }
                    }}><IonButton className="button-select-contact">Enviar Correo</IonButton>
                </Link>
                <IonButton className="button-select-contact">Acción 1</IonButton>
                <IonButton className="button-select-contact">Acción 2</IonButton>
            </>;
        }
    }


    return (
        <IonRow className="bottom-sticky">
            <IonIcon icon={ menu } size="large" onClick={popover}></IonIcon>
            <IonPopover ref={ popoverRef } isOpen={popoverOpen} trigger="top-center" side="top" alignment="center" onDidDismiss={() => setPopoverOpen(false)}>
                <IonContent class="ion-padding content-menu-crm">
                    {returnMainButtons()}
                </IonContent>
            </IonPopover>
        </IonRow>
    );
};

export default MenuBottomComponent;