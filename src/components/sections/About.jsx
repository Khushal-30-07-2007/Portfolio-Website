import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Store triggers for scoped cleanup
    const triggers = []

    // Animate heading
    const headingTween = gsap.fromTo(headingRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      }
    )
    if (headingTween.scrollTrigger) triggers.push(headingTween.scrollTrigger)

    // Animate text
    const textTween = gsap.fromTo(textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 40%',
          toggleActions: 'play none none reverse'
        }
      }
    )
    if (textTween.scrollTrigger) triggers.push(textTween.scrollTrigger)

    // Animate stats
    const stats = statsRef.current?.children
    if (stats) {
      const statsTween = gsap.fromTo(stats,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      if (statsTween.scrollTrigger) triggers.push(statsTween.scrollTrigger)
    }

    // Only kill THIS component's triggers on cleanup
    return () => {
      triggers.forEach(trigger => trigger?.kill())
    }
  }, [])

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__content">
          <h2 className="about__heading" ref={headingRef}>
            About Me
          </h2>

          <div className="about__text" ref={textRef}>
            <p>
              I'm Khushal, a creative frontend developer and self-driven vibe coder with a strong interest in modern web experiences. I enjoy building interfaces that feel smooth, interactive, and visually refined — especially scroll-based and 3D-enhanced designs.
            </p>
            <p>
              Currently pursuing my third year diploma in Computer Engineering, I focus on blending clean code, thoughtful UI, and emerging tools to create work that feels both functional and expressive.
            </p>
          </div>

          <div className="about__stats" ref={statsRef}>
            <div className="stat">
              <span className="stat__number">3rd</span>
              <span className="stat__label">Year Diploma</span>
            </div>
            <div className="stat">
              <span className="stat__number">36hr</span>
              <span className="stat__label">Hackathons</span>
            </div>
            <div className="stat">
              <span className="stat__number">∞</span>
              <span className="stat__label">Curiosity</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about {
          background: linear-gradient(180deg, #0a0a0a 0%, #121212 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 8rem 0;
          position: relative;
        }

        .about::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3) 50%, transparent);
        }

        .about__content {
          max-width: 900px;
        }

        .about__heading {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 2.5rem;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about__text {
          margin-bottom: 4rem;
        }

        .about__text p {
          font-size: clamp(1.1rem, 2vw, 1.35rem);
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          max-width: 720px;
        }

        .about__text p:last-child {
          margin-bottom: 0;
        }

        .about__stats {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .stat {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          min-width: 140px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .stat:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(99, 102, 241, 0.3);
          transform: translateY(-4px);
        }

        .stat::before {
          content: '';
          position: absolute;
          top: 0;
          left: 1.5rem;
          right: 1.5rem;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat:hover::before {
          opacity: 1;
        }

        .stat__number {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .stat__label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        @media (max-width: 768px) {
          .about {
            padding: 6rem 0;
          }

          .about__stats {
            gap: 1rem;
          }

          .stat {
            flex: 1 1 calc(50% - 0.5rem);
            min-width: auto;
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
