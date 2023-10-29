"use client";
import React, { Suspense, useState } from "react";
import NavBar from "../components/Navbar";
import { AiFillPlayCircle } from "react-icons/ai";
import { Experience } from "../components/Experience";
import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Hand from "../components/Hand";
import bgHand from "../public/src/bgShapeHand.svg";
import Image from "next/image";

export default function Home() {
  const [currentColor, setCurrentColor] = useState(0xe7a183);

  const updateColor = (color: number) => {
    setCurrentColor(color);
  };

  const colorButtons = [
    { label: "White", color: 0xe7a183 },
    { label: "Brown", color: 0x8a5d34 },
    { label: "Yellow", color: 0xffd721 },
  ];

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gradient-to-br from-[#f4f6ff] via-[#dadfff] to-[#c3d3ff] dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <div className="min-h-screen min-w-min xl:max-w-fit m-auto">
          <main className="fixed grid place-items-center space-y-32 mx-2 md:mx-4 lg:mx-20 xl:mx-32">
            <NavBar toggleDarkMode={toggleDarkMode} />
            <SectionHand
              bgHand={bgHand}
              currentColor={currentColor}
              colorButtons={colorButtons}
              updateColor={updateColor}
            />
            <footer></footer>
          </main>
        </div>
      </div>
    </div>
  );
}

function SectionHand({ bgHand, currentColor, colorButtons, updateColor }: any) {
  return (
    <section className="w-full block md:flex h-scren">
      <div className="grid space-y-4 w-3/5">
        <h5 className="font-bold text-6xl text-gray-950 dark:text-white">
          Aprendizaje de Lengua de Señas
        </h5>
        <p className="text-xl text-gray-700 dark:text-gray-300">
          La mejor plataforma de aprendizaje de Lengua de Señas Ecuatoriana
        </p>
        <div className="flex space-x-4">
          <button className="1/2 p-2 px-7 bg-gray-900 hover:bg-gray-950 rounded-full text-white font-bold dark:bg-white dark:text-gray-900">
            Empezar Ahora
          </button>
          <div className="flex gap-x-2 justify-center 1/2 font-semibold m-auto dark:text-white">
            <AiFillPlayCircle
              className="m-auto"
              size={25}
              color={"currentColor"}
            />
            Ver Video
          </div>
        </div>
      </div>
      <div className="max-h-fit w-2/5 relative">
        <Image
          className="absolute top-0"
          src={bgHand}
          alt="Forma del fondo para el modelo de la mano"
        />
        <Canvas
          className="absolute"
          camera={{
            fov: 65,
            position: [0, 5, 2],
          }}
        >
          <Stage adjustCamera={true} environment={"city"} shadows={false}>
            <Experience />
            <Hand color={currentColor} />
          </Stage>
        </Canvas>
        <div className="absolute top-0 left-0 grid gap-2 lg:w-2/3 m-auto hand-color">
          {colorButtons.map((button: any) => (
            <button
              key={button.label}
              className={`h-12 w-12 border-4 rounded-full type-${button.label.toLowerCase()}`}
              onClick={() => updateColor(button.color)}
              type="button"
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
