import React from 'react'
import styles from './SkyDive.module.scss'
import { Text, View } from '@react-three/drei'
import Scene from './Scene'

type Props = {}


const SkyDive = () => {
  return (  
    <View className={styles.sceneContainer} id='skydive'>
        <Scene flavor='watermelon' sentence="Dive into better health"/>
    </View> 
  )
}

export default SkyDive;