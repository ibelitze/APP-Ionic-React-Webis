import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { play, stop } from "ionicons/icons";
import { TextToSpeech } from '@capacitor-community/text-to-speech';


interface ScanNewProps {
  text: string,
}

const PlayButtonTextToSpeech: React.FC<ScanNewProps> = ({ text }) => {

    const [icon, setIcon] = useState("play");

    const handleClick = async () => {
        try {
            if (icon=="play") {
                setIcon("stop");
                const textos = separarStringBloques(text);

                for (const texto of textos) {
                    await TextToSpeech.speak({
                        text: texto,
                        lang: 'es-MX',
                        rate: 1.0,
                        pitch: 1.0,
                        volume: 1.0,
                        category: 'ambient',
                    });
                }
                setIcon("play");
            }
            else {
                setIcon("play");
                await TextToSpeech.stop();
            }
        }
        catch (error) {
            return;
        }
    };

    const separarStringBloques =  ( texto: string ) => { 
         // Convertir el string a un array de palabras
        const palabras = texto.split(" ");

        // Crear un array vacío para almacenar los bloques
        const bloques = [];

        // Variable para almacenar el bloque actual
        let bloqueActual = "";

        // Variable para contar las palabras en el bloque actual
        let numeroPalabrasActual = 0;

        // Recorrer las palabras y agregarlas al bloque actual
        let next= false;

        for (const palabra of palabras) {
            // Si el bloque actual ya tiene 30 palabras o más, agregarlo al array de bloques y crear un nuevo bloque
            if (numeroPalabrasActual >= 35 || next) {
                next = false;
                bloques.push(bloqueActual);
                bloqueActual = "";
                numeroPalabrasActual = 0;
            }

            if(tienePuntoFinal(palabra)) {
                next=true;
            }

            // Agregar la palabra al bloque actual
            bloqueActual += palabra + " ";
            numeroPalabrasActual++;
        }

        // Si el bloque actual no está vacío, agregarlo al array de bloques
        if (bloqueActual.length > 0) {
            bloques.push(bloqueActual);
        }

        // Devolver el array de bloques
        return bloques;
       
    };

    const tienePuntoFinal = (palabra: string) => {
        // Expresión regular que busca un punto al final de la palabra
        const regex = /\.$/;

        // Devuelve true si la expresión regular coincide con la palabra
        return regex.test(palabra);
    }
  

    return (
        <div className="bubble-inside">
            <div onClick={handleClick}>
                { icon == "play" && <IonIcon className="bubble-icon" icon={play} /> }
                { icon == "stop" && <IonIcon className="bubble-icon" icon={stop} /> }
            </div>
        </div>
    );
};

export default PlayButtonTextToSpeech;