import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Smart Campus Hub',
    category: 'Hackathon Project',
    description: 'A hackathon project focused on creating a centralized digital platform for campus services, communication, and student utilities. Designed to improve accessibility and streamline everyday campus interactions.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
    color: '#4f46e5'
  },
  {
    id: 2,
    title: 'Smart Attendance System',
    category: 'Academic Project',
    description: 'A final-year academic project that automates attendance using facial recognition, reducing manual effort and improving accuracy.',
    tech: ['Python', 'Face Recognition', 'Database', 'UI Design'],
    color: '#22d3ee'
  }
]

export default function Projects() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

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
          toggleActions: 'play none none reverse'
        }
      }
    )
    if (headingTween.scrollTrigger) triggers.push(headingTween.scrollTrigger)

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      const cardTween = gsap.fromTo(card,
        { opacity: 0, y: 80, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      if (cardTween.scrollTrigger) triggers.push(cardTween.scrollTrigger)
    })

    // Only kill THIS component's triggers on cleanup
    return () => {
      triggers.forEach(trigger => trigger?.kill())
    }
  }, [])

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <h2 className="projects__heading" ref={headingRef}>
          Selected Projects
        </h2>

        <div className="projects__grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              ref={el => cardsRef.current[index] = el}
              style={{ '--accent-color': project.color }}
            >
              <div className="project-card__header">
                <span className="project-card__category">{project.category}</span>
                <div className="project-card__number">0{project.id}</div>
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>

              <div className="project-card__tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="project-card__tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-card__cta">
                <span>View Project</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="project-card__glow" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects {
          background: linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%);
          min-height: 100vh;
          padding: 8rem 0;
          position: relative;
        }

        .projects::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3) 50%, transparent);
        }

        .projects__heading {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 700;
          margin-bottom: 4rem;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .projects__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .project-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          padding: 2.5rem;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .project-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-12px);
          box-shadow: 0 32px 64px rgba(0, 0, 0, 0.4),
                      0 0 0 1px rgba(99, 102, 241, 0.2),
                      0 0 60px rgba(99, 102, 241, 0.15);
        }

        .project-card:hover .project-card__glow {
          opacity: 1;
        }

        .project-card__glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 30%, var(--accent-color), transparent 50%);
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .project-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .project-card__category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent-color);
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 100px;
        }

        .project-card__number {
          font-family: 'Outfit', sans-serif;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.2);
          font-weight: 700;
        }

        .project-card__title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .project-card__description {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.75;
          margin-bottom: 1.5rem;
        }

        .project-card__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .project-card__tech-tag {
          font-size: 0.75rem;
          padding: 0.4rem 0.85rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 100px;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s ease;
        }

        .project-card:hover .project-card__tech-tag {
          border-color: rgba(99, 102, 241, 0.2);
        }

        .project-card__cta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent-color);
          transition: all 0.3s ease;
        }

        .project-card__cta svg {
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-card__cta {
          gap: 0.75rem;
        }

        .project-card:hover .project-card__cta svg {
          transform: translateX(4px);
        }

        @media (max-width: 900px) {
          .projects__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .projects {
            padding: 6rem 0;
          }

          .project-card {
            padding: 1.75rem;
            border-radius: 20px;
          }
        }
      `}</style>
    </section>
  )
}
