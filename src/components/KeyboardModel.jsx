import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function KeyboardModel({ heroRef, isVisible = true }) {
    const groupRef = useRef()
    const { scene } = useGLTF('/keyboard.glb')
    const { camera } = useThree()

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true

                if (child.material) {
                    child.material.transparent = true
                    if (child.material.roughness !== undefined) {
                        child.material.roughness = Math.max(child.material.roughness, 0.4)
                    }
                }
            }
        })
    }, [scene])

    useEffect(() => {
        if (!heroRef?.current || !groupRef.current) return

        const group = groupRef.current

        // POSITIONING
        const INITIAL_Y = -0.5
        const INITIAL_X = 0.8

        group.position.set(INITIAL_X, INITIAL_Y, 0)
        group.scale.set(5.5, 5.5, 5.5)
        group.rotation.set(0.1, -0.4, 0)

        camera.position.set(0, 0, 8)
        camera.lookAt(0, 0, 0)

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
            }
        })

        tl.to(group.rotation, {
            y: Math.PI * 0.5,
            x: 0.3,
            duration: 10,
            ease: 'power2.inOut'
        }, 0)

        // Move keyboard up simultaneously with rotation (slower/subtler movement)
        tl.to(group.position, {
            y: 0.5,  // Move up slowly (was 3, now much subtler)
            x: 0.3,  // Slight center shift
            duration: 10,
            ease: 'power2.inOut'
        }, 0)

        tl.to(camera.position, {
            z: 5.0,
            y: 0.0,
            duration: 10,
            ease: 'sine.inOut'
        }, 0)

        return () => {
            // Only kill this component's timeline
            tl.kill()
        }
    }, [heroRef, camera, scene])

    // Note: Floating animation removed as it conflicts with GSAP scroll animation
    // The keyboard now smoothly moves up while rotating during scroll

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    )
}

useGLTF.preload('/keyboard.glb')
