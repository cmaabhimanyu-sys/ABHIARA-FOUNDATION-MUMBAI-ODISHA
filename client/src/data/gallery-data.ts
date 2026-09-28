/**
 * Gallery Data. Abhiara Foundation
 * 
 * HOW TO ADD NEW PHOTOS/VIDEOS:
 * 1. Upload your image to any CDN or use the S3 upload in the admin panel
 * 2. Add a new entry to the GALLERY_ITEMS array below
 * 3. Commit and push to GitHub. Vercel will auto-deploy
 * 
 * For videos: set type to "video" and provide the direct video URL
 * For photos: set type to "photo" and provide the image URL
 */

export interface GalleryItem {
  id: number;
  type: "photo" | "video";
  src: string; // Image URL or video URL
  thumbnail?: string; // Thumbnail for videos
  title: string;
  description?: string;
  location?: string;
  date?: string; // e.g., "April 2026"
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // ===== MAY 2026. Education Programme & Elderly Care =====
  {
    id: 18,
    type: "photo",
    src: "/images/education-classroom-session.jpeg",
    title: "ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ. ରାଏସର, କେନ୍ଦ୍ରାପଡ଼ା",
    description: "Education session at Raisar, Kendrapara.",
    location: "Raisar, Kendrapara, Odisha",
    date: "May 2026",
  },
  {
    id: 19,
    type: "photo",
    src: "/images/education-classroom-teaching.jpeg",
    title: "ଶିକ୍ଷା. ଶ୍ରେଣୀ ଗୃହରେ ଶିକ୍ଷାଦାନ",
    description: "Volunteer-led classroom session with students.",
    location: "Raisar, Kendrapara, Odisha",
    date: "May 2026",
  },
  {
    id: 20,
    type: "photo",
    src: "/images/education-classroom-gathered.jpeg",
    title: "ଶିକ୍ଷା. ଶିଶୁମାନଙ୍କ ସମାବେଶ",
    description: "Education awareness session at a village school.",
    location: "Kendrapara, Odisha",
    date: "May 2026",
  },
  {
    id: 21,
    type: "photo",
    src: "/images/education-outdoor-session.jpeg",
    title: "ଶିକ୍ଷା. ମୁକ୍ତ ଆକାଶ ତଳେ ପାଠ",
    description: "Outdoor education session with children.",
    location: "Kendrapara, Odisha",
    date: "May 2026",
  },
  {
    id: 22,
    type: "photo",
    src: "/images/elderly-care-village-outreach.jpeg",
    title: "ଗ୍ରାମ ସେବା. ବୟସ୍କ ସେବା",
    description: "Village visit with an elder resident.",
    location: "Raisar, Kendrapara, Odisha",
    date: "May 2026",
  },
  {
    id: 23,
    type: "photo",
    src: "/images/community-village-shop-banner.jpeg",
    title: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ୍. ଗ୍ରାମ ସଚେତନତା",
    description: "Foundation information displayed at a village shop in rural Kendrapara.",
    location: "Raisar, Kendrapara, Odisha",
    date: "May 2026",
  },
  {
    id: 24,
    type: "photo",
    src: "/images/elderly-care-meal.jpeg",
    title: "ବୟସ୍କ ସେବା. ହୋପ ଇଜ୍ ଲାଇଫ୍ ଓଲ୍ଡ ଏଜ୍ ହୋମ",
    description: "Meal service at Hope is Life Old Age Home.",
    location: "Puri, Odisha",
    date: "May 2026",
  },
  {
    id: 25,
    type: "photo",
    src: "/images/elderly-care-celebration.jpeg",
    title: "ବୟସ୍କ ସେବା. ଜନ୍ମଦିନ ଉତ୍ସବ",
    description: "Birthday visit at Hope is Life Old Age Home.",
    location: "Puri, Odisha",
    date: "May 2026",
  },
  // ===== MAY 2026. Video =====
  {
    id: 26,
    type: "video",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/field-activity-video_a50abbfb.mp4",
    thumbnail: "/images/education-outdoor-session.jpeg",
    title: "କ୍ଷେତ୍ର କାର୍ଯ୍ୟକ୍ରମ. ଭିଡିଓ",
    description: "Video from a field activity in Odisha.",
    location: "Odisha",
    date: "May 2026",
  },
  // ===== APRIL 2026. Pana Sankranti Free Drinking Water Camp =====
  {
    id: 6,
    type: "photo",
    src: "/images/water-camp-setup.jpeg",
    title: "ପଣା ସଂକ୍ରାନ୍ତି ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର",
    description: "Free drinking water service on Pana Sankranti, 14 April 2026.",
    location: "Koraput, Odisha",
    date: "April 2026",
  },
  {
    id: 7,
    type: "photo",
    src: "/images/team-bhubaneswar.jpeg",
    title: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ୍ ଭୁବନେଶ୍ୱର ଟିମ୍",
    description: "Volunteers at the free drinking water service.",
    location: "Bhubaneswar, Odisha",
    date: "April 2026",
  },
  {
    id: 8,
    type: "photo",
    src: "/images/water-camp-serving.jpeg",
    title: "ନିଶୁଳ୍କ ଜଳଛତ୍ର. ଶିଶୁମାନଙ୍କୁ ସେବା",
    description: "Serving free drinking water to children and community members during the Pana Sankranti celebrations.",
    location: "Koraput, Odisha",
    date: "April 2026",
  },
  {
    id: 9,
    type: "photo",
    src: "/images/water-camp-children.jpeg",
    title: "ନିଶୁଳ୍କ ଜଳଛତ୍ର. ସମୁଦାୟ ସେବା",
    description: "Community members at the free drinking water service.",
    location: "Kendrapara, Odisha",
    date: "April 2026",
  },
  {
    id: 10,
    type: "photo",
    src: "/images/water-camp-crowd.jpeg",
    title: "ନିଶୁଳ୍କ ଜଳଛତ୍ର. ଭୁବନେଶ୍ୱର",
    description: "Large crowd gathering at the Abhiara Foundation Free Drinking Water Camp in Bhubaneswar.",
    location: "Bhubaneswar, Odisha",
    date: "April 2026",
  },
  // ===== APRIL 2026. Education Programme =====
  {
    id: 11,
    type: "photo",
    src: "/images/education-book-distribution.jpeg",
    title: "ଶିକ୍ଷା. ପୁସ୍ତକ ବିତରଣ",
    description: "Books and slates were distributed as learning materials.",
    location: "Kendrapara, Odisha",
    date: "April 2026",
  },
  {
    id: 12,
    type: "photo",
    src: "/images/education-outdoor-class.jpeg",
    title: "ଶିକ୍ଷା. ମୁକ୍ତ ଆକାଶ ତଳେ ପାଠ",
    description: "Outdoor education session with children.",
    location: "Kendrapara, Odisha",
    date: "April 2026",
  },
  // ===== APRIL 2026. Videos =====
  {
    id: 13,
    type: "video",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/water-camp-video-1_8104b7eb.mp4",
    thumbnail: "/images/water-camp-setup.jpeg",
    title: "ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର. ଭିଡିଓ ୧",
    description: "Free Drinking Water Camp preparation and setup.",
    location: "Odisha",
    date: "April 2026",
  },
  {
    id: 14,
    type: "video",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/water-camp-video-2_5cec3479.mp4",
    thumbnail: "/images/water-camp-crowd.jpeg",
    title: "ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର. ଭିଡିଓ ୨",
    description: "Community participation at the Free Drinking Water Camp.",
    location: "Bhubaneswar, Odisha",
    date: "April 2026",
  },
  {
    id: 15,
    type: "video",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/water-camp-video-3_087a0830.mp4",
    thumbnail: "/images/water-camp-serving.jpeg",
    title: "ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର. ଭିଡିଓ ୩",
    description: "Serving water to community members during Pana Sankranti.",
    location: "Koraput, Odisha",
    date: "April 2026",
  },
  {
    id: 16,
    type: "video",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/water-camp-video-4_ce738a7d.mp4",
    thumbnail: "/images/water-camp-children.jpeg",
    title: "ନିଶୁଳ୍କ ଜଳଛତ୍ର ଶିବିର. ଭିଡିଓ ୪",
    description: "Children at the water camp celebration.",
    location: "Kendrapara, Odisha",
    date: "April 2026",
  },
  {
    id: 17,
    type: "video",
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663432731013/hv6LgfNej6qprpT227NQzW/water-camp-video-5_b973abe4.mp4",
    thumbnail: "/images/education-outdoor-class.jpeg",
    title: "ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ. ଭିଡିଓ",
    description: "Education programme field work video.",
    location: "Odisha",
    date: "April 2026",
  },
  // ===== OCTOBER 2025. First Field Activities =====
  {
    id: 1,
    type: "photo",
    src: "/images/education-village-session.jpeg",
    title: "Education Session with Tribal Children",
    description: "Book distribution and outdoor learning session.",
    location: "Kendrapara, Odisha",
    date: "October 2025",
  },
  {
    id: 2,
    type: "photo",
    src: "/images/education-children-1.jpeg",
    title: "Book Distribution to Tribal Children",
    description: "Books and education materials were distributed to students.",
    location: "Kendrapara, Odisha",
    date: "October 2025",
  },
  {
    id: 3,
    type: "photo",
    src: "/images/elderly-care-visit-3.jpeg",
    title: "Elderly Care Visit. Hope is Life Old Age Home",
    description: "Visit to Hope is Life Old Age Home.",
    location: "Puri, Odisha",
    date: "October 2025",
  },
  {
    id: 4,
    type: "photo",
    src: "/images/elderly-care-visit-1.jpeg",
    title: "Distributing Essentials to Elderly Residents",
    description: "Essentials were distributed during an elder-home visit.",
    location: "Puri, Odisha",
    date: "October 2025",
  },
  {
    id: 5,
    type: "photo",
    src: "/images/elderly-care-visit-2.jpeg",
    title: "Sharing Warmth and Care",
    description: "Time was spent with residents during an elder-home visit.",
    location: "Puri, Odisha",
    date: "October 2025",
  },
];
