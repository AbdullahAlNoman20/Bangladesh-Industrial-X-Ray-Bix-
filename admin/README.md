# BIX Admin — Bangladesh Industrial X-Ray | NDT Management System

React 18 + Vite + Tailwind CSS admin dashboard for Bangladesh Industrial X-Ray (BIX).

## বর্তমান পর্যায় (Phase 1 — Client Side Only)
এই ভার্সনে সব ডেটা `/public/data/*.json` ফাইল থেকে **Axios** দিয়ে fetch করা হয়, এবং
তৈরি/সম্পাদিত ডেটা ব্রাউজারের **localStorage** এ সেভ থাকে (`src/Components/services/dataStore.js`)।

যখন ব্যাকএন্ড তৈরি হবে, শুধু `src/Components/services/api.js` এর `USE_MOCK` ফ্ল্যাগ বন্ধ করে
`baseURL` টা রিয়েল সার্ভারে পরিবর্তন করে দিলেই পুরো অ্যাপ সার্ভারের সাথে কাজ করবে — কোনো
কম্পোনেন্ট পরিবর্তন করা লাগবে না।

## ছবি ও ভিডিও পরিবর্তন করবেন কীভাবে?
নিচের `IMAGE_VIDEO_GUIDE.md` ফাইলটি দেখুন — কোন ছবি কোথায় বসবে এবং পরিবর্তন করতে হলে
ঠিক কোন ফোল্ডারে ফাইল বসাতে হবে তার সম্পূর্ণ বিবরণ আছে।

## Install & Run
```bash
npm install
npm run dev
```

## Tech Stack
- React 18 + React Router 6 (data router)
- Vite
- Tailwind CSS
- Axios (mock JSON + localStorage persistence layer)
