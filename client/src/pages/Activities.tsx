/**
 * Abhiara Foundation, Activities (Unified Page)
 * Merges: Activities + Impact Gallery + Blog into one tabbed experience
 * Three tabs: Activities, Gallery, Updates
 * DYNAMIC: Fetches from CMS database, falls back to hardcoded data when DB is empty
 */
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowRight,
  Heart,
  BookOpen,
  Calendar,
  MapPin,
  Camera,
  GraduationCap,
  HeartHandshake,
  Users,
  X,
  Clock,
  Tag,
  Newspaper,
  Building2,
  Search,
  Youtube,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { useLanguage } from "@/contexts/LanguageContext";

const INFO_EMAIL = "info@abhiarafoundation.org";

/* ══════════════════════════════════════════════════════════
   FALLBACK DATA. used when CMS database is empty
   ══════════════════════════════════════════════════════════ */
type ActivityCategory = "all" | "elderly" | "education" | "community";

interface ActivityItem {
  id?: number;
  category: "elderly" | "education" | "community";
  title: string;
  description: string;
  date: string;
  location: string;
  highlight?: boolean;
  imageUrl?: string | null;
}

const FALLBACK_ACTIVITIES: ActivityItem[] = [
  {
    category: "education",
    title: "ସ୍ୱାଧୀନତା ଦିବସରେ ସ୍କୁଲ ବହି ଓ ଶବ୍ଦକୋଷ ବଣ୍ଟନ",
    description:
      "୧୫ ଅଗଷ୍ଟ ୨୦୨୬ରେ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ପାଠପଢ଼ା ଜାରି ରଖିବାକୁ ଉତ୍ସାହ ଦେବା ପାଇଁ ସ୍କୁଲ ବହି ଓ ଶବ୍ଦକୋଷ ବଣ୍ଟନ କରାଗଲା। School books and dictionaries were distributed to students on 15 August 2026 to encourage them to continue their education. The public Monthly Impact record contains all supplied photographs. No student count is stated because a verified total was not provided.",
    date: "୧୫ ଅଗଷ୍ଟ ୨୦୨୬",
    location: "ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲା, ଓଡ଼ିଶା",
    imageUrl: "/images/education-books-independence-day-01.jpeg",
    highlight: true,
  },
  {
    category: "education",
    title: "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ, ୫୦+ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ଶିକ୍ଷା ସହାୟତା",
    description:
      "ଅଭିଆରା ଶିକ୍ଷା ସାଥୀ ଅଧୀନରେ ୫୦ ରୁ ଅଧିକ ଛାତ୍ରଛାତ୍ରୀ ଯୋଡ଼ା ହୋଇଛନ୍ତି। ପ୍ରତ୍ୟେକ ପିଲା ଜଣେ କିମ୍ବା ଉଭୟ ମାତାପିତାଙ୍କୁ ହରାଇଛନ୍ତି। ସେମାନଙ୍କୁ ମାସିକ ଟ୍ୟୁସନ ଫି, ସ୍କୁଲ ବ୍ୟାଗ ଓ ଶିକ୍ଷା ସାମଗ୍ରୀ ଦିଆଯାଉଛି। More than 50 students are enrolled under Abhiara Shiksha Sathi. Every enrolled student has lost one or both parents. Support includes monthly tuition fees, school bags and learning materials.",
    date: "୨୦୨୬",
    location: "",
    imageUrl: "/images/shiksha-sathi-school-bags.jpeg",
    highlight: true,
  },
  {
    category: "education",
    title: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ ୨୦୨୬, ରାଇସର ଖରିସାନ ଉଚ୍ଚ ବିଦ୍ୟାଳୟ",
    description:
      "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଓ ଫାଇଣ୍ଡ ଫାଉଣ୍ଡେସନ ମିଳିତ ସହଯୋଗରେ ଗରଦପୁର ବ୍ଲକ, କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର ରାଏସର ଖରିସାନ ସରକାରୀ ଉଚ୍ଚ ବିଦ୍ୟାଳୟରେ ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ-୨୦୨୬ ସଫଳତାର ସହ ଅନୁଷ୍ଠିତ। ୧୦୦% ପାସ ହାର, ୫୭ ଜଣ ଛାତ୍ରଛାତ୍ରୀ ଉତ୍ତୀର୍ଣ୍ଣ, ୧୮ ଜଣ ଆରକେ ହାଇ ସ୍କୁଲ ପୁରସ୍କାର ପ୍ରାପ୍ତ। ସ୍କୁଲ ଟପର ଓ ବ୍ଲକ ଟପରମାନଙ୍କୁ ଟ୍ରଫି, ପ୍ରମାଣପତ୍ର ଓ ପଦକ ପ୍ରଦାନ। Abhiara Pratibha Samman 2026 held at Raisar Kharisan Govt. High School, Garadpur block, Kendrapara. 100% pass rate, 57 students passed, 18 RK High School awardees. School toppers and block toppers honoured with trophies, certificates, and medals.",
    date: "୪ ଜୁନ ୨୦୨୬",
    location: "ରାଇସର, ଗରଦପୁର, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    imageUrl: "/images/pratibha-samman-top3.jpeg",
    highlight: true,
  },
  {
    category: "community",
    title: "ଅଗ୍ନିକାଣ୍ଡ ପରିବାରକୁ ସହାୟତା. ବସ୍ତ୍ର ଓ ଖାଦ୍ୟସାମଗ୍ରୀ ବଣ୍ଟନ",
    description:
      "ଏକ ପରିବାର ଅଗ୍ନିକାଣ୍ଡରେ ସବୁକିଛି ହରାଇଲା। ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସେମାନଙ୍କ ପାଖକୁ ପହଞ୍ଚି ବସ୍ତ୍ର, ଚାଉଳ ଓ ଖାଦ୍ୟସାମଗ୍ରୀ ପ୍ରଦାନ କଲା। A family lost everything in a fire. Abhiara Foundation reached them and provided clothes, rice, and grocery essentials to help them get back on their feet.",
    date: "ଜୁନ ୨୦୨୬",
    location: "କଙ୍କିଲି ଗ୍ରାମ, ପରଜଙ୍ଗ ବ୍ଲକ, ଢେଙ୍କାନାଳ, ଓଡ଼ିଶା",
    imageUrl: "/images/fire-relief-distribution.jpeg",
    highlight: true,
  },
  {
    category: "education",
    title: "କେନ୍ଦୁଝରରେ ଜରୁରୀ ପରିବାର ସହାୟତା",
    description:
      "କେନ୍ଦୁଝର ଜିଲ୍ଲାରେ ଏକ ଯାଞ୍ଚ ହୋଇଥିବା ପରିବାର ଜରୁରୀ ସମୟରେ ସହାୟତା ପାଇଲେ। ପରିବାରର ଗୋପନୀୟତା ପାଇଁ ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ପ୍ରକାଶ କରାଯାଇନାହିଁ। A verified family in Keonjhar district received timely emergency support. Personal details are not published to protect the family's privacy.",
    date: "ଏପ୍ରିଲ ୨୦୨୬",
    location: "କେଓଁଝର, ଓଡ଼ିଶା",
    highlight: true,
  },
  {
    category: "community",
    title: "ପଣା ସଂକ୍ରାନ୍ତି, ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର",
    description:
      "ପଣା ସଂକ୍ରାନ୍ତି (ମହା ବିଷୁବ ସଂକ୍ରାନ୍ତି / ଓଡ଼ିଶା ସୌର ନୂତନ ବର୍ଷ) ଅବସରରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଆୟୋଜନ, ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର। ଏକ ଛୋଟ ସେବା ପ୍ରୟାସ, କୋରାପୁଟ, କେନ୍ଦ୍ରାପଡ଼ା ଓ ଭୁବନେଶ୍ୱରରେ ଏକସାଥିରେ ଆୟୋଜିତ। Pana Sankranti (Maha Vishuba Sankranti / Odisha Solar New Year), Free Drinking Water Camp organized by Abhiara Foundation across multiple locations: Koraput, Kendrapara, and Bhubaneswar.",
    date: "୧୪ ଏପ୍ରିଲ ୨୦୨୬",
    location: "କୋରାପୁଟ · କେନ୍ଦ୍ରାପଡ଼ା · ଭୁବନେଶ୍ୱର",
    imageUrl: "/images/gallery-water-camp-1.jpg",
    highlight: true,
  },
  {
    category: "education",
    title: "ଗରିବ ସହାୟତା ଓ ସ୍ୱାସ୍ଥ୍ୟ ଶିବିର, କୋରାପୁଟ",
    description:
      "କୋରାପୁଟ ଜିଲ୍ଲାର ଗରିବ ପରିବାରମାନଙ୍କୁ ସହାୟତା, ଶିକ୍ଷା ସାମଗ୍ରୀ ବଣ୍ଟନ, ସ୍ୱାସ୍ଥ୍ୟ ଶିବିର ଆୟୋଜନ ଓ ଦୈନନ୍ଦିନ ଆବଶ୍ୟକତା ପୂରଣ। ଗ୍ରାମାଞ୍ଚଳର ପିଲାମାନଙ୍କୁ ଶିକ୍ଷା ସୁଯୋଗ ପ୍ରଦାନ। Provided education materials, organized health camps, and distributed essentials to underprivileged families in Koraput, helping children and families directly.",
    date: "ଏପ୍ରିଲ ୨୦୨୬",
    location: "କୋରାପୁଟ, ଓଡ଼ିଶା",
    highlight: true,
  },
  {
    category: "education",
    title: "ସୁବିଧାବଞ୍ଚିତ ଶିଶୁ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ, କେନ୍ଦ୍ରାପଡ଼ା",
    description:
      "କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାରେ ସୁବିଧାବଞ୍ଚିତ ପିଲାମାନଙ୍କ ପାଇଁ ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ ଆୟୋଜନ, ବହି, ଖାତା ଓ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ ସହ ମୁକ୍ତ ଆକାଶ ତଳେ ଶିକ୍ଷଣ ଅଧିବେଶନ। Organized a privileged child education programme in Kendrapara, distributing books, notebooks, and conducting open-air learning sessions for underprivileged children.",
    date: "ଏପ୍ରିଲ ୨୦୨୬",
    location: "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    highlight: true,
  },
  {
    category: "elderly",
    title: "ବୃଦ୍ଧାଶ୍ରମ ସେବା, ପୁରୀ",
    description:
      "ପୁରୀ ଜିଲ୍ଲାର ବୃଦ୍ଧାଶ୍ରମରେ ବୟସ୍କ ବ୍ୟକ୍ତିମାନଙ୍କ ସେବା, ଆବଶ୍ୟକ ସାମଗ୍ରୀ ବଣ୍ଟନ, ସ୍ୱାସ୍ଥ୍ୟ ଯତ୍ନ ଓ ସାଥୀ ସେବା। ଏକାକୀ ବୟସ୍କମାନଙ୍କ ସହ ସମୟ ବିତାଇ ସେମାନଙ୍କ ଜୀବନରେ ଆଶା ଓ ସ୍ନେହ ଆଣିବା। Continued our elderly care outreach at old age homes in Puri, distributing essentials, providing companionship, and bringing warmth to those who need it most.",
    date: "ଏପ୍ରିଲ ୨୦୨୬",
    location: "ପୁରୀ, ଓଡ଼ିଶା",
    highlight: true,
  },
  {
    category: "community",
    title: "ପୋୱାଇ ରନ ମାରାଥନ, ମୁମ୍ବାଇ",
    description:
      "ଅଭିଆରା ଫାଉଣ୍ଡେସନର ପ୍ରତିଷ୍ଠାତା ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ ପୋୱାଇ ରନ ମାରାଥନରେ ଅଂଶଗ୍ରହଣ କଲେ, ସ୍ୱାସ୍ଥ୍ୟ ଓ ସାମୁଦାୟିକ ସେବା ପ୍ରତି ସଚେତନତା ବୃଦ୍ଧି ପାଇଁ। ୪ କି.ମି. ଦୌଡ଼ ସଫଳତାର ସହ ସମ୍ପନ୍ନ। Abhiara Foundation founder Abhimanyu Mallik participated in the Powai Run Marathon, running for health awareness and community service. Successfully completed the 4 KM run.",
    date: "ଜାନୁଆରୀ ୨୦୨୬",
    location: "ପୋୱାଇ, ମୁମ୍ବାଇ",
    imageUrl: "/images/gallery-elderly-care-1.jpeg",
    highlight: true,
  },
  {
    category: "elderly",
    title: "Old Age Home Visit at Hope is Life",
    description:
      "Visited Hope is Life Old Age Home in Puri. Distributed essentials and spent quality time with 40+ elderly residents. Listened to their stories, gave them supplies, and and gave them what they needed.",
    date: "October 2025",
    location: "Puri, Odisha",
    highlight: false,
  },
  {
    category: "education",
    title: "ଶିକ୍ଷା ଓ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ, କେନ୍ଦ୍ରାପଡ଼ା",
    description:
      "କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାରେ ସୁବିଧାବଞ୍ଚିତ ପିଲାମାନଙ୍କ ପାଇଁ ଶିକ୍ଷା ଓ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ, ବହି, ଖାତା, ପେନ୍ସିଲ, ବ୍ୟାଗ ଓ ଅନ୍ୟାନ୍ୟ ଶିକ୍ଷା ସାମଗ୍ରୀ ପ୍ରଦାନ। ପିଲାମାନଙ୍କ ମଧ୍ୟରେ ଶିକ୍ଷା ପ୍ରତି ଉତ୍ସାହ ଓ ଆଗ୍ରହ ସୃଷ୍ଟି। Education and study material distribution to underprivileged children in Kendrapara, books, notebooks, pencils, bags and other learning materials provided to encourage enthusiasm for education.",
    date: "ଅକ୍ଟୋବର ୨୦୨୫",
    location: "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    imageUrl: "/images/gallery-education-1.jpeg",
    highlight: true,
  },
  {
    category: "education",
    title: "Book Distribution to Tribal Students",
    description:
      "Distributed books, notebooks, and study materials to 50+ tribal children in Kendrapara, Odisha. Conducted open-air learning sessions alongside the distribution. Because education does not need four walls.",
    date: "October 2025",
    location: "Kendrapara, Odisha",
    highlight: false,
  },
];

type GalleryImage = {
  id?: number;
  src: string;
  alt: string;
  category: "education" | "elderly" | "community" | "events";
  caption: string;
  location: string;
  attribution?: string;
  mediaType?: "photo" | "video";
  thumbnailUrl?: string;
};

const FALLBACK_GALLERY: GalleryImage[] = [
  {
    src: "/images/pratibha-samman-top3.jpeg",
    alt: "Abhiara Pratibha Samman 2026. Top 3 students with trophies and certificates",
    category: "education",
    caption: "Abhiara Pratibha Samman 2026. Top 3 students of Raisar Kharisan High School honoured with trophies, medals, and certificates. 4th June 2026, Garadpur, Kendrapara.",
    attribution: "\u2014 Abhiara Foundation, 4 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-group.jpeg",
    alt: "Abhiara Pratibha Samman 2026. Full group photo of all honoured students, teachers, and guests",
    category: "education",
    caption: "Full group photo: All 57 honoured students with teachers, school committee members, and Abhiara Foundation team at the Pratibha Samman 2026 ceremony. Raisar Kharisan High School, Garadpur, Kendrapara.",
    attribution: "\u2014 Abhiara Foundation, 4 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-certificate.jpeg",
    alt: "Abhiara Pratibha Samman 2026. Student receiving certificate on stage",
    category: "education",
    caption: "A student receives her certificate and trophy at the Abhiara Pratibha Samman 2026 ceremony. Raisar Kharisan High School, Kendrapara.",
    attribution: "\u2014 Abhiara Foundation, 4 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-media-interview.jpeg",
    alt: "Abhiara Pratibha Samman 2026. Student being interviewed by media",
    category: "education",
    caption: "Award-winning student being interviewed by local media after the Abhiara Pratibha Samman 2026 ceremony.",
    attribution: "\u2014 Abhiara Foundation, 4 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-students-media.jpeg",
    alt: "Abhiara Pratibha Samman 2026. Students speaking to media",
    category: "education",
    caption: "Students with their trophies speaking to local media at the Abhiara Pratibha Samman 2026 event.",
    attribution: "\u2014 Abhiara Foundation, 4 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-trophies.jpeg",
    alt: "Abhiara Pratibha Samman 2026. Students with Abhiara Foundation trophy",
    category: "education",
    caption: "Students proudly holding their Abhiara Foundation trophies and certificates at the Pratibha Samman 2026.",
    attribution: "\u2014 Abhiara Foundation, 4 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-committee.jpeg",
    alt: "Abhiara Pratibha Samman 2026. School committee members interviewed",
    category: "education",
    caption: "School committee members and guests being interviewed by media at the Abhiara Pratibha Samman 2026.",
    attribution: "\u2014 Abhiara Foundation, 4 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-sruti-news.jpg",
    alt: "Abhiara Pratibha Samman 2026. Sruti News newspaper coverage",
    category: "education",
    caption: "Sruti News (srutinews.in) coverage of Abhiara Pratibha Samman 2026 at Raisar Kharisan High School, Kendrapara.",
    attribution: "\u2014 Sruti News, June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-newspaper.jpg",
    alt: "Abhiara Pratibha Samman 2026. Newspaper coverage (28 students honoured)",
    category: "education",
    caption: "Newspaper coverage: Abhiara Pratibha Samman. 28 students honoured at Raisar Kharisan High School.",
    attribution: "\u2014 Local newspaper, June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/images/pratibha-samman-sambad.jpg",
    alt: "Abhiara Pratibha Samman 2026. Sambad newspaper coverage (Kendrapara Edition)",
    category: "education",
    caption: "Sambad newspaper (Kendrapara Edition, Page 2, June 5 2026) coverage of Abhiara Pratibha Samman at Raisar Kharisan High School.",
    attribution: "\u2014 Sambad, 5 June 2026",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
  },
  {
    src: "/manus-storage/e65e3323-2a20-48ae-baea-344be2eecf0e_d456647f.MP4",
    alt: "Abhiara Pratibha Samman 2026. Event video",
    category: "education",
    caption: "Video: Abhiara Pratibha Samman 2026 ceremony at Raisar Kharisan High School, Garadpur, Kendrapara.",
    location: "Raisar, Garadpur, Kendrapara, Odisha",
    mediaType: "video",
    thumbnailUrl: "/images/pratibha-samman-top3.jpeg",
  },
  {
    src: "/images/fire-relief-distribution.jpeg",
    alt: "Fire disaster relief. Distributing clothes and groceries to affected family in Kankili village",
    category: "community",
    caption: "Abhiara Foundation provided clothes, rice, and grocery essentials to a family who lost everything in a fire. Kankili village, Parjang block, Dhenkanal, Odisha. June 2026.",
    attribution: "Abhiara Foundation, June 2026",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
  },
  {
    src: "/images/fire-relief-supplies.jpeg",
    alt: "Fire disaster relief. Handing over supplies to the family in Kankili village",
    category: "community",
    caption: "Handing over clothes and essentials to the fire-affected family. Kankili village, Parjang block, Dhenkanal, Odisha. June 2026.",
    attribution: "Abhiara Foundation, June 2026",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
  },
  {
    src: "/images/disaster-relief-team-car.jpeg",
    alt: "Abhiara Foundation relief team with supplies ready for distribution",
    category: "community",
    caption: "The full team with bags of rice, sugar, and essentials loaded and ready for distribution. Kankili village, Parjang block, Dhenkanal, Odisha. August 2026.",
    attribution: "Abhiara Foundation, August 2026",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
  },
  {
    src: "/images/disaster-relief-supplies-handover.jpeg",
    alt: "Abhiara Foundation team handing over supplies to fire-affected family",
    category: "community",
    caption: "Team members delivering rice, groceries, and essentials to the affected family. Kankili village, Parjang block, Dhenkanal, Odisha. August 2026.",
    attribution: "Abhiara Foundation, August 2026",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
  },
  {
    src: "/images/disaster-relief-team-village.jpeg",
    alt: "Abhiara Foundation team with villagers at the disaster site",
    category: "community",
    caption: "The team with community members in front of the damaged house. Kankili village, Parjang block, Dhenkanal, Odisha. August 2026.",
    attribution: "Abhiara Foundation, August 2026",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
  },
  {
    src: "/images/disaster-relief-assessment.jpeg",
    alt: "Damage assessment and documentation at disaster site",
    category: "community",
    caption: "Assessing damage and documenting the situation for relief coordination. Kankili village, Parjang block, Dhenkanal, Odisha. August 2026.",
    attribution: "Abhiara Foundation, August 2026",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
  },
  {
    src: "/images/disaster-relief-distribution.jpeg",
    alt: "Distributing groceries and essentials to affected villagers",
    category: "community",
    caption: "Handing over grocery packets to the affected family members. Kankili village, Parjang block, Dhenkanal, Odisha. August 2026.",
    attribution: "Abhiara Foundation, August 2026",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
  },
  {
    src: "/manus-storage/WhatsAppVideo2026-06-17at9.48.03AM_6bb87510.mp4",
    alt: "Fire disaster relief video. Distributing supplies in Kankili village",
    category: "community",
    caption: "Video: Abhiara Foundation team distributing clothes and groceries to a fire-affected family in Kankili village, Dhenkanal.",
    location: "Kankili, Parjang, Dhenkanal, Odisha",
    mediaType: "video",
    thumbnailUrl: "/images/fire-relief-distribution.jpeg",
  },
  {
    src: "/images/gallery-water-camp-1.jpg",
    alt: "ପଣା ସଂକ୍ରାନ୍ତି ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର ବ୍ୟାନର",
    category: "community",
    caption: "ପଣା ସଂକ୍ରାନ୍ତି, ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର, କୋରାପୁଟ, କେନ୍ଦ୍ରାପଡ଼ା ଓ ଭୁବନେଶ୍ୱରରେ। Pana Sankranti Free Drinking Water Camp across Koraput, Kendrapara & Bhubaneswar.",
    attribution: "Abhiara Foundation, 14 April 2026",
    location: "କୋରାପୁଟ · କେନ୍ଦ୍ରାପଡ଼ା · ଭୁବନେଶ୍ୱର",
  },
  {
    src: "/images/gallery-water-camp-4.jpg",
    alt: "ପଣା ସଂକ୍ରାନ୍ତି ଓ ଆମ୍ବେଦକର ଜୟନ୍ତୀ ବ୍ୟାନର",
    category: "community",
    caption: "ପଣା ସଂକ୍ରାନ୍ତି ଓ ଆମ୍ବେଦକର ଜୟନ୍ତୀ, ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର ଓ ଅଭିଆରା ବିଦ୍ୟାପୀଠ। Pana Sankranti & Ambedkar Jayanti, Free Drinking Water Camp with Abhiara Vidyapeeth.",
    attribution: "Abhiara Foundation, 14 April 2026",
    location: "କୋରାପୁଟ · କେନ୍ଦ୍ରାପଡ଼ା · ଭୁବନେଶ୍ୱର",
  },
  {
    src: "/images/gallery-water-camp-3.jpg",
    alt: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, କୋରାପୁଟ ବ୍ୟାନର",
    category: "community",
    caption: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ଏକ ନିର୍ଭୟ ଆଲୋକର କିରଣ, କୋରାପୁଟ। Abhiara Foundation. A Fearless Ray of Light, Koraput location banner.",
    attribution: "Abhiara Foundation, April 2026",
    location: "କୋରାପୁଟ, ଓଡ଼ିଶା",
  },
  {
    src: "/images/gallery-water-camp-2.jpg",
    alt: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା ବ୍ୟାନର",
    category: "community",
    caption: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ଏକ ନିର୍ଭୟ ଆଲୋକର କିରଣ, ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା। Abhiara Foundation, Raisar, Kendrapara location banner.",
    attribution: "Abhiara Foundation, April 2026",
    location: "ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା",
  },
  {
    src: "/images/gallery-activity-4.jpg",
    alt: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ଭୁବନେଶ୍ୱର ବ୍ୟାନର",
    category: "community",
    caption: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ଏକ ନିର୍ଭୟ ଆଲୋକର କିରଣ, ଭୁବନେଶ୍ୱର। Abhiara Foundation, Bhubaneswar location banner.",
    attribution: "Abhiara Foundation, April 2026",
    location: "ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
  },
  {
    src: "/images/gallery-activity-3.jpg",
    alt: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, A Fearless Ray of Light",
    category: "community",
    caption: "Abhiara Foundation. A Fearless Ray of Light. Rooted from Odisha. Built in Mumbai. Education, Elderly Care, Village Development.",
    attribution: "Abhiara Foundation",
    location: "ପୋୱାଇ, ମୁମ୍ବାଇ",
  },
  {
    src: "/images/gallery-activity-1.jpg",
    alt: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଭୁବନେଶ୍ୱର ସ୍କ୍ୱେୟର ବ୍ୟାନର",
    category: "community",
    caption: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ଭୁବନେଶ୍ୱର ସ୍କ୍ୱେୟର ବ୍ୟାନର। Abhiara Foundation Bhubaneswar square banner.",
    attribution: "Abhiara Foundation",
    location: "ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
  },
  {
    src: "/images/gallery-activity-2.jpg",
    alt: "ପଣା ସଂକ୍ରାନ୍ତି ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର ବ୍ୟାନର (ବିକଳ୍ପ)",
    category: "community",
    caption: "ପଣା ସଂକ୍ରାନ୍ତି ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର, ବିକଳ୍ପ ବ୍ୟାନର। Pana Sankranti Free Drinking Water Camp, alternate banner design.",
    attribution: "Abhiara Foundation, 14 April 2026",
    location: "କୋରାପୁଟ · କେନ୍ଦ୍ରାପଡ଼ା · ଭୁବନେଶ୍ୱର",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/69e342f1-a762-4729-91d3-747212eb67ca_8fa6185e.mp4",
    alt: "ପଣା ସଂକ୍ରାନ୍ତି ଜଳଛତ୍ର ଶିବିର ଭିଡିଓ ୧",
    category: "community",
    caption: "ପଣା ସଂକ୍ରାନ୍ତି ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର ଭିଡିଓ। Pana Sankranti Free Drinking Water Camp video.",
    location: "ଓଡ଼ିଶା",
    mediaType: "video",
    thumbnailUrl: "/images/gallery-water-camp-1.jpg",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/64a07096-1c35-43a2-a467-ee011089d79e_2297c64a.mp4",
    alt: "ପଣା ସଂକ୍ରାନ୍ତି ଜଳଛତ୍ର ଶିବିର ଭିଡିଓ ୨",
    category: "community",
    caption: "ପଣା ସଂକ୍ରାନ୍ତି ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର ଭିଡିଓ। Pana Sankranti Free Drinking Water Camp video 2.",
    location: "ଓଡ଼ିଶା",
    mediaType: "video",
    thumbnailUrl: "/images/gallery-water-camp-1.jpg",
  },
  {
    src: "/images/gallery-elderly-care-1.jpeg",
    alt: "ପୋୱାଇ ରନ ମାରାଥନ, ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ",
    category: "events",
    caption: "ପୋୱାଇ ରନ ମାରାଥନରେ ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ, ସ୍ୱାସ୍ଥ୍ୟ ଓ ସାମୁଦାୟିକ ସେବା ପାଇଁ ଦୌଡ଼ୁଛନ୍ତି। Powai Run Marathon, running for health and community.",
    attribution: "Abhiara Foundation, January 2026",
    location: "ପୋୱାଇ, ମୁମ୍ବାଇ",
  },
  {
    src: "/images/gallery-elderly-care-2.jpeg",
    alt: "ପୋୱାଇ ରନ ମାରାଥନ ମେଡଲ ସହ",
    category: "events",
    caption: "ପୋୱାଇ ରନ ମାରାଥନ ସଫଳତାର ସହ ସମ୍ପନ୍ନ, ୪ କି.ମି. ଦୌଡ଼ ମେଡଲ। Successfully completed 4 KM Powai Run with medal.",
    attribution: "Abhiara Foundation, January 2026",
    location: "ପୋୱାଇ, ମୁମ୍ବାଇ",
  },
  {
    src: "/images/gallery-education-1.jpeg",
    alt: "ଶିକ୍ଷା ଓ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ, ପିଲାମାନଙ୍କ ମଧ୍ୟରେ ଉତ୍ସାହ",
    category: "education",
    caption: "ଶିକ୍ଷା ଓ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ, ପିଲାମାନଙ୍କ ମଧ୍ୟରେ ଶିକ୍ଷା ପ୍ରତି ଉତ୍ସାହ ଓ ଆଗ୍ରହ। Education and study material distribution, enthusiasm for learning among children.",
    attribution: "Abhiara Foundation, October 2025",
    location: "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
  },
  {
    src: "/images/gallery-education-2.jpeg",
    alt: "ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ, ସ୍ୱେଚ୍ଛାସେବୀ ପିଲାମାନଙ୍କ ସହ",
    category: "education",
    caption: "ସ୍ୱେଚ୍ଛାସେବୀ ପିଲାମାନଙ୍କୁ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ପ୍ରଦାନ କରୁଛନ୍ତି। Volunteer distributing study materials to eager children.",
    attribution: "Abhiara Foundation, October 2025",
    location: "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/IMG_5968_ab5bd31e.MOV",
    alt: "ଶିକ୍ଷା ସାମଗ୍ରୀ ବଣ୍ଟନ ଭିଡିଓ",
    category: "education",
    caption: "ଶିକ୍ଷା ସାମଗ୍ରୀ ବଣ୍ଟନ ଭିଡିଓ, କେନ୍ଦ୍ରାପଡ଼ା। Education material distribution video.",
    location: "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    mediaType: "video",
    thumbnailUrl: "/images/gallery-education-1.jpeg",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/IMG_5967_c1e60032.MOV",
    alt: "ପିଲାମାନଙ୍କ ସହ ଶିକ୍ଷା ଅଧିବେଶନ ଭିଡିଓ",
    category: "education",
    caption: "ପିଲାମାନଙ୍କ ସହ ଶିକ୍ଷା ଅଧିବେଶନ, କେନ୍ଦ୍ରାପଡ଼ା। Learning session with children video.",
    location: "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    mediaType: "video",
    thumbnailUrl: "/images/gallery-education-2.jpeg",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/IMG_5969_00b459ef.MOV",
    alt: "ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ ଭିଡିଓ",
    category: "education",
    caption: "ଅଧ୍ୟୟନ ସାମଗ୍ରୀ ବଣ୍ଟନ, କେନ୍ଦ୍ରାପଡ଼ା। Study material distribution video.",
    location: "କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    mediaType: "video",
    thumbnailUrl: "/images/gallery-education-1.jpeg",
  },
  {
    src: "/images/education-village-session.jpeg",
    alt: "Abhiara Foundation education session with tribal children in Odisha",
    category: "education",
    caption: "Book donation and open-air learning session with tribal children. Because education does not need four walls.",
    attribution: "Abhiara Foundation",
    location: "Kendrapara, Odisha",
  },
  {
    src: "/images/education-children-1.jpeg",
    alt: "Book donation to tribal children in Odisha",
    category: "education",
    caption: "Every book we give helps a child learn. That is what we are here for.",
    location: "Kendrapara, Odisha",
  },
  {
    src: "/images/elderly-care-visit-3.jpeg",
    alt: "Abhiara Foundation elderly care visit at Hope is Life Old Age Home",
    category: "elderly",
    caption: "Our first elder care visit. Hope is Life Old Age Home. Listening, learning, and lending a hand.",
    location: "Puri, Odisha",
  },
  {
    src: "/images/elderly-care-visit-1.jpeg",
    alt: "Distributing essentials to elderly residents",
    category: "elderly",
    caption: "Distributing essentials and spending quality time with elders who have no one else to visit them.",
    location: "Puri, Odisha",
  },
  {
    src: "/images/elderly-care-visit-2.jpeg",
    alt: "Elderly care visit. sharing warmth and care",
    category: "elderly",
    caption: "Warmth is not a luxury. It is a human need. We bring it, one visit at a time.",
    location: "Puri, Odisha",
  },
];

const GALLERY_CATEGORIES = [
  { key: "all", label: "All", icon: Camera },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "elderly", label: "Elderly Care", icon: HeartHandshake },
  { key: "community", label: "Community", icon: Users },
  { key: "events", label: "Events", icon: Calendar },
] as const;

type BlogCategory = "elderly-care" | "education" | "csr" | "news";

interface BlogPostItem {
  id: string | number;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: BlogCategory;
  location: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
  author?: string;
}

const FALLBACK_BLOG: BlogPostItem[] = [
  {
    id: "hope-is-life-old-age-home-visit",
    title: "Visit to Hope is Life Old Age Home",
    excerpt: "A historical record of the October 2025 visit in Puri, Odisha, where food, clothing and other essentials were shared.",
    content: [
      "In October 2025, the Abhiara Foundation team visited Hope is Life Old Age Home in Puri, Odisha.",
      "The team spent time with residents and shared food, clothing and other essentials during the visit.",
      "This is a historical activity record. It is not presented as an active elder care programme or a commitment to future support.",
    ],
    date: "2025-10-15",
    category: "elderly-care",
    location: "Puri, Odisha",
    readTime: "4 min read",
    image: "/images/elderly-care-visit-3.jpeg",
    tags: ["Elderly Care", "Puri", "Field Visit", "SDG 3"],
    featured: true,
  },
  {
    id: "kendrapara-book-distribution",
    title: "School Books and Dictionaries Distributed in Raisar",
    excerpt: "School books and dictionaries were distributed in Raisar, Kendrapara on 15 August 2026 to encourage continued education.",
    content: [
      "Abhiara Foundation distributed school books and dictionaries in Raisar, Kendrapara, Odisha on 15 August 2026.",
      "The activity was recorded as an education material distribution programme.",
      "A student count is not published because a verified total is not available in the reviewed record.",
    ],
    date: "2026-08-15",
    category: "education",
    location: "Raisar, Kendrapara, Odisha",
    readTime: "2 min read",
    image: "/images/education-village-session.jpeg",
    tags: ["Education", "Raisar", "Kendrapara", "School Materials"],
    featured: true,
  },
];

const BLOG_CATEGORY_CONFIG: Record<BlogCategory, { label: string; icon: typeof HeartHandshake; color: string }> = {
  "elderly-care": { label: "Elderly Care", icon: HeartHandshake, color: "#F5A623" },
  education: { label: "Education", icon: GraduationCap, color: "#F5A623" },
  csr: { label: "CSR Partnership", icon: Building2, color: "#F5A623" },
  news: { label: "Foundation News", icon: Newspaper, color: "#F5A623" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ══════════════════════════════════════════════════════════ */
type MainTab = "activities" | "gallery";

export default function Activities() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [mainTab, setMainTab] = useState<MainTab>("activities");

  useEffect(() => {
    window.scrollTo(0, 0);
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "gallery") setMainTab("gallery");
    else if (tab === "updates") {
      const language = params.get("lang");
      setLocation(language === "en" || language === "od" ? `/blog?lang=${language}` : "/blog");
    }
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEO
        title={t("Activities, Abhiara Foundation", "କାର୍ଯ୍ୟକଳାପ, ଅଭିଆରା ଫାଉଣ୍ଡେସନ")}
        description={t(
          "Real field activities from education, family support, and emergency help in Odisha.",
          "ଓଡ଼ିଶାରେ ଶିକ୍ଷା, ପରିବାର ସହାୟତା ଓ ଜରୁରୀ ସେବାର ପ୍ରକୃତ କ୍ଷେତ୍ର କାମ।",
        )}
        url="https://abhiarafoundation.org/activities"
      />
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[#111111] to-[#111111]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23F57C00' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundSize: "60px 60px" }} />
        <div className="relative z-10 container text-center">
          <AnimatedSection>
            <p className="section-label mb-4">{t("ON THE GROUND", "ମାଟିରେ ଆମ କାମ")}</p>
            <h1 className="font-serif font-bold text-white leading-[1.1] mb-6" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              {t("Our ", "ଆମର ")}<span className="text-[#F5A623]">{t("Activities", "କାର୍ଯ୍ୟକଳାପ")}</span>
            </h1>
            <div className="gradient-rule mx-auto mb-6" />
            <p className="font-sans text-[17px] text-[#555] max-w-2xl mx-auto leading-relaxed">
              {t(
                "Real work from Odisha. We support students, visit families, and help during emergencies. Every activity shown here comes from work we have actually done.",
                "ଓଡ଼ିଶାର ପ୍ରକୃତ କାମ। ଆମେ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ସହାୟତା କରୁ, ପରିବାରଙ୍କ ପାଖକୁ ଯାଉ ଏବଂ ଜରୁରୀ ସମୟରେ ସାହାଯ୍ୟ କରୁ। ଏଠାରେ ଦେଖାଯାଇଥିବା ପ୍ରତ୍ୟେକ କାର୍ଯ୍ୟ ଆମେ କରିଥିବା କାମରୁ ଆସିଛି।",
              )}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== MAIN TABS ===== */}
      <section className="bg-white border-y border-gray-200 sticky top-[132px] lg:top-[152px] z-30">
        <div className="container flex items-center justify-center gap-2 md:gap-4 py-3">
          {([
            { key: "activities", label: t("Activities", "କାର୍ଯ୍ୟକଳାପ"), icon: Heart },
            { key: "gallery", label: t("Gallery", "ଫଟୋ ଗ୍ୟାଲେରୀ"), icon: Camera },
          ] as { key: MainTab; label: string; icon: typeof Heart }[]).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setMainTab(tab.key)}
                className={`flex items-center gap-2 px-5 md:px-8 py-2.5 font-mono text-[10px] md:text-[11px] tracking-[0.12em] uppercase transition-all cursor-pointer border ${
                  mainTab === tab.key
                    ? "bg-[#F5A623] text-[#1A1A1A] border-[#F5A623] font-bold shadow-lg shadow-[#F5A623]/20"
                    : "bg-transparent text-[#555] border-gray-200 hover:border-[#F5A623]/40 hover:text-[#333]"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== TAB CONTENT ===== */}
      {mainTab === "activities" && <ActivitiesTab />}
      {mainTab === "gallery" && <GalleryTab />}

      {/* ===== YOUTUBE VIDEOS (from CMS) ===== */}
      <YoutubeSection />

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-24 bg-[#F5A623]">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-serif font-bold text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
              {t("Would you like to volunteer?", "ଆପଣ ସ୍ୱେଚ୍ଛାସେବୀ ହେବାକୁ ଚାହୁଁଛନ୍ତି କି?")}
            </h2>
            <p className="font-sans text-[17px] text-[#1A1A1A]/70 max-w-2xl mx-auto leading-relaxed mb-8">
              {t(
                "Give some time when you can. You may help at an activity, with children's studies, or during a village visit.",
                "ସମୟ ଥିଲେ କିଛି ସମୟ ଦିଅନ୍ତୁ। କାର୍ଯ୍ୟକ୍ରମ, ପିଲାମାନଙ୍କ ପାଠପଢ଼ା କିମ୍ବା ଗାଁ ଭେଟ ସମୟରେ ସାହାଯ୍ୟ କରିପାରିବେ।",
              )}
            </p>
            <Link href="/volunteer" className="inline-flex items-center gap-2 px-8 py-3 bg-[#FAFAFA] text-[#F5A623] font-mono text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#FAFAFA] transition-colors">
              {t("SEE VOLUNTEER OPTIONS", "ସ୍ୱେଚ୍ଛାସେବୀ ବିକଳ୍ପ ଦେଖନ୍ତୁ")} <ArrowRight size={12} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== BIRTHDAY WITH PURPOSE ===== */}
      <BirthdayWithPurposeSection />

      <Footer />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 1: ACTIVITIES LIST (DYNAMIC)
   ══════════════════════════════════════════════════════════ */
function ActivitiesTab() {
  const [filter, setFilter] = useState<ActivityCategory>("all");
  const { data: dbActivities = [] } = trpc.cms.activities.listPublished.useQuery();
  const { data: dbSettings = [] } = trpc.cms.settings.listPublic.useQuery();

  const getSetting = (key: string, fallback: string) => {
    const setting = dbSettings.find((item: any) => item.settingKey === key);
    return setting ? setting.settingValue : fallback;
  };

  // Use DB data if available, else fallback
  const activities: ActivityItem[] = useMemo(() => {
    if (dbActivities.length > 0) {
      return dbActivities.map((a: any) => ({
        id: a.id,
        category: a.category === "community" || a.category === "csr" ? "education" : a.category,
        title: a.title,
        description: a.description,
        date: a.date,
        location: a.location,
        highlight: a.sortOrder > 0,
        imageUrl: a.imageUrl,
      }));
    }
    return FALLBACK_ACTIVITIES;
  }, [dbActivities]);

  const filtered = filter === "all" ? activities : activities.filter((a) => a.category === filter);
  const elderlyCount = activities.filter((a) => a.category === "elderly").length;
  const educationCount = activities.filter((a) => a.category === "education").length;
  const communityCount = activities.filter((a) => a.category === "community").length;

  return (
    <>
      {/* Stats */}
      <section className="py-8 section-light">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="light-card px-6 py-4 flex items-center gap-3">
              <Heart size={20} className="text-[#F5A623]" />
              <div className="text-left">
                <p className="font-serif text-2xl font-bold text-[#F5A623]">{elderlyCount}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase light-muted">Elderly Care Activities</p>
              </div>
            </div>
            <div className="light-card px-6 py-4 flex items-center gap-3">
              <BookOpen size={20} className="text-[#F5A623]" />
              <div className="text-left">
                <p className="font-serif text-2xl font-bold text-[#F5A623]">{educationCount}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase light-muted">Education Activities</p>
              </div>
            </div>
            <div className="light-card px-6 py-4 flex items-center gap-3">
              <span className="text-[#F5A623] text-lg">✦</span>
              <div className="text-left">
                <p className="font-serif text-2xl font-bold light-heading">{getSetting("stat_activities_completed", "50")}+</p>
                <p className="font-mono text-[9px] tracking-wider uppercase light-muted">Ground Activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-4 section-light border-b border-gray-200">
        <div className="container flex items-center justify-center gap-3 md:gap-4">
          {([
            { key: "all", label: "All Activities", count: activities.length },
            { key: "elderly", label: "Elderly Care", count: elderlyCount },
            { key: "education", label: "Education", count: educationCount },
            { key: "community", label: "Community", count: communityCount },
          ] as { key: ActivityCategory; label: string; count: number }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 md:px-6 py-2 font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase transition-all duration-300 border ${
                filter === tab.key
                  ? "bg-[#F5A623] text-[#1A1A1A] border-[#F5A623] font-bold"
                  : "bg-transparent text-[#1A1A1A]/60 border-[#111111]/15 hover:border-[#F5A623]/40 hover:text-[#1A1A1A]"
              }`}
            >
              {tab.label} <span className={filter === tab.key ? "text-[#1A1A1A]/60" : "text-[#1A1A1A]/30"}>({tab.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Activity Cards */}
      <section className="py-20 md:py-28 section-light">
        <div className="container max-w-4xl">
          {filter !== "all" && (
            <AnimatedSection className="mb-16">
              <div className="light-card p-6 md:p-8 flex items-start gap-4">
                {filter === "elderly" ? <Heart size={28} className="text-[#F5A623] shrink-0 mt-1" /> : <BookOpen size={28} className="text-[#F5A623] shrink-0 mt-1" />}
                <div>
                  <h2 className="font-serif text-2xl font-bold light-heading mb-2">
                    {filter === "elderly" ? "Elderly Care. Old Age Home Visits" : "Education. Student Support"}
                  </h2>
                  <p className="font-sans text-[16px] light-body leading-relaxed">
                    {filter === "elderly"
                      ? "Our team regularly visits old age homes in Puri, Odisha to provide essentials, companionship, and dignity to elderly residents who need it most."
                      : "We travel to villages in Kendrapara and other districts across Odisha to donate books, notebooks, and learning materials to children who deserve the same opportunities."}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          <div className="space-y-5">
            {filtered.map((activity, idx) => (
              <AnimatedSection key={`${activity.title}-${idx}`} delay={Math.min(idx * 0.05, 0.3)}>
                <div className={`${activity.category === "elderly" ? "light-card-gold" : "light-card"} p-6 md:p-8 transition-all duration-300 ${activity.highlight ? "ring-1 ring-[#F5A623]/[0.06]" : ""}`}>
                  <div className="flex items-start gap-4">
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${activity.category === "elderly" ? "bg-[#F5A623]" : "bg-[#1A1A1A]"}`} />
                      <div className="w-px h-full bg-gray-100 min-h-[40px]" />
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${activity.category === "elderly" ? "bg-[#F5A623]/10" : "bg-[#1A1A1A]/10"}`}>
                      {activity.category === "elderly" ? <Heart size={22} className="text-[#F5A623]" /> : <BookOpen size={22} className="text-[#F5A623]" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-sm ${activity.category === "elderly" ? "bg-[#F5A623]/10 text-[#F5A623]" : "bg-[#1A1A1A]/10 text-[#F5A623]"}`}>
                          {activity.category === "elderly" ? "Elderly Care" : "Education"}
                        </span>
                        {activity.highlight && <span className="font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 rounded-sm bg-[#FAFAFA] light-muted">Featured</span>}
                      </div>
                      <h3 className="font-serif text-lg md:text-xl font-bold light-heading mb-2">{activity.title}</h3>
                      <p className="font-sans text-[16px] light-body leading-relaxed mb-4">{activity.description}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase light-muted"><Calendar size={12} />{activity.date}</span>
                        <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase light-muted"><MapPin size={12} />{activity.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans light-muted">No activities in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 2: GALLERY (DYNAMIC)
   ══════════════════════════════════════════════════════════ */
function GalleryTab() {
  const [filter, setFilter] = useState<"all" | "education" | "elderly" | "community" | "events">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { data: dbPhotos = [] } = trpc.cms.gallery.listPublished.useQuery();
  const { data: dbSettings = [] } = trpc.cms.settings.listPublic.useQuery();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Use DB data if available, else fallback
  const GALLERY_IMAGES: GalleryImage[] = useMemo(() => {
    if (dbPhotos.length > 0) {
      return dbPhotos.map((p: any) => ({
        id: p.id,
        src: p.imageUrl,
        alt: p.title,
        category: p.category,
        caption: p.description || p.title,
        location: p.location || "",
        mediaType: p.mediaType || "photo",
        thumbnailUrl: p.thumbnailUrl || undefined,
      }));
    }
    return FALLBACK_GALLERY;
  }, [dbPhotos]);

  const filtered = filter === "all" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter);

  // Get stats from CMS or use defaults
  const getSetting = (key: string, fallback: string) => {
    const setting = dbSettings.find((s: any) => s.settingKey === key);
    return setting ? setting.settingValue : fallback;
  };

  return (
    <>
      {/* Stats Bar */}
      <section className="section-light py-6 border-b border-gray-200">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: `${getSetting("stat_students_reached", "50")}+`, label: "Students Reached" },
              { value: `${getSetting("stat_families_supported", "20")}+`, label: "Families Supported" },
              { value: `${getSetting("stat_activities_completed", "50")}+`, label: "Ground Activities" },
              { value: `${getSetting("stat_districts", "5")}+`, label: "Districts in Odisha" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-bold text-[#F5A623]">{stat.value}</p>
                <p className="font-mono text-[9px] tracking-wider uppercase light-muted mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 section-light">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {GALLERY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = filter === cat.key;
              return (
                <button key={cat.key} onClick={() => setFilter(cat.key as typeof filter)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-[10px] tracking-[0.12em] uppercase transition-all cursor-pointer ${
                    isActive ? "bg-[#F5A623] text-[#1A1A1A] shadow-lg shadow-[#F5A623]/20" : "bg-white/[0.04] text-[#1A1A1A]/50 border border-[#111111]/10 hover:border-[#F5A623]/30 hover:text-[#F5A623]"
                  }`}
                >
                  <Icon size={14} />{cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-20 section-light">
        <div className="container">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div key={img.src} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightbox(GALLERY_IMAGES.indexOf(img))}
                >
                  <div className="aspect-[3/2] overflow-hidden relative">
                    {img.mediaType === "video" ? (
                      <>
                        {img.thumbnailUrl ? (
                          <img src={img.thumbnailUrl} alt={img.alt} className="w-full h-full object-contain bg-[#F4F0E8]" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center">
                            <span className="text-4xl">🎬</span>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-[#333] text-lg ml-0.5">▶</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img src={img.src} alt={img.alt} className="w-full h-full object-contain bg-[#F4F0E8]" loading="lazy" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className={`inline-block w-fit px-2 py-0.5 rounded-sm font-mono text-[8px] tracking-wider uppercase mb-2 ${
                      img.category === "education" ? "bg-[#1A1A1A]/30 text-[#F5A623]" : img.category === "elderly" ? "bg-[#F5A623]/30 text-[#F5A623]" : "bg-gray-100 text-[#333]"
                    }`}>{img.mediaType === "video" ? "🎬 " : ""}{img.category}</span>
                    <p className="font-sans text-[13px] light-heading leading-relaxed">{img.caption}</p>
                    {img.attribution && <span className="text-[#F5A623] text-xs block mt-1 italic">{img.attribution}</span>}
                    <p className="font-mono text-[9px] tracking-wider uppercase light-muted mt-2">{img.location}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Camera size={40} className="light-muted mx-auto mb-4" />
              <p className="font-sans light-muted">No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-[#555] hover:text-[#333] transition-colors z-10 cursor-pointer" aria-label="Close lightbox"><X size={28} /></button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              {GALLERY_IMAGES[lightbox].mediaType === "video" ? (
                <video src={GALLERY_IMAGES[lightbox].src} className="w-full h-auto max-h-[70vh] rounded-lg" controls autoPlay />
              ) : (
                <img src={GALLERY_IMAGES[lightbox].src} alt={GALLERY_IMAGES[lightbox].alt} className="w-full h-auto max-h-[70vh] object-contain rounded-lg" />
              )}
              <div className="mt-4 text-center">
                <p className="font-sans text-[17px] text-[#333] leading-relaxed max-w-2xl mx-auto">{GALLERY_IMAGES[lightbox].caption}</p>
                {GALLERY_IMAGES[lightbox].attribution && <span className="text-[#F5A623] text-xs block mt-1 italic">{GALLERY_IMAGES[lightbox].attribution}</span>}
                <p className="font-mono text-[10px] tracking-wider uppercase text-[#F5A623] mt-2">{GALLERY_IMAGES[lightbox].location}</p>
              </div>
              <div className="flex items-center justify-center gap-6 mt-6">
                <button onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev !== null && prev > 0 ? prev - 1 : GALLERY_IMAGES.length - 1); }}
                  className="px-4 py-2 border border-gray-200 text-[#555] font-mono text-[10px] tracking-wider uppercase hover:border-[#F5A623]/50 hover:text-[#F5A623] transition-colors cursor-pointer">Previous</button>
                <span className="font-mono text-[10px] text-[#aaa]">{lightbox + 1} / {GALLERY_IMAGES.length}</span>
                <button onClick={(e) => { e.stopPropagation(); setLightbox((prev) => prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : 0); }}
                  className="px-4 py-2 border border-gray-200 text-[#555] font-mono text-[10px] tracking-wider uppercase hover:border-[#F5A623]/50 hover:text-[#F5A623] transition-colors cursor-pointer">Next</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 3: UPDATES (Blog). DYNAMIC
   ══════════════════════════════════════════════════════════ */
function UpdatesTab() {
  const [activeCategory, setActiveCategory] = useState<"all" | BlogCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedPost, setExpandedPost] = useState<string | number | null>(null);
  const { data: dbPosts = [] } = trpc.cms.blog.listPublished.useQuery();

  // Map DB blog posts to our format, or use fallback
  const BLOG_POSTS: BlogPostItem[] = useMemo(() => {
    if (dbPosts.length > 0) {
      return dbPosts.map((p: any) => {
        // Map DB category to our BlogCategory type
        const catMap: Record<string, BlogCategory> = {
          education: "education",
          elderly: "elderly-care",
          csr: "csr",
          announcement: "news",
          event: "news",
        };
        return {
          id: p.id,
          title: p.title,
          excerpt: p.excerpt,
          content: p.content.split("\n\n"),
          date: p.publishedAt ? new Date(p.publishedAt).toISOString().split("T")[0] : new Date(p.createdAt).toISOString().split("T")[0],
          category: catMap[p.category] || "news",
          location: "",
          readTime: `${Math.max(2, Math.ceil(p.content.length / 1000))} min read`,
          image: p.imageUrl || "",
          tags: p.tags ? p.tags.split(",").map((t: string) => t.trim()) : [],
          featured: false,
          author: p.author,
        };
      });
    }
    return FALLBACK_BLOG;
  }, [dbPosts]);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const matchesSearch = searchQuery === "" || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) || post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredPosts = BLOG_POSTS.filter((p) => p.featured).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      {/* Featured Posts */}
      {activeCategory === "all" && searchQuery === "" && featuredPosts.length > 0 && (
        <section className="py-12 section-light">
          <div className="container">
            <AnimatedSection>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-6">FEATURED STORIES</p>
            </AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post, i) => {
                const catConfig = BLOG_CATEGORY_CONFIG[post.category];
                const CatIcon = catConfig.icon;
                return (
                  <AnimatedSection key={post.id} delay={i * 0.08}>
                    <div className="light-card overflow-hidden h-full flex flex-col group cursor-pointer" onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>
                      {post.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img src={post.image} alt={post.title} className="w-full h-full object-contain bg-[#F4F0E8] group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                          <span className="absolute top-3 left-3 font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded-sm backdrop-blur-sm flex items-center gap-1" style={{ backgroundColor: `${catConfig.color}20`, color: catConfig.color, border: `1px solid ${catConfig.color}40` }}>
                            <CatIcon size={10} /> {catConfig.label}
                          </span>
                        </div>
                      )}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-[9px] light-muted flex items-center gap-1"><Calendar size={10} /> {formatDate(post.date)}</span>
                          {post.location && <span className="font-mono text-[9px] light-muted flex items-center gap-1"><MapPin size={10} /> {post.location}</span>}
                        </div>
                        <h3 className="font-serif text-lg font-bold light-heading mb-2 group-hover:text-[#F5A623] transition-colors">{post.title}</h3>
                        <p className="font-sans text-[13px] light-body leading-relaxed flex-1">{post.excerpt}</p>
                        <div className="flex items-center gap-2 mt-4">
                          <Clock size={10} className="light-muted" />
                          <span className="font-mono text-[9px] light-muted">{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="py-8 section-light border-y border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {([
                { key: "all", label: "All Posts" },
                { key: "elderly-care", label: "Elderly Care" },
                { key: "education", label: "Education" },
                { key: "csr", label: "CSR" },
                { key: "news", label: "News" },
              ] as const).map((tab) => (
                <button key={tab.key} onClick={() => setActiveCategory(tab.key)}
                  className={`font-mono text-[10px] tracking-wider uppercase px-4 py-2 transition-all ${activeCategory === tab.key ? "bg-[#F5A623] text-[#1A1A1A] font-bold" : "bg-[#FAFAFA]/5 text-[#1A1A1A]/50 hover:bg-[#FAFAFA]/10 hover:text-[#1A1A1A]/70"}`}
                >{tab.label}</button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30" />
              <input type="text" placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FAFAFA]/5 border border-[#111111]/10 text-[#1A1A1A]/80 font-mono text-xs placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#F5A623]/50" />
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 section-light">
        <div className="container">
          <AnimatedSection>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#F5A623] mb-2">
              {activeCategory === "all" ? "ALL UPDATES" : BLOG_CATEGORY_CONFIG[activeCategory].label.toUpperCase()}
            </p>
            <p className="font-mono text-[10px] light-muted mb-8">{filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"} found</p>
          </AnimatedSection>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-sans light-muted text-lg">No posts found matching your criteria.</p>
              <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="mt-4 font-mono text-[10px] tracking-wider uppercase text-[#F5A623] hover:text-[#E65100] transition-colors">Clear filters</button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPosts.map((post, i) => {
                const catConfig = BLOG_CATEGORY_CONFIG[post.category];
                const CatIcon = catConfig.icon;
                const isExpanded = expandedPost === post.id;
                return (
                  <AnimatedSection key={post.id} delay={i * 0.05}>
                    <motion.article layout className="light-card overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {post.image && (
                          <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-full object-contain bg-[#F4F0E8]" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/60 hidden md:block" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent md:hidden" />
                          </div>
                        )}
                        <div className="p-6 flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded-sm flex items-center gap-1" style={{ backgroundColor: `${catConfig.color}15`, color: catConfig.color, border: `1px solid ${catConfig.color}30` }}>
                              <CatIcon size={10} /> {catConfig.label}
                            </span>
                            <span className="font-mono text-[9px] light-muted flex items-center gap-1"><Calendar size={10} /> {formatDate(post.date)}</span>
                            {post.location && <span className="font-mono text-[9px] light-muted flex items-center gap-1"><MapPin size={10} /> {post.location}</span>}
                            <span className="font-mono text-[9px] light-muted flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                          </div>
                          <h2 className="font-serif text-xl md:text-2xl font-bold light-heading mb-3">{post.title}</h2>
                          <p className="font-sans text-[16px] light-body leading-relaxed mb-4">{post.excerpt}</p>
                          {isExpanded && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4 space-y-4">
                              {post.content.map((para, pi) => (
                                <p key={pi} className="font-sans text-[16px] light-body leading-relaxed">{para}</p>
                              ))}
                            </motion.div>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <span key={tag} className="font-mono text-[8px] tracking-wider uppercase px-2 py-0.5 bg-[#FAFAFA] light-muted border border-[#111111]/10 flex items-center gap-1"><Tag size={8} /> {tag}</span>
                            ))}
                          </div>
                          <button onClick={() => setExpandedPost(isExpanded ? null : post.id)} className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#F5A623] hover:text-[#E65100] transition-colors flex items-center gap-2">
                            {isExpanded ? "READ LESS" : "READ FULL STORY"} <ArrowRight size={12} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatedSection>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   YOUTUBE VIDEOS SECTION (DYNAMIC from CMS)
   ══════════════════════════════════════════════════════════ */
function YoutubeSection() {
  const { data: videos = [] } = trpc.cms.youtube.listPublished.useQuery();

  if (videos.length === 0) return null;

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([^?&]+)/);
    return match?.[1] || "";
  };

  return (
    <section className="py-20 md:py-24 bg-[#FAFAFA]">
      <div className="container">
        <AnimatedSection className="text-center mb-16">
          <p className="section-label mb-4">WATCH</p>
          <h2 className="font-serif font-bold text-[#1A1A1A] mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}>
            Our <span className="text-[#F5A623]">Videos</span>
          </h2>
          <div className="gradient-rule mx-auto" />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map((video: any, i: number) => {
            const ytId = getYoutubeId(video.youtubeUrl);
            if (!ytId) return null;
            return (
              <AnimatedSection key={video.id} delay={i * 0.08}>
                <div className="light-card overflow-hidden">
                  <div className="aspect-video bg-black">
                    <iframe src={`https://www.youtube.com/embed/${ytId}`} className="w-full h-full" allowFullScreen title={video.title} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">{video.title}</h3>
                    {video.description && <p className="font-sans text-[13px] text-[#666] mt-2">{video.description}</p>}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   BIRTHDAY WITH PURPOSE SECTION
   ══════════════════════════════════════════════════════════ */
function BirthdayWithPurposeSection() {
  const { t } = useLanguage();
  const birthdayUrl = "/contact";

  return (
    <section className="py-16 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <p className="text-[#F5A623] uppercase tracking-widest text-sm font-semibold mb-4">#BirthdayWithPurpose</p>
        <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4">
          {t("Celebrate Your Birthday.", "ଆପଣଙ୍କ ଜନ୍ମଦିନ ପାଳନ କରନ୍ତୁ।")}<br />
          <span className="text-[#F5A623]">{t("Share Some Joy.", "କିଛି ଖୁସି ବାଣ୍ଟନ୍ତୁ।")}</span>
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#F5A623] to-[#1A1A1A] mx-auto mb-8" />
        <p className="text-[#333] font-semibold text-2xl leading-relaxed mb-4 max-w-2xl mx-auto">
          {t("Celebrate your day. ", "ଆପଣଙ୍କ ଦିନ ପାଳନ କରନ୍ତୁ। ")}
          <span className="text-[#F5A623]">{t("Help someone too.", "ସେହି ସହ କାହାକୁ ସାହାଯ୍ୟ କରନ୍ତୁ।")}</span>
        </p>
        <p className="text-[#555] text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          {t(
            "If you wish, you can spend your birthday with children, visit elderly people, or support a local activity.",
            "ଆପଣ ଚାହିଁଲେ ପିଲାମାନଙ୍କ ସହ ଜନ୍ମଦିନ ପାଳନ କରିପାରିବେ, ବୟସ୍କ ଲୋକଙ୍କୁ ଭେଟିପାରିବେ କିମ୍ବା ସ୍ଥାନୀୟ କାର୍ଯ୍ୟକ୍ରମକୁ ସାହାଯ୍ୟ କରିପାରିବେ।"
          )}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#FAFAFA] border border-[#F5A623]/30 rounded-2xl p-6">
            <div className="text-3xl mb-3">{"\uD83D\uDCDA"}</div>
            <h3 className="text-[#F5A623] font-semibold mb-3">{t("With Children", "ପିଲାମାନଙ୍କ ସହ")}</h3>
            <p className="text-[#666] text-sm leading-relaxed">{t("Share books or study materials when a visit is planned.", "ଭେଟ ଯୋଜନା ହେଲେ ବହି କିମ୍ବା ପାଠ ସାମଗ୍ରୀ ବାଣ୍ଟନ୍ତୁ।")}</p>
          </div>
          <div className="bg-[#FAFAFA] border border-[#F5A623]/30 rounded-2xl p-6">
            <div className="text-3xl mb-3">{"\uD83E\uDD1D"}</div>
            <h3 className="text-[#F5A623] font-semibold mb-3">{t("With Elderly People", "ବୟସ୍କ ଲୋକଙ୍କ ସହ")}</h3>
            <p className="text-[#666] text-sm leading-relaxed">{t("Spend time, listen, and share a meal when a visit is planned.", "ଭେଟ ଯୋଜନା ହେଲେ ସମୟ ଦିଅନ୍ତୁ, କଥା ଶୁଣନ୍ତୁ ଏବଂ ଖାଦ୍ୟ ବାଣ୍ଟନ୍ତୁ।")}</p>
          </div>
          <div className="bg-[#FAFAFA] border border-[#F5A623]/30 rounded-2xl p-6">
            <div className="text-3xl mb-3">{"\uD83C\uDF31"}</div>
            <h3 className="text-[#F5A623] font-semibold mb-3">{t("In Your Community", "ଆପଣଙ୍କ ଅଞ୍ଚଳରେ")}</h3>
            <p className="text-[#666] text-sm leading-relaxed">{t("Support a local need or help with a community activity.", "ସ୍ଥାନୀୟ ଆବଶ୍ୟକତା କିମ୍ବା ସମୁଦାୟ କାର୍ଯ୍ୟକ୍ରମରେ ସାହାଯ୍ୟ କରନ୍ତୁ।")}</p>
          </div>
        </div>
        <div className="bg-[#F5A623]/10 border border-[#F5A623]/30 rounded-2xl p-8 mb-10">
          <p className="text-[#333] font-semibold text-xl italic leading-relaxed mb-2">{t("Your birthday celebration.", "ଆପଣଙ୍କ ଜନ୍ମଦିନ ପାଳନ।")}</p>
          <p className="text-[#F5A623] font-bold text-xl italic leading-relaxed mb-4">{t("A little help for someone.", "କାହା ପାଇଁ ଟିକିଏ ସାହାଯ୍ୟ।")}</p>
          <p className="text-[#666] text-sm">{t("Celebrate your birthday by sharing time or support.", "ସମୟ କିମ୍ବା ସାହାଯ୍ୟ ବାଣ୍ଟି ଆପଣଙ୍କ ଜନ୍ମଦିନ ପାଳନ କରନ୍ତୁ।")}</p>
          <p className="text-[#F5A623] text-xs mt-3 font-semibold">Abhiara Foundation · #BirthdayWithPurpose</p>
        </div>
        <div className="mb-10">
          <p className="text-[#333] text-base mb-6">{t("Would you like to plan a birthday visit? Contact us.", "ଜନ୍ମଦିନରେ ଏକ ଭେଟ ଯୋଜନା କରିବାକୁ ଚାହୁଁଛନ୍ତି କି? ଆମ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।")}</p>
          <a href={birthdayUrl}
            className="inline-flex items-center gap-3 bg-[#F5A623] hover:bg-[#E8960E] text-[#1A1A1A] font-bold py-4 px-8 rounded-2xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {t("CONTACT US", "ଯୋଗାଯୋଗ କରନ୍ତୁ")} {"\u2192"}
          </a>
        </div>
        <p className="text-[#aaa] text-sm leading-relaxed">
          {t("Share your celebration with others", "ଆପଣଙ୍କ ପାଳନ ଅନ୍ୟମାନଙ୍କ ସହ ବାଣ୍ଟନ୍ତୁ")}<br />
          <span className="text-[#F5A623] font-semibold">#BirthdayWithPurpose · #YourBirthdaySomeoneFuture · #AbhiaraFoundation · #FearlessRayOfLight</span>
        </p>
      </div>
    </section>
  );
}
