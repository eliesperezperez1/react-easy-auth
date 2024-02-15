import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ReactComponent as CasImage } from "../../assets/esp.svg";
import { ReactComponent as ValImage } from "../../assets/val.svg";
import "./languageSwitch.css";

function ChangeLanguage() {
    const [t, i18n] = useTranslation();
    const [idioma, setIdioma] = useState("es");
    const [imageIndex, setImageIndex] = useState(1);
    const [primerClick, setPrimerClick] = useState(0);
    const imagenes = [ValImage, CasImage];
    const ImagenIdioma = imagenes[imageIndex];


    const switchVisibleSeleccion = () => {
        if(idioma==="es"){
          setIdioma("val");
          
        } 
        else {
          setIdioma("es");
        }
        i18n.changeLanguage(idioma);
        console.log("Idioma al cambiar: "+idioma);
        if(primerClick===0){
          setPrimerClick(1);
        } else {
          setImageIndex((imageIndex + 1) % 2);
        }
        
      }

    return(
        <button 
          id="buttonChangeLanguage" 
          onClick={switchVisibleSeleccion}
          style={{
            
            height: '100%', 
            padding: 0,
            border: 'none', 
            background: 'transparent',
          }}>
            <ImagenIdioma />
        </button>
    );

}

export default ChangeLanguage;