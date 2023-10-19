'use client'
import {useState, useRef} from 'react'
import Webcam from "react-webcam";
import Image from 'next/image'

export default function Camara({ webcamRef, imagen, setImagen }) {
    console.log(imagen)

    const foto = () => {
        var captura=webcamRef.current.getScreenshot();
        console.log(captura)
        setImagen(captura)
    };


    return (
        <div className='App'>
            <Webcam audio={false} height={640} ref={webcamRef} screenshotFormat="image/jpeg" width={480}/>
                <br/> 
            <button onClick={foto}>Hacer captura</button>
            <hr/>
            { imagen && <Image src={imagen} alt="" width={640} height={480}/>  }

            <br/>
            <a href={imagen} download="captura">Descargar captura</a> 
        </div>
    )
}