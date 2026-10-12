import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.docsuite.app',
  appName: 'DocSuite',
  webDir: 'dist',
  bundledWebRuntime: true,
  server: {
    androidScheme: 'https',
    cleartext: false,
    originalUrl: 'http://localhost:5173',
  },
  android: {
    allowMixedContent: false,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#7c3aed',
      showSpinner: false,
      spinnerStyle: 'large',
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_docsuite',
      iconColor: '#7c3aed',
      sound: 'notification',
    },
  },
}

export default config

