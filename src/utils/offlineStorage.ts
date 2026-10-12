interface StorageOptions {
  ttl?: number
}

const STORAGE_PREFIX = 'docsuite_'

export const offlineStorage = {
  setItem: (key: string, value: any, options?: StorageOptions): boolean => {
    try {
      const data = {
        value,
        timestamp: Date.now(),
        ttl: options?.ttl,
      }
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('[DocSuite] Storage error:', error)
      return false
    }
  },

  getItem: <T = any>(key: string): T | null => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key)
      if (!item) return null

      const data = JSON.parse(item)
      const now = Date.now()

      if (data.ttl && now - data.timestamp > data.ttl) {
        localStorage.removeItem(STORAGE_PREFIX + key)
        return null
      }

      return data.value as T
    } catch (error) {
      console.error('[DocSuite] Storage retrieval error:', error)
      return null
    }
  },

  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key)
      return true
    } catch (error) {
      console.error('[DocSuite] Storage removal error:', error)
      return false
    }
  },

  clear: (): boolean => {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('[DocSuite] Storage clear error:', error)
      return false
    }
  },

  getAllKeys: (): string[] => {
    try {
      return Object.keys(localStorage)
        .filter((key) => key.startsWith(STORAGE_PREFIX))
        .map((key) => key.replace(STORAGE_PREFIX, ''))
    } catch {
      return []
    }
  },
}
