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
  IonText,
  IonIcon
} from '@ionic/react';

import {
  personOutline,
  mail,
  call,
  browsersOutline
} from 'ionicons/icons';

import ExploreContainer from '../components/ExploreContainer';
import './SignUp.css';

import { useTranslation } from 'react-i18next';

const SignUp: React.FC = () => {
  const { t, i18n } = useTranslation(['translation']);

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
            <IonText color="primary">{t('sign up.title')}</IonText>
          </p>
        </IonCol>
      </IonRow>

      {/* Form */}
      <IonRow>
        <IonCol>
          <p className="ion-text-start">
            <IonText color="tertiary">{t('sign up.info')}</IonText>
          </p>
          <IonItem>
            <IonIcon slot="start" icon={personOutline} />
            <IonLabel position="floating">{t('sign up.name')}</IonLabel>
            <IonInput></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={mail} />
            <IonLabel position="floating">{t('sign up.email')}</IonLabel>
            <IonInput type="email"></IonInput>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={call} />
            <IonLabel position="floating">{t('sign up.phone')}</IonLabel>
            <IonInput type="tel"></IonInput>
          </IonItem>
          <p className="ion-text-start">
            <IonText color="tertiary">{t('sign up.site')}</IonText>
          </p>
          <IonItem>
            <IonIcon slot="start" icon={browsersOutline} />
            <IonLabel position="floating">{t('sign up.url')}</IonLabel>
            <IonInput type="url"></IonInput>
          </IonItem>
          <IonButton className="ion-margin-top" expand="block">{t('sign up.sign up')}</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default SignUp;
