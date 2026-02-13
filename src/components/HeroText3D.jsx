import { useRef, useEffect } from 'react'
import { Text } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// LOCAL FONT PATHS (Downloaded in public/fonts)
const OUTFIT_BOLD = "/fonts/Outfit-Bold.ttf"
const OUTFIT_REGULAR = "/fonts/Outfit-Regular.ttf"

export default function HeroText3D({ heroRef }) {
    const mainTextRef = useRef()  // Only for KHUSHAL

    useEffect(() => {
        if (!heroRef?.current || !mainTextRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom bottom',  // Full hero scroll - matches keyboard
                scrub: 1.5,  // Matches keyboard
            }
        })

        // Match keyboard's upward movement speed (1 unit total, same ease)
        tl.to(mainTextRef.current.position, {
            y: 1.7,  // Move from 0.7 to 1.7 (1 unit, same as keyboard)
            ease: 'power2.inOut'  // Matches keyboard
        }, 0)

        return () => {
            tl.kill()
        }

    }, [heroRef])

    return (
        <group position={[0, 0, 3]}>
            {/* Main title - KHUSHAL (has scroll animation) */}
            <Text
                ref={mainTextRef}
                position={[0, 0.7, 0]}
                fontSize={1.2}
                letterSpacing={-0.05}
                lineHeight={1}
                color="white"
                anchorX="center"
                anchorY="middle"
                castShadow
                font={OUTFIT_BOLD}
            >
                KHUSHAL
                <meshStandardMaterial
                    attach="material"
                    color="white"
                    transparent
                    opacity={1}
                    emissive="white"
                    emissiveIntensity={0.2}
                />
            </Text>

            {/* Subtitle - aligned to start at same x as KHUSHAL */}
            <group position={[-2.28, 0, 0.5]}>
                <Text
                    fontSize={0.15}
                    letterSpacing={0.2}
                    color="white"
                    anchorX="left"
                    anchorY="top"
                    font={OUTFIT_REGULAR}
                >
                    A CREATIVE
                    <meshStandardMaterial
                        attach="material"
                        color="white"
                        transparent
                        opacity={0.8}
                        emissive="white"
                        emissiveIntensity={0.1}
                    />
                </Text>
                <Text
                    position={[0, -0.18, 0]}
                    fontSize={0.15}
                    letterSpacing={0.2}
                    color="white"
                    anchorX="left"
                    anchorY="top"
                    font={OUTFIT_REGULAR}
                >
                    FRONTEND
                    <meshStandardMaterial
                        attach="material"
                        color="white"
                        transparent
                        opacity={0.8}
                        emissive="white"
                        emissiveIntensity={0.1}
                    />
                </Text>
                <Text
                    position={[0, -0.36, 0]}
                    fontSize={0.15}
                    letterSpacing={0.2}
                    color="white"
                    anchorX="left"
                    anchorY="top"
                    font={OUTFIT_REGULAR}
                >
                    DEVELOPER
                    <meshStandardMaterial
                        attach="material"
                        color="white"
                        transparent
                        opacity={0.8}
                        emissive="white"
                        emissiveIntensity={0.1}
                    />
                </Text>
            </group>
        </group>
    )
}
