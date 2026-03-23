/**
 * CMS Seed Script — Populates the database with all existing hardcoded content
 * Run: node seed-cms.mjs
 */
import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL not set');
  process.exit(1);
}

const conn = await mysql.createConnection(DATABASE_URL);

// ===== ACTIVITIES =====
const activities = [
  {
    title: "Old Age Home Visit — Puri",
    description: "Visited Hope is Life Old Age Home in Puri, Odisha. Distributed essentials and spent quality time with 40+ elderly residents. Listened to their stories, provided companionship, and distributed daily essentials including food items, clothing, and hygiene products.",
    date: "October 2025",
    location: "Puri, Odisha",
    category: "elderly",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg",
    sdgTags: "SDG 3",
    beneficiariesCount: "40+ Elders",
    isPublished: true,
    sortOrder: 1,
  },
  {
    title: "Book Distribution — Kendrapara",
    description: "Distributed books and study materials to 50+ tribal children in Kendrapara, Odisha. Spent time with students and families, understanding their educational needs and challenges. Provided notebooks, textbooks, stationery, and educational kits.",
    date: "November 2025",
    location: "Kendrapara, Odisha",
    category: "education",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg",
    sdgTags: "SDG 4",
    beneficiariesCount: "50+ Students",
    isPublished: true,
    sortOrder: 2,
  },
];

for (const a of activities) {
  await conn.execute(
    `INSERT INTO activities (title, description, date, location, category, imageUrl, sdgTags, beneficiariesCount, isPublished, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE title=VALUES(title)`,
    [a.title, a.description, a.date, a.location, a.category, a.imageUrl, a.sdgTags, a.beneficiariesCount, a.isPublished ? 1 : 0, a.sortOrder]
  );
}
console.log(`✓ Seeded ${activities.length} activities`);

// ===== GALLERY PHOTOS =====
const photos = [
  {
    title: "Education session with village children",
    description: "Book donation and open-air learning session with tribal children — because education should not wait for four walls.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg",
    category: "education",
    location: "Kendrapara, Odisha",
    dateTaken: "November 2025",
  },
  {
    title: "Book donation to tribal children",
    description: "Every book donated is a step towards a brighter future. Empowering young minds through education materials.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-children-1_48cccd6f.jpeg",
    category: "education",
    location: "Kendrapara, Odisha",
    dateTaken: "November 2025",
  },
  {
    title: "Elderly care visit at Hope is Life Old Age Home",
    description: "Our first elder care visit — Hope is Life Old Age Home. Listening, learning, and lending a hand.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit_cbe9834b.jpeg",
    category: "elderly",
    location: "Puri, Odisha",
    dateTaken: "October 2025",
  },
  {
    title: "Distributing essentials to elderly residents",
    description: "Distributing daily essentials and spending time with elderly residents who need companionship most.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg",
    category: "elderly",
    location: "Puri, Odisha",
    dateTaken: "October 2025",
  },
  {
    title: "Community gathering with elderly residents",
    description: "Building connections that last — community gathering at Hope is Life Old Age Home.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-2_76a48a25.jpeg",
    category: "elderly",
    location: "Puri, Odisha",
    dateTaken: "October 2025",
  },
];

for (const [i, p] of photos.entries()) {
  await conn.execute(
    `INSERT INTO gallery_photos (title, description, imageUrl, category, location, dateTaken, isPublished, sortOrder)
     VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
    [p.title, p.description, p.imageUrl, p.category, p.location, p.dateTaken, i + 1]
  );
}
console.log(`✓ Seeded ${photos.length} gallery photos`);

// ===== BLOG POSTS =====
const blogPosts = [
  {
    title: "Our First Step: Visiting Hope is Life Old Age Home",
    excerpt: "In October 2025, we made our first elder care visit to Hope is Life Old Age Home in Puri, Odisha — distributing essentials and spending time with 40+ elderly residents.",
    content: "In October 2025, Abhiara Foundation took its first step in elder care by visiting Hope is Life Old Age Home in Puri, Odisha. We spent a full day with 40+ elderly residents, listening to their stories, distributing daily essentials including food items, clothing, and hygiene products, and simply being present.\n\nMany of these residents have been abandoned by their families or have no one left. What they need most is not just material support — it's companionship, dignity, and the knowledge that someone cares.\n\nThis visit reinforced our commitment to elderly welfare as one of the three pillars of Abhiara Foundation. We plan to expand our elder care programme to reach 200+ seniors across Odisha by 2026.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/elderly-care-visit-1_c836b920.jpeg",
    author: "Abhimanyu Mallik",
    category: "elderly",
    tags: "elderly care,puri,odisha,old age home",
  },
  {
    title: "Books for Bright Futures: Education Drive in Kendrapara",
    excerpt: "In November 2025, we distributed books and study materials to 50+ tribal children in Kendrapara, Odisha — our first education initiative.",
    content: "In November 2025, Abhiara Foundation conducted its first education drive in Kendrapara, Odisha. We distributed books, notebooks, textbooks, stationery, and educational kits to 50+ tribal children from remote villages.\n\nThe children's enthusiasm was infectious. Many of them had never received new books before. We spent time with the students and their families, understanding their educational challenges — from lack of school supplies to long distances to the nearest school.\n\nThis drive is just the beginning. Our goal is to reach 500+ students across Odisha by 2026, establishing digital learning centres and scholarship support programmes in Koraput, Kalahandi, and Rayagada districts.",
    imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/education-village-session_60ea6065.jpeg",
    author: "Abhimanyu Mallik",
    category: "education",
    tags: "education,kendrapara,odisha,book distribution",
  },
];

for (const b of blogPosts) {
  await conn.execute(
    `INSERT INTO blog_posts (title, excerpt, content, imageUrl, author, category, tags, isPublished)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
    [b.title, b.excerpt, b.content, b.imageUrl, b.author, b.category, b.tags]
  );
}
console.log(`✓ Seeded ${blogPosts.length} blog posts`);

// ===== SOCIAL LINKS =====
const socialLinks = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/abhimanyu-mallik/", label: "Abhimanyu Mallik — Founder", sortOrder: 1 },
  { platform: "Twitter/X", url: "https://x.com/abhimanyumalli7?s=11", label: "", sortOrder: 2 },
  { platform: "Instagram", url: "https://www.instagram.com/cma.abhimanyu?igsh=MTVsaXNic2VqeDVicg%3D%3D&utm_source=qr", label: "", sortOrder: 3 },
];

for (const s of socialLinks) {
  await conn.execute(
    `INSERT INTO social_links (platform, url, label, isActive, sortOrder)
     VALUES (?, ?, ?, 1, ?)
     ON DUPLICATE KEY UPDATE url=VALUES(url), label=VALUES(label)`,
    [s.platform, s.url, s.label, s.sortOrder]
  );
}
console.log(`✓ Seeded ${socialLinks.length} social links`);

// ===== SITE SETTINGS =====
const settings = [
  // Homepage stats
  { settingKey: "stat_students_reached", settingValue: "50", label: "Students Reached (Homepage)", category: "stats" },
  { settingKey: "stat_elders_visited", settingValue: "40", label: "Elders Visited (Homepage)", category: "stats" },
  { settingKey: "stat_activities_completed", settingValue: "2", label: "Activities Completed (Homepage)", category: "stats" },
  { settingKey: "stat_students_target", settingValue: "500", label: "Students Target 2026 (Homepage)", category: "stats" },
  { settingKey: "stat_elders_target", settingValue: "200", label: "Elders Target 2026", category: "stats" },
  // Contact info
  { settingKey: "email_address", settingValue: "info@abhiarafoundation.org", label: "Primary Email Address", category: "contact" },
  { settingKey: "whatsapp_number", settingValue: "919938938321", label: "WhatsApp Number (with country code)", category: "contact" },
  { settingKey: "phone_display", settingValue: "+91 99389 38321", label: "Phone Display Format", category: "contact" },
  // Programs page content
  { settingKey: "programs_education_title", settingValue: "Education for Every Child", label: "Education Programme Title", category: "programs" },
  { settingKey: "programs_education_desc", settingValue: "Digital learning centres, scholarship support for students, and early childhood readiness programmes across Odisha.", label: "Education Programme Description", category: "programs" },
  { settingKey: "programs_education_stats", settingValue: "50+ Students Reached · Target: 500+ in 2026", label: "Education Stats Line", category: "programs" },
  { settingKey: "programs_elderly_title", settingValue: "Dignity for Every Elder", label: "Elderly Programme Title", category: "programs" },
  { settingKey: "programs_elderly_desc", settingValue: "Companion networks, quarterly health camps, and legal aid support for pension and property rights. Urban and rural outreach.", label: "Elderly Programme Description", category: "programs" },
  { settingKey: "programs_elderly_stats", settingValue: "40+ Elders Visited · Target: 200+ in 2026", label: "Elderly Stats Line", category: "programs" },
  { settingKey: "programs_csr_title", settingValue: "CSR Implementation", label: "CSR Programme Title", category: "programs" },
  { settingKey: "programs_csr_desc", settingValue: "End-to-end CSR project implementation for corporates. Monthly impact reports, audited utilisation statements, and full documentation under Companies Act Schedule VII.", label: "CSR Programme Description", category: "programs" },
  { settingKey: "programs_csr_stats", settingValue: "Not Started Yet · Planned for 2026", label: "CSR Stats Line", category: "programs" },
];

for (const s of settings) {
  await conn.execute(
    `INSERT INTO site_settings (settingKey, settingValue, label, category)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE settingValue=VALUES(settingValue), label=VALUES(label)`,
    [s.settingKey, s.settingValue, s.label, s.category]
  );
}
console.log(`✓ Seeded ${settings.length} site settings`);

await conn.end();
console.log('\n✅ CMS seeding complete! All content is now in the database.');
