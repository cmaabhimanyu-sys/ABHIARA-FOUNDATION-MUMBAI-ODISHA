/**
 * Seed CMS settings for Our Story and Vision pages
 * Run: node seed-pages.mjs
 */
import 'dotenv/config';
import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }
const conn = await mysql.createConnection(DATABASE_URL);

const settings = [
  // ===== OUR STORY PAGE =====
  // Narrative chapters (JSON array — each item has label + text + optional highlight flag)
  {
    settingKey: "ourstory_narrative_chapters",
    settingValue: JSON.stringify([
      { label: "The Beginning", text: "I was born in Raisar, a small village in Kendrapara district — Tulasi Kshetra, one of the five sacred sites of Odisha, as holy as Puri itself — 754134. Electricity was uncertain. The nearest college was a long walk and a financial stretch. The idea of career guidance did not exist. There were only two mentors — my father and my mother. No internet. No one else to tell you what was possible." },
      { label: "The Struggle", text: "What we had was a family that never gave up. When I completed my 10th class, submitting a college admission form became a crisis. The city college was out of reach. I joined a local college instead — not by choice, but by circumstance. Some called it a limitation. My parents called it a beginning." },
      { label: "The Distance", text: "I studied. I stretched. I cleared one of India's most rigorous professional examinations — the CMA, Cost and Management Accountant. I built a career in finance from the ground up, city by city, challenge by challenge. Through every difficult chapter, my wife Biswajita stood beside me — steady, silent, and unshakeable. The kind of support that does not announce itself but never disappears. I moved to Mumbai — the city that does not care where you come from, only whether you can keep up." },
      { label: "The Belief", text: "Today I lead finance for one of India's most ambitious technology companies. I understand budgets, audits, compliance, and strategy. But I also understand what it means to grow up without access — without books, without guidance, without anyone telling you that you matter. That understanding is not a footnote in my story. It is the headline." },
      { label: "The Foundation", text: "Abhiara Foundation is not charity. It is a structural intervention. It is the bridge I wish someone had built for me. It is the school I wish had existed in Raisar. It is the elder care programme I wish my family had access to. The name carries my fearlessness and my daughter's light — Abhi for courage, Ara for Aradhana, my ray of sacred light born in 2019." },
      { label: "The Plan", text: "Our plan is clear — support underprivileged children through education, care for the elderly with dignity, implement CSR projects that create real and measurable impact, and build Abhiara Vidyapeeth — a full school in Odisha — within 5 years. By 2037, when Aradhana turns 18, she becomes the youngest trustee of this foundation." },
      { label: "", text: "That is not a dream. That is a deadline.", highlight: true },
      { label: "The Scale", text: "We start in Raisar. We build in Mumbai. We think at the scale of the world." }
    ]),
    label: "Our Story — Narrative Chapters (JSON array)",
    category: "ourstory"
  },
  {
    settingKey: "ourstory_commitment_text",
    settingValue: "Rooted in the sacred land of Odisha. Built for every child. Built for every elder. Regardless of community, religion, or background.",
    label: "Our Story — Commitment Text",
    category: "ourstory"
  },
  {
    settingKey: "ourstory_closing_quote",
    settingValue: "Raisar to Mumbai. And back — through purpose.",
    label: "Our Story — Closing Quote",
    category: "ourstory"
  },
  {
    settingKey: "ourstory_abhi_desc",
    settingValue: "ABHI — from Abhimanyu, the founder. Fearlessness. The courage it took to leave the village, to walk into the unknown, to build something from nothing.",
    label: "Our Story — ABHI Description",
    category: "ourstory"
  },
  {
    settingKey: "ourstory_ara_desc",
    settingValue: "ARA — from Aradhana, his daughter. A ray of sacred light. The devotion that illuminates every step forward.",
    label: "Our Story — ARA Description",
    category: "ourstory"
  },
  // Governance cards (JSON array)
  {
    settingKey: "ourstory_governance_cards",
    settingValue: JSON.stringify([
      { title: "Section 8 Company", desc: "Registration pending under Companies Act 2013. Limited by Guarantee. All compliance documentation prepared." },
      { title: "Audited Reports", desc: "Annual audited financial statements. Quarterly utilisation reports for CSR partners." },
      { title: "Schedule VII", desc: "All programmes aligned to Companies Act Schedule VII for CSR compliance." },
      { title: "Independent Board", desc: "Governance structure with independent directors and advisory council." }
    ]),
    label: "Our Story — Governance Cards (JSON array)",
    category: "ourstory"
  },

  // ===== VISION PAGE =====
  // Hero description
  {
    settingKey: "vision_hero_desc",
    settingValue: "A clear, time-bound plan to support poor and underprivileged students, care for the elderly, implement CSR projects at scale, build Abhiara Vidyapeeth within 5 years, and pass the torch to Aradhana by 2037.",
    label: "Vision — Hero Description",
    category: "vision"
  },
  // Five pillars (JSON array)
  {
    settingKey: "vision_pillars",
    settingValue: JSON.stringify([
      { title: "Support Underprivileged Students", desc: "Scholarships, study materials, digital learning centres, and mentorship for children from poor and tribal families who cannot afford quality education.", sdg: "SDG 4", accent: "gold" },
      { title: "Education at Scale", desc: "Class 8–12 scholarship programmes, early childhood readiness, and career guidance across all of Odisha and expanding to other states across India.", sdg: "SDG 4", accent: "teal" },
      { title: "Elderly Care", desc: "Companion networks, quarterly health camps, legal aid for pension and property rights. Old age home visits in Puri and rural Odisha village outreach.", sdg: "SDG 3", accent: "gold" },
      { title: "CSR Implementation", desc: "End-to-end CSR project execution for corporates. Monthly impact reports, audited utilisation statements, and Schedule VII compliance.", sdg: "SDG 10 + 11", accent: "teal" },
      { title: "Abhiara Vidyapeeth", desc: "A full-fledged school in the heart of tribal Odisha — CBSE affiliated, built within 5 years. The flagship dream of the foundation.", sdg: "SDG 4", accent: "gold" },
      { title: "Aradhana — Future Trustee", desc: "By 2037, Aradhana turns 18 and becomes the youngest trustee of Abhiara Foundation — carrying forward the legacy of fearless light.", sdg: "2037", accent: "teal" }
    ]),
    label: "Vision — Five Pillars (JSON array)",
    category: "vision"
  },
  // Master timeline (JSON array)
  {
    settingKey: "vision_timeline",
    settingValue: JSON.stringify([
      { year: "2025", title: "Foundation Year", items: ["Section 8 Company registration — pending", "Old Age Home visit — 40+ elders visited in Puri (October 2025)", "Book distribution — 50+ students reached in Kendrapara (November 2025)", "2 activities completed on the ground", "Operations begun in Kendrapara and Puri, Odisha"], active: true },
      { year: "2026", title: "Scale & Strengthen", items: ["Complete Section 8 registration", "Reach 500+ students across Odisha", "Reach 200+ elders with companion visits", "Launch CSR partnerships — ₹30L target", "10 activities completed across Odisha"], active: false },
      { year: "2027", title: "Land & Plan", items: ["Acquire land for Abhiara Vidyapeeth in tribal Odisha", "Begin architectural planning and CBSE affiliation process", "Expand to neighbouring states (Chhattisgarh, Jharkhand)", "2,000+ students supported across programmes", "CSR portfolio reaches ₹1 Cr+"], active: false },
      { year: "2028", title: "Build the School", items: ["Construction of Abhiara Vidyapeeth begins", "Recruit founding faculty and staff", "CBSE affiliation secured", "Pan-India CSR implementation partnerships", "5,000+ students impacted across all programmes"], active: false },
      { year: "2029–2030", title: "Vidyapeeth Opens", items: ["First batch of students enrolled at Abhiara Vidyapeeth", "Residential school with free education for tribal children", "Digital learning infrastructure fully operational", "Abhiara Foundation becomes a recognised national NGO", "10,000+ lives impacted across India"], active: false },
      { year: "2037", title: "Aradhana Becomes Trustee", items: ["Aradhana turns 18 — becomes the youngest trustee", "Abhiara Vidyapeeth is a thriving institution", "Foundation operates across multiple states", "The legacy of fearless light is passed forward", "A father's promise fulfilled — a daughter's journey begins"], active: false }
    ]),
    label: "Vision — Master Timeline (JSON array)",
    category: "vision"
  },
  // Impact targets (JSON array)
  {
    settingKey: "vision_impact_targets",
    settingValue: JSON.stringify([
      { value: "10,000+", label: "Students Supported", sub: "By 2030" },
      { value: "1,000+", label: "Elders Cared For", sub: "By 2030" },
      { value: "₹5 Cr+", label: "CSR Implemented", sub: "By 2030" },
      { value: "1", label: "School Built", sub: "Abhiara Vidyapeeth" }
    ]),
    label: "Vision — Impact Targets (JSON array)",
    category: "vision"
  },
  // Aradhana 2037 section text
  {
    settingKey: "vision_aradhana_desc",
    settingValue: "When Aradhana turns 18 in 2037, she becomes the youngest trustee of Abhiara Foundation. The foundation that bears her name — ARA, a ray of sacred light — will be hers to lead. A father's courage meets a daughter's destiny.",
    label: "Vision — Aradhana 2037 Description",
    category: "vision"
  },
  {
    settingKey: "vision_aradhana_quote",
    settingValue: "Every child we educate today is a seed planted for the world Aradhana will inherit.",
    label: "Vision — Aradhana Quote",
    category: "vision"
  },
];

for (const s of settings) {
  await conn.execute(
    `INSERT INTO site_settings (settingKey, settingValue, label, category)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE settingValue=VALUES(settingValue), label=VALUES(label)`,
    [s.settingKey, s.settingValue, s.label, s.category]
  );
}
console.log(`✓ Seeded ${settings.length} Our Story + Vision settings`);

await conn.end();
console.log('✅ Done!');
