import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        technologies: z.array(z.string()).optional(),
        liveUrl: z.string().optional(),
        githubUrl: z.string().optional(),
        caseStudyUrl: z.string().nullable().optional(),
        collaborators: z.number().optional(),
        developmentTime: z.string().optional(),
        showTechCard: z.boolean().optional(),
        showProductionLink: z.boolean().optional(),
        categories: z.array(z.string()).optional()
      })
    }),

    skills: defineCollection({
      type: 'data',
      source: 'skills.json',
      schema: z.object({
        categories: z.array(z.object({
          name: z.string(),
          description: z.string(),
          icon: z.string(),
          items: z.array(z.object({
            id: z.string(),
            title: z.string(),
            category: z.string(),
            icon: z.string(),
            shortDescription: z.string(),
            description: z.string(),
            tags: z.array(z.string()),
            level: z.number(),
            practicalCase: z.string(),
            highlight: z.boolean().optional()
          }))
        }))
      })
    }),
    portfolioPreview: defineCollection({
      type: 'page',
      source: 'index/*.md',
      schema: z.object({
        items: z.array(z.object({
          id: z.string(),
          href: z.string(),
          badge: z.string(),
          titlePrefix: z.string().optional(),
          titleHighlight: z.string().optional(),
          cardDescription: z.string(),
          buttonText: z.string(),
          details: z.array(z.object({
            label: z.string(),
            icon: z.string(),
            value: z.string().optional()
          })).optional()
        }))
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about/*.md',
      schema: z.object({
        id: z.string().optional(),
        badge: z.string().optional(),
        title: z.string().optional(),
        highlight: z.string().optional(),
        description: z.string().optional(),
        steps: z.array(z.object({
          index: z.number(),
          title: z.string(),
          widgetType: z.string(),
          content: z.string(),
          buttonText: z.string().optional(),
          buttonTo: z.string().optional(),
          buttonIcon: z.string().optional()
        })).optional(),
        files: z.record(z.object({
          title: z.string(),
          content: z.string()
        })).optional()
      })
    }),
    agentFiles: defineCollection({
      type: 'data',
      source: 'about/agent-files.json',
      schema: z.object({
        id: z.string().optional(),
        files: z.record(z.object({
          title: z.string(),
          content: z.string()
        })).optional()
      })
    }),
    contactIndex: defineCollection({
      type: 'page',
      source: 'contact/index.md',
      schema: z.object({
        badge: z.string(),
        title: z.string(),
        highlight: z.string(),
        description: z.string(),
        quickActions: z.array(z.object({
          href: z.string(),
          icon: z.string(),
          title: z.string(),
          description: z.string(),
          external: z.boolean().optional()
        })),
        educationTitle: z.string(),
        educationDescription: z.string(),
        floatingTip: z.string()
      })
    }),
    contactEducation: defineCollection({
      type: 'data',
      source: 'contact/education.json',
      schema: z.object({
        experiences: z.array(z.object({
          id: z.number(),
          title: z.string(),
          institution: z.string(),
          icon: z.string(),
          description: z.string(),
          period: z.string(),
          location: z.string(),
          url: z.string().optional(),
          urlText: z.string().optional()
        }))
      })
    }),
    contactFaqs: defineCollection({
      type: 'data',
      source: 'contact/faqs.json',
      schema: z.object({
        faqs: z.array(z.object({
          question: z.string(),
          answer: z.string()
        }))
      })
    })
  }
})


