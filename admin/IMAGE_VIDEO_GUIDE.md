# ছবি ও ভিডিও পরিবর্তন করার নিয়ম (বাংলায়)

এই প্রজেক্টে দুই ধরনের ছবি আছে —

1. **সিস্টেম ছবি (Logo, Icons)** → `src/assets/` এ থাকে, কোডে সরাসরি `import` করা।
2. **কনটেন্ট ছবি (Service, Customer, Certificate, Equipment, Hero, Video)** → `public/assets/` এ
   থাকে এবং JSON ডেটার ভিতরে **path হিসেবে লেখা**। এগুলোই আপনি বারবার পরিবর্তন করবেন।

নিয়ম একটাই: **যেই ফাইলের নাম আছে, ঠিক সেই নামেই নতুন ছবি দিয়ে replace করুন — কোড পরিবর্তন করা লাগবে না।**

---

## ১. সিস্টেম লোগো পরিবর্তন (একবারের কাজ)

| কী পরিবর্তন করবেন | ফাইল পাথ |
|---|---|
| হেডার/সাইডবারের প্রধান লোগো | `src/assets/Texco_Tech_Logo.png` |
| ছোট গোলাকার লোগো (Sidebar আইকন) | `src/assets/Texco_Tech_Logo2.png` |
| হোমপেজের হিরো ছবি | `src/assets/hero.png` |
| Browser Tab আইকন (Favicon) | `public/favicon.svg` |

➡️ শুধু **একই ফাইলের নাম ও এক্সটেনশন** রেখে নতুন ছবি দিয়ে ওভাররাইট করুন। কোনো `import` লাইন
পরিবর্তন করার দরকার নেই।

> চাইলে নতুন ফাইলনেম/এক্সটেনশন (যেমন `.jpg` থেকে `.webp`) ব্যবহার করলে শুধু নিচের ফাইলগুলোতে
> `import logo from '../assets/...'` লাইনটা পরিবর্তন করতে হবে:
> - `src/Components/Nav.jsx`
> - `src/Components/layout/Sidebar.jsx`
> - `src/Pages/Login/Login.jsx`
> - `src/Pages/Home/Home.jsx`
> - `src/Components/Shared/ReportPrintView.jsx`

---

## ২. সার্ভিস (Products) ছবি পরিবর্তন

ফোল্ডার: **`public/assets/images/services/`**

প্রতিটি সার্ভিসের ছবির নাম `public/data/products.json` ফাইলের `image` ফিল্ডে লেখা আছে। যেমন:

```json
{ "id": "P001", "name": "Radiography Testing (X-Ray & Gamma Ray)", "image": "/assets/images/services/radiographic-testing.jpg" }
```

➡️ এই ফোল্ডারে ঠিক **`radiographic-testing.jpg`** নামে আসল ছবি বসিয়ে দিলেই ওয়েবসাইটে
স্বয়ংক্রিয়ভাবে পরিবর্তন হয়ে যাবে। নতুন সার্ভিস যোগ করতে চাইলে `products.json` এ নতুন এন্ট্রি
যোগ করে সেই নামের ছবি এই ফোল্ডারে রাখুন।

---

## ৩. কাস্টমার লোগো পরিবর্তন

ফোল্ডার: **`public/assets/images/customers/`**

নাম তালিকা `public/data/customers.json` এর `logo` ফিল্ডে আছে (যেমন `chevron.png`,
`bsrm.png`, `kafco.png` ইত্যাদি)। একইভাবে — সঠিক নামে নতুন লোগো বসিয়ে দিন।

---

## ৪. সার্টিফিকেট/লাইসেন্স ছবি পরিবর্তন

ফোল্ডার: **`public/assets/images/certificates/`**

নাম তালিকা `public/data/certificateLibrary.json` এর `file` ফিল্ডে আছে (যেমন
`iso-17025.jpg`, `baera-radiography-licence.jpg`)। স্ক্যান করা সার্টিফিকেট এই নামে রাখুন।

---

## ৫. ইকুইপমেন্ট ছবি (পরবর্তী ইটারেশনে ব্যবহার হবে)

ফোল্ডার: **`public/assets/images/equipment/`** — Major Equipment List মডিউল তৈরি হলে এখানে
প্রতিটি যন্ত্রের ছবি রাখা হবে (নামকরণ পদ্ধতি ঠিক উপরের মতোই হবে)।

---

## ৬. ভিডিও পরিবর্তন / যোগ করা

ফোল্ডার: **`public/assets/videos/`**

- MP4 ফরম্যাটে ভিডিও এই ফোল্ডারে রাখুন, যেমন `field-operations.mp4`।
- এরপর যে JSON বা কম্পোনেন্টে ভিডিও দেখাতে চান, সেখানে `<video src="/assets/videos/field-operations.mp4" controls />`
  এভাবে ব্যবহার করুন (React এ path সবসময় `/assets/...` দিয়ে শুরু হবে, কারণ এটা `public/` ফোল্ডার থেকে সার্ভ হয়)।
- এই মুহূর্তে হোমপেজে ভিডিও সেকশন যোগ করা হয়নি — পরবর্তী ইটারেশনে "Our Work in Action" সেকশনে
  ভিডিও গ্যালারি যোগ করা হবে।

---

## ৭. সংক্ষেপে — একটি ছবি পরিবর্তনের সম্পূর্ণ ধাপ

1. আসল ছবিটি সঠিক সাইজে ক্রপ/রিসাইজ করুন (Service card ≈ 480×320px, Customer logo ≈ 300×150px,
   Certificate ≈ পোর্ট্রেট A4 অনুপাত)।
2. উপরের টেবিল অনুযায়ী সঠিক ফোল্ডার এবং **হুবহু একই ফাইলনেম** ব্যবহার করে সেভ করুন।
3. পুরনো (placeholder) ফাইলটি ওভাররাইট/replace করুন।
4. ব্রাউজার রিফ্রেশ করলেই (localStorage cache থাকলে hard refresh — Ctrl+Shift+R) নতুন ছবি
   দেখা যাবে।

**কোনো অবস্থাতেই `.jsx` ফাইলে গিয়ে ছবি পরিবর্তন করা লাগবে না — শুধু JSON ডেটার `image`/`logo`/`file`
ফিল্ডে নাম মিলিয়ে ফোল্ডারে ফাইল বসালেই যথেষ্ট।**
