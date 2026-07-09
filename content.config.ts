import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md'
    }),


    projectsList: defineCollection({
      type: 'data',
      source: 'projects.json',
      schema: z.object({
        destacados: z.array(z.object({
          cards: z.array(z.object({
            id: z.string(),
            title: z.string(),
            category: z.string(),
            description: z.string(),
            icon: z.string(),
            technologies: z.array(z.string()),
            liveUrl: z.string().optional(),
            githubUrl: z.string().optional(),
            collaborators: z.number().optional(),
            developmentTime: z.string().optional(),
            showTechCard: z.boolean().optional(),
            showProductionLink: z.boolean().optional()
          }))
        })),
        'en-produccion': z.array(z.object({
          cards: z.array(z.object({
            id: z.string(),
            title: z.string(),
            category: z.string(),
            description: z.string(),
            icon: z.string(),
            technologies: z.array(z.string()),
            liveUrl: z.string().optional(),
            githubUrl: z.string().optional(),
            collaborators: z.number().optional(),
            developmentTime: z.string().optional(),
            showTechCard: z.boolean().optional(),
            showProductionLink: z.boolean().optional()
          }))
        })),
        'en-desarrollo': z.array(z.object({
          cards: z.array(z.object({
            id: z.string(),
            title: z.string(),
            category: z.string(),
            description: z.string(),
            icon: z.string(),
            technologies: z.array(z.string()),
            liveUrl: z.string().optional(),
            githubUrl: z.string().optional(),
            collaborators: z.number().optional(),
            developmentTime: z.string().optional(),
            showTechCard: z.boolean().optional(),
            showProductionLink: z.boolean().optional()
          }))
        })),
        personales: z.array(z.object({
          cards: z.array(z.object({
            id: z.string(),
            title: z.string(),
            category: z.string(),
            description: z.string(),
            icon: z.string(),
            technologies: z.array(z.string()),
            liveUrl: z.string().optional(),
            githubUrl: z.string().optional(),
            collaborators: z.number().optional(),
            developmentTime: z.string().optional(),
            showTechCard: z.boolean().optional(),
            showProductionLink: z.boolean().optional()
          }))
        }))
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
    })
  }
})


