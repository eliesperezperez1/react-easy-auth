import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ReactComponent as CasImage } from "../../assets/esp.svg";
import { ReactComponent as ValImage } from "../../assets/val.svg";
import ValImagen from "../../assets/val.svg";
import CasImagen from "../../assets/esp.svg";
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
            
            height: '35px',
            width: '35px',
            padding: 0,
            //border: 'none', 
            backgroundImage: 'transparent',
            borderRadius: 50,
            overflow: 'hidden',
          }}>
            {/*<ImagenIdioma />*/}
            {ImagenIdioma===ValImage ? (
              <img src={ValImagen} 
                alt="Image" 
                style={{
                  objectFit: 'cover',
                  objectPosition: 'left', 
                  width: '100%', 
                  height: '100%',}}/>
            ) : (
              <img src={CasImagen} 
                alt="Image" 
                style={{
                  objectFit: 'cover', 
                  width: '100%', 
                  height: '100%',}}/>
            )}
            
        </button>
    );

}

export default ChangeLanguage;