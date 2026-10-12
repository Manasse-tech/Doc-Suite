# DocSuite Mobile App - Deployment Guide

## Overview

DocSuite is a fully-featured mobile document management application built with React, TypeScript, and Capacitor for cross-platform deployment.

## Build Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Capacitor CLI
- For Android APK: Android SDK, Java JDK 11+, Gradle

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Android APK Generation

#### Option 1: GitHub Actions (Recommended)

The project includes an automated GitHub Actions workflow that builds the APK:

1. Push changes to the repository
2. Go to Actions → Build Android APK
3. Click "Run workflow" 
4. Download the APK artifact once complete

**Workflow file:** `.github/workflows/android.yml`

#### Option 2: Local Build

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli

# Add Android platform
npx cap add android

# Sync web assets
npx cap sync android

# Build APK
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

## Configuration Files

### Capacitor Configuration
- **File:** `capacitor.config.ts`
- **Features:** PWA support, app icon, splash screen, plugins
- **Customization:** Edit app name, version, icon paths as needed

### Build Configuration
- **Vite:** `vite.config.ts` - Web bundling
- **TypeScript:** `tsconfig.json` - Type checking
- **Tailwind:** `tailwind.config.js` - Styling

## Mobile Optimizations

### Performance
- Lazy loading for screens
- Optimized CSS animations
- Efficient PDF rendering
- Local storage caching with TTL support

### Responsive Design
- Mobile-first approach (390px viewport)
- Safe area insets for notch compatibility
- Touch-friendly interface (min 44px tap targets)
- Dark mode enabled by default

### Offline Support
- Offline detection via `useOnline` hook
- Local storage caching with `offlineStorage` utility
- Error handling with fallback messages

## Key Features

- Document library with search
- PDF viewer with full controls
- Document scanning
- Multiple tools (split, merge, convert, protect)
- Account management
- Favorites and recent files
- Language switching (FR/EN)
- Dark/light theme toggle

## Architecture

```
src/
├── components/        # Reusable components
├── screens/          # Full-page screens
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── data/             # Data storage and management
├── types/            # TypeScript types
└── App.tsx           # Main app component
```

## Testing

```bash
# Run dev server and test in browser
npm run dev

# Navigate to http://localhost:5173
# Use mobile viewport (390x844) for testing
```

## Deployment Checklist

- [ ] Verify all screens load correctly
- [ ] Test offline functionality
- [ ] Check mobile responsiveness (all viewports)
- [ ] Verify dark mode works
- [ ] Test PDF viewer functionality
- [ ] Confirm navigation between screens
- [ ] Check error handling
- [ ] Review permissions in Capacitor config
- [ ] Update app version in `capacitor.config.ts`
- [ ] Generate and upload icons/splash screens
- [ ] Run production build
- [ ] Build APK via GitHub Actions or locally
- [ ] Test APK on physical device

## Troubleshooting

### Build Issues
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Capacitor cache: `npx cap sync android --force`
- Ensure Java JDK 11+ is installed

### Runtime Issues
- Check browser console for errors: `npm run dev`
- Use React DevTools for component debugging
- Check localStorage usage with `offlineStorage` utility

### APK Installation
- Enable "Unknown sources" in Android settings
- Check Android version compatibility (Android 7+)
- Ensure sufficient storage space

## Production Build Output

**Bundle Size:** ~3.3MB
- Main JS: 226 KB (gzip: 66 KB)
- PDF Worker: 1.3 MB (gzip: included)
- CSS: 31 KB (gzip: 6.5 KB)
- Assets: Icons, manifest, service worker

## Support

For issues, questions, or feature requests, refer to the main README.md or contact the development team.
