import React, {useEffect} from 'react';
import { Suspense } from 'react';
import {Set, get}  from "./backend/Auth/models/SessionVariable"

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewDidLeave,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from '@ionic/react';

import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { createBrowserHistory } from "history";
import { ellipse, square, triangle } from 'ionicons/icons';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import ResetPassword from './pages/ResetPassword';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Chat from './chat/pages/Chat'

/* CRM views */
import ConfigCRM from './pages/crm/ConfigCRM';
import InsertData from './pages/crm/InsertData';
import TemporalMenu from './pages/crm/TemporalMenu';
import VerCRMs from './pages/crm/VerCRMs';
import MiCRM from './pages/crm/MiCRM';
import GenerarCorreo from './pages/crm/GenerarCorreo';

/* TEXTract views */
import Textract from './pages/textract/Textract';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';


/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';



import OneSignalReact from './components/OneSignal'
import TokenJWT from './components/TokenJWT'
<TokenJWT />

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    console.log('ionViewWillEnter event fired');
    fetch("https://xxxxxxxxxxxxxxx/gateway/auth/login", {
            method: "POST",
            headers: {
                "user": "ibelitze",
                "password": "",
                "basic_auth": "",
            },
          })
        .then(response => {
            response.json()
            .then(response2 => {
              const newToken = response2.token
              Set('tokenSession',newToken)
              .then(response2 => {
                console.log('nuevo token:'+ newToken)
              })
            })
          })
  }, [ ]);

  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Suspense fallback={null}>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgot">
              <Forgot />
          </Route>
          <Route exact path="/reset-password">
              <ResetPassword />
          </Route>
          <Route exact path="/sign-up">
              <SignUp />
          </Route>
          <Route exact path="/crm">
            <InsertData />
          </Route>
          <Route exact path="/temporal-menu">
            <TemporalMenu />
          </Route>
          <Route exact path="/vercrm">
            <VerCRMs />
          </Route>
          <Route exact path="/micrm">
            <MiCRM />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path = "/view-chat/:contact_id">
            <Chat />
          </Route>
        </Suspense>

          <Route exact path="/configcrm">
            <ConfigCRM />
          </Route>
          <Route exact path="/crm">
            <InsertData />
          </Route>
          <Route exact path="/vercrm">
            <VerCRMs />
          </Route>
          <Route exact path="/micrm">
            <MiCRM />
          </Route>
          <Route exact path="/generarCorreo">
            <GenerarCorreo />
          </Route>

          <Route exact path="/textract">
            <Textract />
          </Route>

      </IonRouterOutlet>
      <OneSignalReact />
    </IonReactRouter>
  </IonApp>
)};

export default App;
