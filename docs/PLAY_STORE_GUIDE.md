# Complete Google Play Store Publishing Guide for "Shrinkr"

This guide walks you through publishing **Shrinkr: PDF & Image Compressor** to the Google Play Store with 100% copyright safety and zero policy violations.

---

## 1. App Store Optimization (ASO) Listing Kit

### App Title (31 characters max, clean & punchy)
```
Shrinkr: PDF & Image Compressor
```

### Short Description (79 characters max)
```
Compress PDFs & images to exact KB (20KB, 50KB, 100KB). 100% Offline & Private.
```

### Full Description
```
Need to compress a PDF or photo to an exact file size for an online application?

Shrinkr is the fastest, 100% offline PDF and Image Compressor built specifically for government job forms, university applications, passport submissions, visa portals, and email attachments.

🔥 WHY PEOPLE LOVE SHRINKR:
• Exact KB Compression: Select 20 KB (Signature/Thumbprint), 50 KB (Passport photo), 100 KB, 200 KB, or enter any custom KB value!
• 100% Private & Offline: Your files NEVER leave your phone. All image and PDF compression runs locally on your device.
• Multi-Page PDF Compressor: Easily shrink scanned documents, resumes, and certificates from 10MB down to <300KB without losing text clarity.
• Batch Compression: Select 10+ photos at once and download as a single ZIP.
• Format Freedom: Convert & compress JPG, PNG, and WebP.
• No Watermarks & No Sign-up: Instant utility with zero friction.

🎯 PERFECT FOR:
- Government Exam Portals (UPSC, SSC, State PSC, Railway, Banking)
- Passport & Visa Online Submissions
- University & College Admissions
- Job Application Portals
- Email attachment limits

Save storage space and bypass strict upload size limits in seconds with Shrinkr!
```

### High-Search Keywords (ASO Tagging)
`shrinkr, pdf compressor, photo compressor to 20kb, compress image to 50kb, reduce photo size in kb, passport photo resizer, signature compressor, image resizer to kb, offline image compressor, reduce pdf size`

### Category
- **Category**: Tools or Productivity
- **Tags**: Photo editing, Tools, Productivity, File Manager

---

## 2. Google Play Data Safety Answers

When Google Play Console asks for your **Data Safety** questionnaire:
1. **Does your app collect or share any user data?** -> **NO**
2. **Is all user data processed ephemerally?** -> **YES** (All compression is strictly on-device in memory).
3. **Does your app require an account?** -> **NO**
4. **Does your app share data with third parties?** -> **NO**

*Result: Instant approval without data audit flags.*

---

## 3. How to Build the Release Android App Bundle (.AAB)

### Prerequisites:
- Android Studio installed on your computer.

### Steps:
1. **Build Web Production Bundle**:
   ```powershell
   npm run build
   ```

2. **Add Capacitor Android Native Project**:
   ```powershell
   npx cap add android
   ```

3. **Sync Any Code Updates to Android**:
   ```powershell
   npx cap sync android
   ```

4. **Open in Android Studio**:
   ```powershell
   npx cap open android
   ```

5. **Generate Signed Bundle**:
   - In Android Studio, go to menu: **Build** -> **Generate Signed Bundle / APK...**
   - Select **Android App Bundle (.aab)**
   - Click **Create new keystore** (save the key safely)
   - Select **Release** build variant
   - Click **Finish**!
   - Your `.aab` file will be generated in `android/app/release/app-release.aab`.

---

## 4. Required Play Store Visual Assets

You can generate and download the official assets directly inside the app under the **Play Store Kit** tab:
1. **App Icon**: 512 x 512 px PNG (Download with 1 click).
2. **Feature Graphic**: 1024 x 500 px PNG (Download with 1 click).
3. **Screenshots**: Take 2-4 screenshots of the app running on your phone or browser.
