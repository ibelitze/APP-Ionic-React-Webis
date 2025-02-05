import React from 'react';
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

const TokenJWT: React.FC = () => {

  
useIonViewWillEnter(() => {
  console.log('ionViewWillEnter event fired');
  //alert('ionViewWillEnter event fired');
});

  TokenJWTInit();

  function TokenJWTInit(): void {
    //alert('ionViewWillEnter event fired')
    console.log('ionViewWillEnter event fired');
  }
  return (<></>);
};

export default TokenJWT;
