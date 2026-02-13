import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import Navigation from './components/layout/Navigation'

// Lazy load heavy components
const SceneCanvas = lazy(() => import('./components/SceneCanvas'))
const OverlayText = lazy(() => import('./components/OverlayText'))

// Lazy load section components for code-splitting
const About = lazy(() => import('./components/sections/About'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Contact = lazy(() => import('./components/sections/Contact'))

// Section loading fallback
function SectionFallback() {
    return (
        <div className="section-fallback" aria-busy="true" aria-label="Loading section">
            <div className="section-fallback__spinner" />
        </div>
    )
}

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [webglSupported, setWebglSupported] = useState(true)
    const [isHeroVisible, setIsHeroVisible] = useState(true)
    const heroRef = useRef(null)

    useEffect(() => {
        // Check WebGL support
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        if (!gl) {
            setWebglSupported(false)
            setIsLoading(false)
            return
        }

        // Simulate loading time for dramatic effect
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2500)

        return () => clearTimeout(timer)
    }, [])

    // Track hero visibility to pause 3D rendering when off-screen
    useEffect(() => {
        if (!heroRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting)
            },
            {
                threshold: 0.1,
                rootMargin: '100px' // Start rendering slightly before hero comes into view
            }
        )

        observer.observe(heroRef.current)

        return () => observer.disconnect()
    }, [])

    if (!webglSupported) {
        return (
            <div className="webgl-fallback" role="alert">
                <h2>WebGL Not Supported</h2>
                <p>Your browser doesn't support WebGL. Please try a modern browser.</p>
            </div>
        )
    }

    return (
        <>
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>

            {/* Loading Screen */}
            <div
                className={`loading-screen ${!isLoading ? 'loading-screen--hidden' : ''}`}
                role="progressbar"
                aria-label="Loading website"
                aria-valuetext={isLoading ? 'Loading' : 'Complete'}
            >
                <div className="loading-content">
                    <div className="loading-logo" aria-hidden="true">KB</div>
                    <div className="loading-spinner" aria-hidden="true" />
                    <p className="loading-text">Loading experience...</p>
                </div>
            </div>

            {/* Navigation */}
            <Navigation />

            {/* Main Content */}
            <main id="main-content">
                {/* Hero Section with 3D Canvas */}
                <section
                    className="hero"
                    id="hero"
                    ref={heroRef}
                    aria-label="Hero section with 3D keyboard animation"
                >
                    <div
                        className="hero-canvas-container"
                        aria-hidden="true"
                        style={{
                            visibility: isHeroVisible ? 'visible' : 'hidden',
                            // Prevent GPU compositing when hidden
                            willChange: isHeroVisible ? 'transform' : 'auto'
                        }}
                    >
                        <Suspense fallback={null}>
                            <SceneCanvas heroRef={heroRef} isVisible={isHeroVisible} />
                        </Suspense>
                    </div>
                    <Suspense fallback={null}>
                        <OverlayText />
                    </Suspense>

                </section>

                {/* Portfolio Sections with lazy loading */}
                <Suspense fallback={<SectionFallback />}>
                    <About />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Projects />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Skills />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                    <Contact />
                </Suspense>
            </main>
        </>
    )
}

export default App
