import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Navigation.css'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isScrolled, setIsScrolled] = useState(false)
    const lastScrollY = useRef(0)
    const navRef = useRef(null)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Show/hide based on scroll direction
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            // Add background when scrolled
            setIsScrolled(currentScrollY > 50)

            lastScrollY.current = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Animate mobile menu
    useEffect(() => {
        if (!menuRef.current) return

        if (isOpen) {
            gsap.to(menuRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            })
        } else {
            gsap.to(menuRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.2,
                ease: 'power2.in'
            })
        }
    }, [isOpen])

    const handleLinkClick = (e, href) => {
        e.preventDefault()
        setIsOpen(false)

        const target = document.querySelector(href)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <header
            className={`nav ${isVisible ? 'nav--visible' : 'nav--hidden'} ${isScrolled ? 'nav--scrolled' : ''}`}
            ref={navRef}
        >
            <nav className="nav__container" role="navigation" aria-label="Main navigation">
                <a href="#" className="nav__logo" aria-label="Home">
                    <span className="nav__logo-text">KB</span>
                </a>

                {/* Desktop Navigation */}
                <ul className="nav__links" role="list">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="nav__link"
                                onClick={(e) => handleLinkClick(e, link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className={`nav__hamburger ${isOpen ? 'nav__hamburger--open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    <span className="nav__hamburger-line" />
                    <span className="nav__hamburger-line" />
                    <span className="nav__hamburger-line" />
                </button>

                {/* Mobile Menu */}
                <div
                    className={`nav__mobile-menu ${isOpen ? 'nav__mobile-menu--open' : ''}`}
                    ref={menuRef}
                >
                    <ul className="nav__mobile-links" role="list">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    className="nav__mobile-link"
                                    onClick={(e) => handleLinkClick(e, link.href)}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    )
}
