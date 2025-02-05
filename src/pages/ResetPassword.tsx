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
import './ResetPassword.css';

import { useTranslation } from 'react-i18next';

const ResetPassword: React.FC = () => {
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
            <IonText color="primary">{t('reset password.title')}</IonText>
          </p>
        </IonCol>
      </IonRow>

      {/* Form */}
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">{t('reset password.new')}</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">{t('reset password.confirm')}</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>
          <IonButton className="ion-margin-top" expand="block">{t('reset password.reset')}</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default ResetPassword;
