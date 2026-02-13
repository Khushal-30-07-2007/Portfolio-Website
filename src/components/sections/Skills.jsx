import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Technical Skills',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', '.NET', 'PHP', 'Python', 'C', 'C++', 'DBMS', 'Advanced DBMS']
  },
  {
    title: 'Design & Creative',
    skills: ['UI/UX Design', 'Color Theory', 'Layout Systems', 'Typography', 'Figma', 'Motion-Aware Design']
  },
  {
    title: 'AI & Modern Tools',
    skills: ['AI-Assisted Workflows', 'Generative Tools', 'Automation', 'Creative Coding', 'Vibe-Coding Utilities']
  }
]

export default function Skills() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const categoriesRef = useRef([])

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

    // Animate categories
    categoriesRef.current.forEach((category, index) => {
      if (!category) return

      const categoryTween = gsap.fromTo(category,
        { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      if (categoryTween.scrollTrigger) triggers.push(categoryTween.scrollTrigger)

      // Animate skill pills within each category
      const pills = category.querySelectorAll('.skill-pill')
      const pillsTween = gsap.fromTo(pills,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.3 + index * 0.1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: category,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
      if (pillsTween.scrollTrigger) triggers.push(pillsTween.scrollTrigger)
    })

    // Only kill THIS component's triggers on cleanup
    return () => {
      triggers.forEach(trigger => trigger?.kill())
    }
  }, [])

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="skills__heading" ref={headingRef}>
          Skills & Tools
        </h2>

        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="skill-category"
              ref={el => categoriesRef.current[index] = el}
            >
              <h3 className="skill-category__title">{category.title}</h3>
              <div className="skill-category__list">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech logos marquee */}
        <div className="skills__marquee">
          <div className="skills__marquee-track">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="skills__marquee-content">
                {['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'Figma', 'AI Tools', 'UI/UX'].map((tech, i) => (
                  <span key={i} className="marquee-item">{tech}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills {
          background: linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%);
          min-height: 100vh;
          padding: 8rem 0;
          position: relative;
        }

        .skills::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3) 50%, transparent);
        }

        .skills__heading {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 700;
          margin-bottom: 4rem;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .skills__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 5rem;
        }

        .skill-category {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-category:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(99, 102, 241, 0.2);
          transform: translateY(-4px);
        }

        .skill-category__title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .skill-category__title::before {
          content: '';
          width: 3px;
          height: 20px;
          background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
          border-radius: 2px;
        }

        .skill-category__list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .skill-pill {
          padding: 0.5rem 1rem;
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: 100px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.85);
          transition: all 0.3s ease;
          cursor: default;
        }

        .skill-pill:hover {
          background: rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .skills__marquee {
          overflow: hidden;
          padding: 2rem 0;
          mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 10%, black 90%, transparent);
        }

        .skills__marquee:hover .skills__marquee-track {
          animation-play-state: paused;
        }

        .skills__marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .skills__marquee-content {
          display: flex;
          gap: 4rem;
          padding: 0 2rem;
        }

        .marquee-item {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.08);
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          transition: color 0.3s ease;
        }

        .skills__marquee:hover .marquee-item {
          color: rgba(255, 255, 255, 0.15);
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 1024px) {
          .skills__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .skills {
            padding: 6rem 0;
          }

          .skills__grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .skill-category {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}
