import React from 'react'
import styles from './hero.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextSplitter from '@/components/TextSplitter'
import dynamic from 'next/dynamic';
import { View } from '@react-three/drei'
import Scene from './Scene'
import { Bubbles } from './Bubbles'
import { useStore } from '@/hooks/useStore'
import DrinkkiLogo from '@/components/DrinkkiLogo'

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {

    const ready = useStore((state) => state.ready)

    useGSAP(() => {

        if(!ready) return;

        const introTl = gsap.timeline();

        introTl.set('#hero', {opacity: 1})
        .from('#hero-header-word', {
            scale: 3,
            opacity: 0,
            ease: 'power4.in',
            delay: 0.3,
            stagger: 1
        })
        .from('#hero-subheader', {
            opacity: 0,
            y: 30
        }, 
        '+=.8'
        ).from('#hero-subheader-info', {
            opacity: 0,
            y: 10
        }).from('#hero-btn', {
            opacity: 0,
            y: 10,
            duration: 0.6
        })

        
        
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#hero',
                start: '40% top',
                end: 'bottom bottom',
                scrub: 1.5,
                //markers: true
            }
        })

        scrollTl.fromTo('body', {
            backgroundColor: '#FDE047'
        }, {
            backgroundColor: '#D9F99D',
            overwrite: 'auto'
        }, 1)
        .from(".text-side-heading .split-char", {
            scale: 1.3,
            y: 40,
            rotate: -25,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(3)",
            duration: 0.5,
        }).from(".text-side-body", {
            y: 20,
            opacity: 0
        })

    }, [ready])

  return (
    <div className={styles.container} id='hero'>
        <View className={styles.sodaCanScene}>
            <Scene />
            <Bubbles count={300} speed={2} repeat={true}/>
        </View>
        <section className={styles.firstSection}>
            <div className={styles.firstWrapper}>
                <DrinkkiLogo />
                <h1 id='hero-header-word'>Bubly</h1>
                <h1 id='hero-header-word'>Living</h1>
                <h4 id='hero-subheader'>Soda Perfected</h4>
                <p id='hero-subheader-info'>3-5g sugar. 9g fiber. 5 delicious flavors</p>
                <button id='hero-btn'>Shop now</button>
            </div>
        </section>

        <section className={styles.secondSection} id='second-section'>
            <div className={styles.secondWrapper}>
                <h2 className='text-side-heading'>
                    <TextSplitter text='Try all five flavors'/>
                </h2>        
                <p className='text-side-body'>Our soda is made with real fruit juice and a touch of cane sugar. We never use artificial sweeteners or high fructose corn syrup. Try all five flavors and find your favourite! </p>
            </div>
        </section>
    </div>
  )
}

export default Hero