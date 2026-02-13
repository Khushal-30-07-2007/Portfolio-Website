import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Store triggers for scoped cleanup
    const triggers = []

    // Animate heading
    const headingTween = gsap.fromTo(headingRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    )
    if (headingTween.scrollTrigger) triggers.push(headingTween.scrollTrigger)

    // Animate content
    const contentTween = gsap.fromTo(contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      }
    )
    if (contentTween.scrollTrigger) triggers.push(contentTween.scrollTrigger)

    // Animate social links
    const links = linksRef.current?.children
    if (links) {
      const linksTween = gsap.fromTo(links,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      if (linksTween.scrollTrigger) triggers.push(linksTween.scrollTrigger)
    }

    // Only kill THIS component's triggers on cleanup
    return () => {
      triggers.forEach(trigger => trigger?.kill())
    }
  }, [])

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact__content" ref={contentRef}>
          <h2 className="contact__heading" ref={headingRef}>
            Let's build<br />something meaningful.
          </h2>

          <p className="contact__text">
            Open to freelance projects, collaborations, and creative opportunities.
          </p>

          <a href="mailto:freelancerkhushal@gmail.com" className="contact__email">
            Get in touch
          </a>

          <div className="contact__links" ref={linksRef}>
            <a href="https://github.com/Khushal-30-07-2007" target="_blank" rel="noopener noreferrer" className="contact__link">
              <span>GitHub</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="https://instagram.com/khushal_babariya" target="_blank" rel="noopener noreferrer" className="contact__link">
              <span>Instagram</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
            <a href="mailto:freelancerkhushal@gmail.com" className="contact__link">
              <span>Email</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>

        <footer className="contact__footer">
          <p>Designed & developed by Khushal Babariya</p>
        </footer>
      </div>

      <style>{`
        .contact {
          background: linear-gradient(180deg, #0a0a0a 0%, #050505 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 8rem 0;
          position: relative;
        }

        .contact::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3) 50%, transparent);
        }

        .contact__content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .contact__heading {
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact__text {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.8;
          margin-bottom: 3rem;
          max-width: 550px;
          margin-left: auto;
          margin-right: auto;
        }

        .contact__email {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 600;
          color: #ffffff;
          padding: 1.25rem 2.5rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 100px;
          margin-bottom: 4rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact__email:hover {
          border-color: rgba(99, 102, 241, 0.6);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(99, 102, 241, 0.3),
                      0 0 0 1px rgba(99, 102, 241, 0.2);
          color: #ffffff;
        }

        .contact__links {
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }

        .contact__link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
        }

        .contact__link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          transition: width 0.3s ease;
        }

        .contact__link:hover {
          color: #ffffff;
        }

        .contact__link:hover::after {
          width: 100%;
        }

        .contact__link svg {
          transition: transform 0.3s ease;
        }

        .contact__link:hover svg {
          transform: translate(3px, -3px);
        }

        .contact__footer {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          text-align: center;
        }

        .contact__footer p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.25);
          letter-spacing: 0.02em;
        }

        @media (max-width: 640px) {
          .contact {
            padding: 6rem 0;
          }

          .contact__links {
            gap: 1.5rem;
          }

          .contact__email {
            padding: 1rem 2rem;
          }
        }
      `}</style>
    </section>
  )
}
