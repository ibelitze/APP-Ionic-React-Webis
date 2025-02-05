import React from 'react';
import '../../crm/CssCRM.css';

interface ScanNewProps {
    mensaje: string
}

const LoadingComponentConMensaje: React.FC<ScanNewProps> = ({ mensaje }) => {

    return <div>
        <p className="loading-message">{mensaje}</p>
        <div className="loading-div">
            <span className="loader"></span>
        </div>
    </div>;
};

export default LoadingComponentConMensaje;