import React, {useState, useEffect, useRef, BaseSyntheticEvent} from 'react';
import { IonPage, IonContent, IonRow, IonCol, IonText, IonIcon } from '@ionic/react';
import '@ionic/react/css/core.css';
import { personOutline } from "ionicons/icons";
import { Link, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";
import { Virtuoso } from 'react-virtuoso';
import HeaderComponent from './components/HeaderComponent';
import SearchBarComponent from './components/SearchBarComponent';
import MenuBottomComponent from './components/MenuBottomComponent';

import ButtonDismissComponent from './components/ButtonDismissComponent';
import ElementCheckComponent from './components/ElementCheckComponent';
import LoadingComponent from './components/LoadingComponent';

import axios from 'axios';

import './CssCRM.css';
import './ListContacts.css';

const MiCRM: React.FC = () => {

    // traducción a diferentes idiomas
    const { t, i18n } = useTranslation(['translation']);


    // state
    const location = useLocation();
    const [dataState, setdataState] = useState<any>(location.state);

    // Popups 
    // popup de acciones (cuando hacemos click en el menú general)
    const popover = useRef<HTMLIonPopoverElement>(null);

    const dataNull = [{'Id': 1, 'Name': 'John Doe', 'Email': 'email@example.com','Contacts': [],
        'checked': false }];

    // data con las listas
    const [dataCRM, setDataCRM] = useState<any[]>(dataNull);
    const [unfiltered, setUnfiltered] = useState<any[]>([]);
    const [listOfChecks, setListOfChecks] = useState<any[]>([]);

    // eventos en general
    const [searchText, setSearchText] = useState('');
    const [windowDimensions, setWindowDimensions] = useState({ height: 500});
    const [heightForBottom, setHeightForBottom] = useState(500);
    const [selectedContcs, setSelectedContcs] = useState(false);
    const [selectedAll, setSelectedAll] = useState(false);
    const [contacts, setContacts] = useState<string[]>([]);
    const [renderVirtuoso, setRenderVirtuoso] = useState(false);
    


    // estados de los popups
    const [popoverOpen, setPopoverOpen] = useState(false);

    // tokens de los logins en api gateway y salesforce
    const [gatewayToken, setGatewayToken] = useState('');
    const [tokenLogin, setTokenLogin] = useState('');


    // INICIO: Logueamos en salesforce y en la api gateway
    useEffect(() => {

        axios({
            method: 'POST',
            url: 'https://ag-ppal-001.webis.io/gateway/auth/login',
            headers: {
                'basic_auth': '$2a$15$XkweBAqjwQD/BnxjbCF8geKi0u4svAqR/hM2juOPp3N4W3R2zEuXW',
            }
        }).then((response: any) => {
            const token = response.data.token;
            setGatewayToken(token);

            axios({
                method: 'POST',
                url: 'https://ag-ppal-001.webis.io/gateway/crm/getclientandlogin',
                headers: {
                    'authorization': 'Bearer ' + token,
                    'app_id': 'salesforce'
                },
                data: {
                    id: "a45671795f4f4bc7b0ddcfc4d6fb4d40",
                    url: "https://webtiginoso-dev-ed.develop.my.salesforce.com"
                },
            }).then((response: any) => {

                const tokenSalesforce = response.data.access_token;
                setTokenLogin(tokenSalesforce);

                const todo = response.data;
                const arr : any[] = [];

                response.data.data.records.forEach((rec: any) => {
                    if (rec.Contacts && rec.Contacts.records[0].Email) {
                        const acctemp = {
                            'Id': rec.Id,
                            'Name': rec.Name,
                            'Email': rec.Contacts.records[0].Email,
                            'Contacts': rec.Contacts,
                            'checked': false,
                        };
                        arr.push(acctemp); 
                    }
                });
                setDataCRM(arr);
                setUnfiltered(arr);
                setListOfChecks(arr);
                setWindowDimensions(getWindowDimensions());
                setRenderVirtuoso(true);

            }).catch((error: any) => {
                console.log('Error al intentar obtener los contactos');  
            });

        }).catch((error: any) => {
            console.log('Error al intentar loguearse');  
        });

    }, []);

    const returnVirtuoso = () => {
        if (renderVirtuoso) {
            return (
                <IonRow className="row-content-gray">
                    {/* Listado de contactos */}
                    <Virtuoso data={dataCRM} itemContent={itemContent} totalCount={dataCRM.length} style={{ height: heightForBottom, width: '100%' }} /> 
                </IonRow>
            );
        } else {
            return <></>;
        }
    }


    // Filtros para la búsqueda de contactos
    useEffect(() => {
        if (searchText.length >= 1 && dataCRM.length >= 1) {
            const filtered = dataCRM.filter((user) => {
                const temp = user.Name.toLowerCase();
                const textTmp = searchText.toLowerCase();
                if (temp.includes(textTmp)) {
                    return true;
                }
                return false;
            });
            setDataCRM(filtered);
        }
        else {
            cleanList();
        }
    }, [searchText]);


    // Redimensionar el div con la lista de contactos (para que no choque con el menu sticky de abajo)
    useEffect(() => {
        if (windowDimensions) {
            if (windowDimensions.height > 800) {
                const totalHeight = windowDimensions.height * 0.70;
                setHeightForBottom(totalHeight);
            }
            else {
                const totalHeight = windowDimensions.height * 0.60;
                setHeightForBottom(totalHeight);
            }

        }
    }, [windowDimensions]);


    // Menu popup (menú de acciones)
    const openPopover = (e: any) => {
        popover.current!.event = e;
        setPopoverOpen(true);
    };


    // se activa cuando se hace click sobre un checkbox (lista de contactos)
    const checkboxClick = (e: any, id: any) => {
        const checked = e.detail.checked;

        const element = [...listOfChecks];

        element.forEach((part, index, theArray) => {
            if (theArray[index].Id === id) {
                theArray[index].checked = checked;
            }
        });
        setListOfChecks(element);
    }


    // Renderiza la lista de contactos (virtuoso utiliza ésta función)
    const itemContent = (index: any, dat: any) => {
        return  <IonRow key={dat.Id}>
                    <IonCol>
                        <div className="list-crm">
                            <IonIcon slot="start" icon={personOutline} />
                            <div className="crm-text">
                                <IonText className="crm-contact-name">{dat.Name}</IonText>
                                <IonText className="crm-contact-email">{dat.Id}</IonText>
                            </div>
                            <div className="crm-button button-true">
                            </div>
                            <ElementCheckComponent 
                                selectedContcs={selectedContcs}
                                listOfChecks={listOfChecks}
                                checkboxClick={checkboxClick}
                                id={dat.Id} />
                        </div>
                    </IonCol>
                </IonRow>;
    }


    // limpia la lista de los filtros
    const cleanList = () => {
        setDataCRM(unfiltered);
    }


    // obtener dimensiones de la pantalla (para calcular el alto final de algunos elementos)
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }


    // abrir las opciones de selección de contactos
    const selectContacts = () => {
        setPopoverOpen(false);
        setSelectedContcs(true);
    }


    // activar/desactivar seleccionar todos los contactos
    const checkboxAll = () => {
        const temp = selectedAll ? false : true;
        setSelectedAll(temp);

        if (temp) {
            const element = [...listOfChecks];
            element.forEach((part, index, theArray) => {
                theArray[index].checked = true;
            });
            setListOfChecks(element);
        }
        else {
            const element = [...listOfChecks];
            element.forEach((part, index, theArray) => {
                theArray[index].checked = false;
            });
            setListOfChecks(element);
        }
    }


    // Deseleccionar todos los contactos de golpe.
    const dismissAll = () => {
        setSelectedAll(false);
        setSelectedContcs(false);
    }

    const returnLoading = () => {
        if (dataCRM.length > 0) {
            return <></>;
        }
        else {
            return <LoadingComponent />;
        }
    }


    return (
        <IonPage>
            <IonContent>
                    {/* Header sticky */}
                    <IonRow className="header-sticky">
                        <div className="sticky-content">


                            {/* HEADER */}
                            <HeaderComponent path="/vercrm" data={"salesforce"} />


                            {/* Título básico + traducciones */}
                            <IonRow>
                                <IonCol>
                                    <p className="titulo">
                                        <IonText color="primary">{t('crm.title-contacts')}</IonText>
                                    </p>
                                </IonCol>
                            </IonRow>


                            {/* Barra de búsqueda de contactos */}
                            <SearchBarComponent 
                                valor={searchText} 
                                clear={cleanList} 
                                input={setSearchText} 
                                placeholder={t('crm.searching')} />


                            {/* Barra de acciones para contactos.
                                Aparece solamente cuando elegimos seleccionar entre contactos.
                                Permite seleccionar todos los contactos, algunos o ninguno, 
                                a través de checkboxs y botones. */}
                            <IonRow className="container-dismiss">
                                <ButtonDismissComponent 
                                    selectedContcs={selectedContcs}
                                    dismissAll={dismissAll}
                                    checkboxAll={checkboxAll}
                                />
                            </IonRow>
                        </div>
                    </IonRow>

                    <IonRow>
                        <IonCol className="md-centered2">
                            {returnLoading()}
                        </IonCol>
                    </IonRow>

                    
                    {returnVirtuoso()}

                    {/* Botón inferior con el menú de acciones */}
                    <MenuBottomComponent 
                        selected={selectedContcs}
                        selctConts={selectContacts}
                        popover={openPopover}
                        popoverRef={popover}
                        popoverOpen={popoverOpen}
                        setPopoverOpen={setPopoverOpen}
                        listOfChecks={listOfChecks}
                        gatewayToken={gatewayToken}
                        tokenLogin={tokenLogin}
                        dataCRM={dataCRM} />

            </IonContent>
        </IonPage>

    );
}

export default MiCRM;
