---
id: index
badge: 'Conoceme'
title: 'Sobre'
highlight: 'Mí'
description: 'Explora mi historia, habilidades y trayectoria como desarrollador.'
steps:
  - index: 0
    title: ¿Quién soy?
    widgetType: 'JsonConfigCard'
    contentComponent: 'AboutWhoAmIContent'
    contentData:
      name: 'Julian'
      experience: '1 año y medio'
      intro: 'un desarrollador frontend apasionado por crear interfaces modernas, fluidas y con un alto nivel de detalle visual.'
      skills: 
        - 'Vue'
        - 'Nuxt'
        - 'TypeScript'
      description: 'combinando rendimiento técnico con atención al detalle y experiencia de usuario.'
  - index: 1
    title: Experiencia Laboral
    widgetType: 'GithubContributionsCard'
    buttonText: 'Ver proyectos realizados'
    buttonTo: '/projects'
    buttonIcon: 'mdi:arrow-right'
    contentComponent: 'AboutExperienceContent'
    contentData:
      company: 'Ticktaps (ticz.io)'
      companyUrl: 'https://ticz.io/'
      role: 'Desarrollador Frontend'
      ecosystem: 'Vue, Nuxt y TypeScript'
      projects: 
        - 'Liga Mayor de Béisbol Profesional (LMBP)'
        - 'Federación Nacional de Fútbol (FVF)'
        - 'Mi Changan APP'
        - 'Regnum Christi'
      projectsTrailing: 'entre otros'
  - index: 2
    title: Habilidades Efectivas
    widgetType: 'AgentEditorCard'
    buttonText: 'Ver habilidades técnicas'
    buttonTo: '/skills'
    buttonIcon: 'mdi:arrow-right'
    contentComponent: 'AboutSkillsContent'
    contentData:
      specialty: 'modelado de agentes de inteligencia artificial'
      workflowBase: 'skills y herramientas programadas a medida'
      intro: 'Especializado en el '
      midText: ', estructurando sistemas interactivos con una arquitectura frontend robusta, modular y escalable. Diseño e implemento flujos de trabajo eficientes basados en '
      endText: '.'
      description: 'Mi enfoque combina la optimización de rendimiento, la integración fluida de APIs cognitivas y la reutilización de código para asegurar que cada interacción del agente sea rápida, precisa y brinde la mejor experiencia de usuario.'
  - index: 3
    title: Estudios Universitarios
    widgetType: 'TerminalGraduationCard'
    contentComponent: 'AboutEducationContent'
    contentData:
      institute: 'IUJO'
      instituteFullName: '(Instituto Universitario Jesús Obrero)'
      location: 'Barquisimeto, Venezuela'
      instituteUrl: 'https://www.iujobarquisimeto.edu.ve/'
      description: 'Durante mi formación académica, obtuve una base sólida en algoritmia, bases de datos y metodologías de ingeniería de software. Esta etapa consolidó mi mentalidad lógica de resolución de problemas y encendió mi interés por la arquitectura de aplicaciones web.'
  - index: 4
    title: Filosofía de Código
    widgetType: 'QualityDashboardCard'
    contentComponent: 'AboutPhilosophyContent'
    contentData:
      intro: 'Para mí, programar va más allá de hacer que las cosas funcionen; se trata de escribir arte digital estructurado. Mis principios rectores son:'
      principles:
        - title: 'Legibilidad ante todo'
          description: 'Código limpio, modular y autoexplicativo que cualquier desarrollador pueda mantener fácilmente.'
        - title: 'Rendimiento sin compromiso'
          description: 'Optimización de recursos, imágenes e interacciones para Core Web Vitals y velocidad excepcionales.'
        - title: 'Accesibilidad universal'
          description: 'Estructuras HTML semánticas y correctas para asegurar que la web sea verdaderamente inclusiva.'
---
