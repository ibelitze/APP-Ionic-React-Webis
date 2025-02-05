import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonSelect,
  IonSelectOption,
  IonText
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { BaseSyntheticEvent} from 'react'
import { useHistory } from 'react-router-dom';


import './Login.css';

import { useTranslation } from 'react-i18next';
import { useEffect, useState,} from "react";
import {LoginController} from '../backend/Auth/controllers/LoginController';
import {LoginGmailController} from '../backend/Auth/controllers/LoginGmailController';
import {CrashService} from '../backend/crashlytics/services/CrashService'
import {RegisterBrevoController} from '../backend/Brevo/controllers/RegisterBrevoController'
import {RegisterController}  from '../backend/Auth/controllers/RegisterController'
import {RegisterHubspotController} from '../backend/Hubspot/controllers/RegisterHubspotController'


const Tab1: React.FC = () => {
  const { t, i18n } = useTranslation(['translation']);
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const history = useHistory();


 
 // onInput={ e => setMessage(e.target.value) }

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const onSingNormal = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    if(email=="" || password =="") {
      alert("Ingrese el email y la contraseña correctamente")
      return;
    }

    LoginController(email,password)
    .then((response) => {
      if(response!=true) alert("Usuario y contraseña no concuerdan")
      if(response==true)history.replace("/temporal-menu")
    })
    .catch((e) => {
      alert(e);
    })
  }

  const onBrevo = async (e: BaseSyntheticEvent) => {
    e.preventDefault()

    RegisterBrevoController('kita@br1vo.com','asddsf','sdfsdfsdf','compani3Kita')
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    })
  }

  const onSingGoogle = async (e: BaseSyntheticEvent) => {
    e.preventDefault()

    LoginGmailController()
    .then((response) => {
      if(response==true)history.replace("/temporal-menu")
    })
    .catch((e) => {
      alert(e);
    })
  }

  const onTestAnalytics = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
  }

  const onTestCrash = async (e: BaseSyntheticEvent) => {
    e.preventDefault()

    CrashService()
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      alert(e);
    })
  }

  const onRegister = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    const user: any = {};
    user.email = 'prueba@webis.com';
    user.password = 'webis1234';
    user.birthday = '20/07/1999';
    user.country = 'Chile';
    user.first_name = 'Juan';
    user.last_name = 'Webtiginoso';
    user.page='https://webtiginoso.com/'

    RegisterController(user,true)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      alert(e);
    })

 
  }

  const onRegisterHubspot = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
    const user: any = {};
    user.email = 'hermes@test.com';
    user.password = 'webis1234';
    user.birthday = '20/07/1999';
    user.country = 'Venezuela';
    user.first_name = 'Hermes';
    user.last_name = 'Sanchez';
    user.page='https://webtiginosoTestHubspot5.com/'

    RegisterHubspotController(user.email, user.first_name, user.last_name, user.page)
    .then((response) => {
      console.log(response)
    })
    .catch((e) => {
      console.log(e)
    })

    
  }
  


  return (
    <IonGrid className="ion-text-center ion-padding">
      {/* Webis logo */}
      <IonRow>
        <IonCol>
          <IonImg src="/assets/Webis.png" alt="Webis" className="webis-logo" />
        </IonCol>
      </IonRow>

      {/* Title */}
      <IonRow>
        <IonCol>
          <p className="title">
            <IonText color="primary">{t('login.title')}</IonText>
          </p>
        </IonCol>
      </IonRow>

      {/* Login form */}
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">{t('login.email')} </IonLabel>
            <IonInput 
              type="email" 
              onIonInput={(e: any) => setEmail(e.target.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{t('login.password')}</IonLabel>
            <IonInput  onIonInput={(e: any) => setPassword(e.target.value)} type="password"></IonInput>
          </IonItem>
          <IonButton className="ion-margin-top" expand="block"onClick={onSingNormal}   >{t('login.log in')}</IonButton>
        </IonCol>
      </IonRow>

      {/* Other auth methods */}
      <IonRow>
        <IonCol>
          <p className="lines">
            <IonText>{t('login.continue with')}</IonText>
          </p>
          <div>
            <IonRow>
              <IonCol>
                <IonButton color="secondary" expand="block" size="small" onClick={onSingGoogle}>Google</IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="secondary" expand="block" size="small" onClick={onTestAnalytics}>Facebook</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton color="secondary" expand="block" size="small" onClick={onTestCrash}>Yahoo!</IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="secondary" expand="block" size="small" onClick={onSingNormal}>Twitter</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton color="secondary" expand="block" size="small" onClick={onRegister}>Microsoft</IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="secondary" expand="block" size="small" onClick={onRegisterHubspot}>GitHub</IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton color="secondary" expand="block" size="small">Apple</IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </div>
        </IonCol>
      </IonRow>

      {/* Password reset and register */}
      <IonRow>
        {/* Password reset */}
        <IonCol className="ion-text-start">
          <IonButton color="tertiary" fill="clear" href="/forgot" size="small">{t('login.forgot')}</IonButton>
        </IonCol>
        {/* Register */}
        <IonCol className="ion-text-end">
          <IonButton color="tertiary" fill="clear" href="/sign-up" size="small">{t('login.register')}</IonButton>
        </IonCol>
      </IonRow>

      {/* Language */}
      <IonRow>
        <IonCol>
          <IonList>
            <IonItem>
              <IonLabel position="fixed">{t('login.language')}</IonLabel>
              <IonSelect interface="action-sheet" justify="space-between" placeholder={t('login.select')} onIonChange={(e) => handleLanguageChange(e.detail.value)}>
                <IonSelectOption value="es">Español</IonSelectOption>
                <IonSelectOption value="en">English</IonSelectOption>
                <IonSelectOption value="hi">हिन्दी</IonSelectOption>
                <IonSelectOption value="ar">اَلْعَرَبِيَّةُ</IonSelectOption>
                <IonSelectOption value="zh">中文</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>

      {/* Webtiginoso logo */}
      <IonRow>
        <IonCol>
          <IonImg src="/assets/Webtiginoso.png" alt="Webtiginoso" className="webtiginoso-logo" />
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Tab1;
