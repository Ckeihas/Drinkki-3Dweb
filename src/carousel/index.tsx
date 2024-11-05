"use client";
import styles from './Carousel.module.scss'

import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";

import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [ 
    { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
    { flavor: "grape", color: "#572981", name: "Grape Goodness" },
    { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
    { flavor: "strawberryLemonade", color: "#690B3D", name: "Strawberry Lemonade" },
    { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];


type ArrowButtonProps = {
    direction: "right" | "left";
    label: string;
    onClick: () => void;
};
  
function ArrowButton({
    label,
    onClick,
    direction = "right",
  }: ArrowButtonProps) {
    const directionObj = { direction: "right" };
    return (
      <button onClick={onClick} className={styles.arrowBtn}>
        <ArrowIcon style={{transform: `${direction === 'right' && 'scaleX(-100%)'}`, width: 35}}/>    
      </button>
    );
  }
const Carousel = (): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    
    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 4 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 4 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        "#background, #wavy-circles-outer, #wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to("#text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to("#text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }
 
  return (
    <section className={styles.container}>
      <div className={styles.background} id='background'/>  
        <WavyCircles />
        <h2 className={styles.header}>
            Choose Your Flavor
        </h2>
      <div className={styles.contentContainer}>
        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Flavor"
        />
        {/* Can */}
        <View className={styles.view}>
          <Center position={[0, 0, 1]}>
            <FloatingCan
              key={FLAVORS[currentFlavorIndex].flavor}
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        {/* Right */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className={styles.canInfoCont}>
        <div className={styles.canName} id='text-wrapper'>
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className={styles.price}>
            <p>12 cans - 34.99€</p>
        </div>
      </div>
    </section>
  );
};

export default Carousel;