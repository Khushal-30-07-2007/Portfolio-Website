import { useRef, useEffect, useState, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useProgress, Html } from '@react-three/drei'
import * as THREE from 'three'
import KeyboardModel from './KeyboardModel'
import Lights from './Lights'
import HeroText3D from './HeroText3D'

// Detect mobile/low-power devices
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768 ||
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            setIsMobile(mobile)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}

function Loader() {
    const { progress } = useProgress()
    if (progress === 100) return null

    return (
        <Html center>
            <div style={{
                color: '#ffffff',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '12px',
                letterSpacing: '0.2em',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '8px' }}>LOADING</div>
                <div style={{
                    width: '120px',
                    height: '2px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>
        </Html>
    )
}

// Rig component for mouse parallax - only runs when visible
function Rig({ isVisible }) {
    const vec = useMemo(() => new THREE.Vector3(), [])

    useFrame((state) => {
        // Skip entirely when not visible - crucial for performance
        if (!isVisible) return

        state.camera.position.lerp(
            vec.set(state.mouse.x * 0.4, state.mouse.y * 0.4, state.camera.position.z),
            0.05
        )
        state.camera.lookAt(0, 0, 0)
    })

    return null
}

function BackgroundShadow() {
    const meshRef = useRef()
    const material = useMemo(() => new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            uColor: { value: new THREE.Color('#000000') },
            uOpacity: { value: 1.0 }
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            uniform vec3 uColor;
            uniform float uOpacity;
            void main() {
                float dist = distance(vUv, vec2(0.5, 0.0)); 
                float alpha = 1.0 - smoothstep(0.48, 0.5, dist); 
                gl_FragColor = vec4(uColor, alpha * uOpacity);
            }
        `
    }), [])

    return (
        <mesh position={[0, -10, -5]} ref={meshRef}>
            <planeGeometry args={[40, 20]} />
            <primitive object={material} attach="material" />
        </mesh>
    )
}

// Frame loop controller - pauses rendering when not visible
function FrameloopController({ isVisible }) {
    const { invalidate, gl } = useThree()

    useEffect(() => {
        if (isVisible) {
            // Request a render when becoming visible
            invalidate()
        }
    }, [isVisible, invalidate])

    return null
}

export default function SceneCanvas({ heroRef, isVisible = true }) {
    const isMobile = useIsMobile()

    // Reduce DPR on mobile for performance
    const dpr = useMemo(() => {
        if (typeof window === 'undefined') return 1
        if (isMobile) return Math.min(1.5, window.devicePixelRatio)
        return Math.min(2, window.devicePixelRatio)
    }, [isMobile])

    // Use 'demand' frameloop - only renders when invalidate() is called or animations run
    // This is the key to stopping GPU usage when off-screen
    const frameloop = isVisible ? 'always' : 'never'

    return (
        <Canvas
            dpr={dpr}
            camera={{ position: [0, 0, 8], fov: 35 }}
            gl={{
                antialias: !isMobile, // Disable antialiasing on mobile
                alpha: false,
                powerPreference: isMobile ? 'low-power' : 'high-performance',
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.4
            }}
            style={{ background: '#0a0a0a' }}
            shadows={!isMobile} // Disable shadows on mobile
            frameloop={frameloop}
        >
            <color attach="background" args={['#0a0a0a']} />

            <FrameloopController isVisible={isVisible} />
            <Rig isVisible={isVisible} />

            <Suspense fallback={<Loader />}>
                <BackgroundShadow />
                <KeyboardModel heroRef={heroRef} isVisible={isVisible} />
            </Suspense>

            <HeroText3D heroRef={heroRef} />

            <Lights />
            <Environment
                preset="studio"
                intensity={isMobile ? 0.4 : 0.6}
            />
        </Canvas>
    )
}
