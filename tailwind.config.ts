export default {
  theme: {
    extend: {
      colors: {
        // Globales / Compartidos
        'global-bg': 'var(--global-bg)',
        'global-base': 'var(--global-base)',
        'global-text': 'var(--global-text)',
        'global-text-muted': 'var(--global-text-muted)',
        'global-text-dim': 'var(--global-text-dim)',

        // Sección Sobre Mí (About)
        'about-base': 'var(--about-base)',
        'about-accent': 'var(--about-accent)',
        'about-accent-light': 'var(--about-accent-light)',
        'about-accent-dark': 'var(--about-accent-dark)',
        'about-highlight': 'var(--about-highlight)',
        'about-highlight-light': 'var(--about-highlight-light)',
        'about-highlight-dark': 'var(--about-highlight-dark)',
        'about-fuchsia': 'var(--about-fuchsia)',
        'about-pink': 'var(--about-pink)',

        // Sección Contacto (Contact)
        'contact-base': 'var(--contact-base)',
        'contact-accent': 'var(--contact-accent)',
        'contact-accent-light': 'var(--contact-accent-light)',
        'contact-accent-dark': 'var(--contact-accent-dark)',

        // Sección Proyectos (Projects)
        'projects-base': 'var(--projects-base)',
        'projects-accent': 'var(--projects-accent)',
        'projects-accent-light': 'var(--projects-accent-light)',
        'projects-accent-dark': 'var(--projects-accent-dark)',

        // Sección Habilidades (Skills)
        'skills-base': 'var(--skills-base)',
        'skills-accent': 'var(--skills-accent)',
        'skills-accent-light': 'var(--skills-accent-light)',
        'skills-accent-dark': 'var(--skills-accent-dark)',
        'skills-highlight': 'var(--skills-highlight)',
        'skills-highlight-light': 'var(--skills-highlight-light)',
        'skills-highlight-dark': 'var(--skills-highlight-dark)',
      },
      backgroundImage: {
        'about-gradient': 'linear-gradient(135deg, var(--about-base) 0%, var(--about-accent) 100%)',
        'about-gradient-subtle': 'linear-gradient(135deg, var(--global-bg) 0%, var(--about-base) 100%)',
        'about-gradient-accent': 'linear-gradient(135deg, var(--about-accent) 0%, var(--about-highlight) 100%)',
        'about-gradient-analogous': 'linear-gradient(135deg, var(--about-accent) 0%, var(--about-fuchsia) 50%, var(--about-pink) 100%)',
        'about-gradient-analogous-subtle': 'linear-gradient(135deg, var(--about-accent-dark) 0%, var(--about-accent) 50%, var(--about-fuchsia) 100%)',
        'contact-gradient': 'linear-gradient(135deg, var(--contact-accent-dark) 0%, var(--contact-accent) 100%)',
        'contact-gradient-subtle': 'linear-gradient(135deg, var(--global-bg) 0%, var(--contact-accent-dark) 100%)',
        'contact-gradient-accent': 'linear-gradient(135deg, var(--contact-accent) 0%, var(--about-highlight) 100%)',
        'projects-gradient': 'linear-gradient(135deg, var(--projects-accent-dark) 0%, var(--projects-accent) 100%)',
        'projects-gradient-subtle': 'linear-gradient(135deg, var(--global-bg) 0%, var(--projects-accent-dark) 100%)',
        'projects-gradient-accent': 'linear-gradient(135deg, var(--projects-accent) 0%, var(--projects-accent-light) 100%)',
        'skills-gradient': 'linear-gradient(135deg, var(--skills-base) 0%, var(--skills-accent) 100%)',
        'skills-gradient-subtle': 'linear-gradient(135deg, var(--global-bg) 0%, var(--skills-base) 100%)',
        'skills-gradient-accent': 'linear-gradient(135deg, var(--skills-accent) 0%, var(--skills-highlight) 100%)',
      },
      boxShadow: {
        'about': '0 4px 20px hsla(270, 67%, 45%, 0.15)',
        'about-highlight': '0 4px 20px hsla(245, 70%, 55%, 0.2)',
        'about-glow': '0 0 40px hsla(270, 67%, 45%, 0.3)',
      },
      animation: {
        'slide-fade-up': 'slideFadeUp 400ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'slide-fade-right': 'slideFadeRight 300ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'scale-fade-in': 'scaleFadeIn 400ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'stagger-card': 'staggerCard 400ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'spotlight': 'spotlightEntry 600ms cubic-bezier(0.25, 1, 0.5, 1) forwards',
      },
      keyframes: {
        slideFadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideFadeRight: {
          from: { opacity: 0, transform: 'translateX(-10px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        scaleFadeIn: {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        staggerCard: {
          from: { opacity: 0, transform: 'translateY(15px) scale(0.95)' },
          to: { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        spotlightEntry: {
          '0%': { opacity: 0, transform: 'scale(0.9) translateY(30px)', filter: 'blur(10px)' },
          '100%': { opacity: 1, transform: 'scale(1) translateY(0)', filter: 'blur(0)' },
        },
      },
    },
  },
}
