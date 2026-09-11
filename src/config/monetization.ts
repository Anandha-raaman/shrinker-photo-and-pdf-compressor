/**
 * Monetization Configuration for Shrinkr
 * 
 * To start making money with Google AdSense:
 * 1. Sign up at https://www.google.com/adsense/
 * 2. Add your website URL
 * 3. Replace 'ca-pub-XXXXXXXXXXXXXXXX' below with your real AdSense Publisher ID
 * 4. Set enabled: true
 */
export const MONETIZATION_CONFIG = {
  // Set to true once you have your Google AdSense account approved
  enabled: false,
  
  // Your Google AdSense Publisher ID (e.g. "ca-pub-1234567890123456")
  adsenseClientId: 'ca-pub-XXXXXXXXXXXXXXXX',

  // Ad Slot IDs from your AdSense dashboard
  topBannerSlot: '1234567890',
  downloadSlot: '0987654321',

  // Donation / Tip Jar link (optional: BuyMeACoffee, Ko-fi, PayPal, etc.)
  donationUrl: 'https://buymeacoffee.com/',
  donationEnabled: true,
};
