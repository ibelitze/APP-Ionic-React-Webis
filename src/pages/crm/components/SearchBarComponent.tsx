import React from 'react';
import {
    IonRow,
    IonSearchbar,
} from '@ionic/react';
import { arrowBackOutline } from "ionicons/icons";
import { IonReactRouter } from '@ionic/react-router';
import { Link } from 'react-router-dom';


interface ScanNewProps {
  valor: any;
  clear: any,
  input: any,
  placeholder: any,
}

const SearchBarComponent: React.FC<ScanNewProps> = ({ valor, clear, input, placeholder }) => {
  return (
        <IonRow>
            <IonSearchbar placeholder={ placeholder } 
                value={ valor }
                onIonClear={ clear }
                onIonInput={e => input(e.detail.value!)}
                ></IonSearchbar>
        </IonRow>
  );
};

export default SearchBarComponent;