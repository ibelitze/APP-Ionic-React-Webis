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
  IonText
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Forgot.css';

import { useTranslation } from 'react-i18next';

const Forgot: React.FC = () => {
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
            <IonText color="primary">{t('forgot password.title')}</IonText>
          </p>
        </IonCol>
      </IonRow>

      {/* Form */}
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">{t('forgot password.email')}</IonLabel>
            <IonInput type="email"></IonInput>
          </IonItem>
          <IonButton className="ion-margin-top" expand="block">{t('forgot password.recover')}</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Forgot;
