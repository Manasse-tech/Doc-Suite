import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.docsuite.app',
  appName: 'DocSuite',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config

