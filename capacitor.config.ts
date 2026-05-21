import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pillowsummary.app',
  appName: 'Pillow Summary',
  webDir: 'out',
  server: {
    url: 'https://pillow-summary-web.vercel.app',
    cleartext: false,
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#1a1a2e',
    preferredContentMode: 'mobile',
  },
};

export default config;
