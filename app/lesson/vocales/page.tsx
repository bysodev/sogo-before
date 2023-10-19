'use client'
import { Enunciados } from "@/components/cards/Enunciados";
import { GeneralCard } from "@/components/cards/GeneralCard"
import Camara from '@/components/camara/Camara'
import Image from "next/image";
import A from '@/public/letra_A.jpg'
import { FooterLesson } from '@/components/progress/FooterLesson';
import { ModalLesson } from '@/components/progress/ModalLesson';
import { useEffect, useRef, useState } from "react";
import { Progressbar } from '@/components/progress/Progressbar';
import Cookies from 'js-cookie'
// import { getQueryClient } from "@/util/getQueryClient";
// import { useQuery } from "@tanstack/react-query";
const vocales = ['A', 'E', 'I', 'O', 'U'];

async function verification(img: string, vocal: string) {
    // Busca la posición del caracter ","
    let comma_index = img?.indexOf(",");

    // Extrae el contenido base64 después de la ","
    let base64_content = img?.slice(comma_index + 1);

    console.log(img)
    const jwt = Cookies.get('token')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var raw = JSON.stringify({
        "learn": "numeros",
        "imagen": "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",
        "extension": "png",
        "tipo": "byte64",
        "vocal": vocal
    });

    try {
        const res = await fetch(`http://127.0.0.1:8000/user/lesson/vocales`, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            credentials: 'include',
            redirect: 'follow'
        });
        
        return res;
    } catch (error) {
        // console.log(error)
        return {ok: false}
    }
   
    
}

const getLesson = async () => {
    const jwt = Cookies.get('token')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    const res = await fetch(`http://127.0.0.1:8000/user/lesson/vocales`, {
        method: 'GET',
        headers: myHeaders,
        credentials: 'include',
        redirect: 'follow'
    });
    return res.json();
}


export default function LessonVocales(){
    const timeLocal = new Date();
    const webcamRef = useRef(null);
    const [submit, setSubmit] = useState(true);
    const [imagen, setImagen] = useState('');
    let [isOpen, setIsOpen] = useState(true)
    const [progres, setprogress] = useState({preguntas: 5, porcentaje: 0, asiertos: 0, tipo: 'vocales', continue: false, vocal: vocales[0]});
    const [time, settime] = useState(timeLocal);

    console.log(typeof imagen)

    useEffect(() => {
        let startTime = new Date();
        settime(startTime)
    }, [])
    

    const guardar = () => {
        const newTime = new Date();
        const diference = newTime.getTime() - time.getTime();
        
        const hours = Math.floor(diference / 3600000); // 1 hora = 3600000 milisegundos
        const minutes = Math.floor((diference % 3600000) / 60000); // 1 minuto = 60000 milisegundos
        const seconds = Math.floor((diference % 60000) / 1000); // 1 segundo = 1000 milisegundos

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        console.log(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`)

    }

    const cambio = async () => {
        setSubmit(false)
        console.log(progres.porcentaje)
        if( progres.porcentaje != 100) {
            if(typeof imagen === 'string'){
                const respuesta = await verification(imagen, progres.vocal)
                if(respuesta.ok){
                    setprogress( pro => ({
                        ...pro,
                        asiertos: pro.asiertos + 1,
                        porcentaje: ( (pro.asiertos + 1) / pro.preguntas ) * 100,
                        vocal: vocales[pro.asiertos + 1],
                        continue: true
                    }))
                }else{
                    alert('PROBLEMAS CON LA CONSULTA O SERVIDOR')
                }
                // console.log(respuesta);                            
            }
        }
        setSubmit(true)
    }
    const changeContinue = () => {
        setprogress( pro => ({
            ...pro,
            continue: false
        }))
    }
    console.log(progres)

    return <>

        { progres.porcentaje === 100 ?
            <ModalLesson isOpen={isOpen} setIsOpen={setIsOpen} guardar={guardar} /> : ''
        }

        <div className='flex flex-row flex-wrap justify-center w-full'>
            <Progressbar porcentaje={progres.porcentaje} />
            <button onClick={ () => {
                  setprogress( pro => ({
                    ...pro,
                    asiertos: pro.asiertos + 1,
                    porcentaje: ( (pro.asiertos + 1) / pro.preguntas ) * 100,
                    continue: true
                }))
            } } >CLICK</button>
            <div className='flex w-4/5 justify-between'>
                <div className='w-2/5 m-2'>
                    <div className="flex flex-col justify-center rounded-xl shadow-md">
                        <Image 
                            src={A}
                            alt="Letra A"
                        />
                    </div>
                </div>
                <div className='w-2/5'>
                    <Camara webcamRef={webcamRef} imagen={imagen} setImagen={setImagen}  />
                </div>
            </div>
            <FooterLesson imagen={imagen} submit={submit} setSubmit={setSubmit} comprobation={cambio} continuar={progres.continue} changeContinue={changeContinue} />
        </div>
    </>
}