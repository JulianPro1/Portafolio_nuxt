import { defineStore } from 'pinia'

export const useScrollStore = defineStore('scroll', {
  state: () => ({
    scrollY: 0,
    activeTab: 'destacados',
    selectedProjectId: null as string | null,
    hasSavedState: false
  }),

  actions: {
    saveScrollState(y: number, tabId: string, projectId: string | null) {
      this.scrollY = y
      this.activeTab = tabId
      this.selectedProjectId = projectId
      this.hasSavedState = true
    },

    clearScrollState() {
      this.scrollY = 0
      this.selectedProjectId = null
      this.hasSavedState = false
    }
  }
})
