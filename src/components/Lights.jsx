import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Lights() {
    const spotRef = useRef()
    const rimRef = useRef()

    useEffect(() => {
        const hero = document.querySelector('.hero')
        if (!hero || !spotRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
            }
        })

        // Intensify the key light on scroll
        tl.to(spotRef.current, {
            intensity: 12.0, // High intensity for dramatic contrast
            duration: 10
        }, 0)

        tl.to(spotRef.current.position, {
            x: -3, // Subtle shift to follow the rotation
            duration: 10
        }, 0)

        return () => {
            // Only kill this component's timeline
            tl.kill()
        }
    }, [])

    return (
        <>
            {/* 
          Balanced Ambient Light: Low for contrast, but high enough to see all elements clearly.
      */}
            <ambientLight intensity={0.3} color="#ffffff" />

            {/* 
          1. KEY LIGHT (The Shadow Generator):
          Positioned sharply to cast deep shadows under keycaps.
          REDUCED shadow-mapSize from 4096 to 1024 for performance
      */}
            <spotLight
                ref={spotRef}
                position={[5, 12, 5]}
                angle={0.4}
                penumbra={1}
                intensity={6.0}
                castShadow
                color="#ffffff"
                shadow-mapSize={[1024, 1024]}
                shadow-bias={-0.0001}
            />

            {/* 
          2. RIM LIGHT (Behind):
          Dramatically outlines the model.
      */}
            <spotLight
                ref={rimRef}
                position={[-8, 8, -8]}
                angle={0.5}
                penumbra={1}
                intensity={15}
                color="#ffffff"
            />

            {/* 
          3. FILL LIGHT (Very subtle):
          Only enough to prevent total pitch black in non-lighted areas.
      */}
            <directionalLight
                position={[0, 5, 10]}
                intensity={0.2}
                color="#ffffff"
            />
        </>
    )
}
