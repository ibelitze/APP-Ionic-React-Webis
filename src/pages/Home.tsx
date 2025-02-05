import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButton } from '@ionic/react';
import { BaseSyntheticEvent} from 'react'


import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {


  const onSingGoogle = async (e: BaseSyntheticEvent) => {
    e.preventDefault()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
           
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={onSingGoogle}>Gmail</IonButton>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
