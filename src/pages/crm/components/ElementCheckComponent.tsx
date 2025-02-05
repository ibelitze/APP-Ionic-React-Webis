import React from 'react';
import {
    IonCheckbox,
} from '@ionic/react';
import { close } from "ionicons/icons";


interface ScanNewProps {
    selectedContcs: any,
    listOfChecks: any,
    checkboxClick: any,
    id: any,
}

const ElementCheckComponent: React.FC<ScanNewProps> = ({ selectedContcs, listOfChecks, checkboxClick, id }) => {

    if (selectedContcs) {

        const elem = listOfChecks.find((user: any) => user.Id == id);
        if (elem) {
            return  <IonCheckbox justify="space-between" 
                         className="content-menu-crm"
                         id={`custom-checkbox-${id}`}
                         checked={elem.checked}
                         onIonChange={(e) => checkboxClick(e, id)}
                    ></IonCheckbox>;
        }

        return <></>;
    }
    else {
        return <></>;
    }
};

export default ElementCheckComponent;