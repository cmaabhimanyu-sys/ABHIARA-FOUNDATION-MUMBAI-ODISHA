/**
 * Abhiara Foundation. Bilingual Translations (English + Odia)
 * Each key maps to { en: string, od: string }
 */

export type TranslationKey = keyof typeof translations;

export const translations = {
  // ===== NAVBAR =====
  nav_home: { en: "Home", od: "ମୂଳ ପୃଷ୍ଠା" },
  nav_our_story: { en: "Our Story", od: "ଆମ କାହାଣୀ" },
  nav_vision: { en: "Vision", od: "ଦୃଷ୍ଟି" },
  nav_programs: { en: "Programs", od: "କାର୍ଯ୍ୟକ୍ରମ" },
  nav_csr_partners: { en: "CSR Partners", od: "CSR ସହଭାଗୀ" },
  nav_activities: { en: "Activities", od: "କାର୍ଯ୍ୟକଳାପ" },
  nav_gallery: { en: "Gallery", od: "ଗ୍ୟାଲେରୀ" },
  nav_volunteer: { en: "Volunteer", od: "ସ୍ୱେଚ୍ଛାସେବୀ" },
  nav_impact: { en: "Impact", od: "ପ୍ରଭାବ" },
  nav_media: { en: "Media", od: "ମିଡିଆ" },
  nav_team: { en: "Team", od: "ଦଳ" },
  nav_donate: { en: "Donate", od: "ଦାନ" },
  nav_get_in_touch: { en: "GET IN TOUCH", od: "ଯୋଗାଯୋଗ କରନ୍ତୁ" },

  // ===== HOME PAGE =====
  home_hero_subtitle: { en: "SECTION 8 COMPANY · NOT-FOR-PROFIT · ODISHA · INDIA", od: "ଧାରା ୮ କମ୍ପାନୀ · ଅଲାଭକାରୀ · ଓଡ଼ିଶା · ଭାରତ" },
  home_hero_word1: { en: "Fearless.", od: "ନିର୍ଭୟ।" },
  home_hero_word2: { en: "Purposeful.", od: "ଉଦ୍ଦେଶ୍ୟପୂର୍ଣ୍ଣ।" },
  home_hero_word3: { en: "Rooted.", od: "ମୂଳରେ ଥିବା।" },
  home_hero_desc: {
    en: "Education for every child. Dignity for every elder. Built from the village up.",
    od: "ପ୍ରତ୍ୟେକ ଶିଶୁ ପାଇଁ ଶିକ୍ଷା। ପ୍ରତ୍ୟେକ ବୟସ୍କ ପାଇଁ ସମ୍ମାନ। ଗ୍ରାମରୁ ଗଢ଼ା।"
  },
  home_cta_our_story: { en: "OUR STORY", od: "ଆମ କାହାଣୀ" },
  home_cta_partner: { en: "PARTNER WITH US", od: "ଆମ ସହ ଭାଗୀଦାର ହୁଅନ୍ତୁ" },
  home_what_we_do: { en: "WHAT WE DO", od: "ଆମେ କ'ଣ କରୁ" },
  home_three_pillars: { en: "Our Programmes.", od: "ଆମର କାର୍ଯ୍ୟକ୍ରମ।" },
  home_one_promise: { en: "Clear Programme Scope.", od: "ସ୍ପଷ୍ଟ କାର୍ଯ୍ୟକ୍ରମ ସୀମା।" },
  home_rooted_odisha: { en: "Rooted in Odisha. Scalable across India.", od: "ଓଡ଼ିଶାରେ ମୂଳ। ଭାରତ ଜୁଡ଼ି ବିସ୍ତାରଯୋଗ୍ୟ।" },
  home_education: { en: "Education", od: "ଶିକ୍ଷା" },
  home_elderly_care: { en: "Elderly Care", od: "ବୟସ୍କ ସେବା" },
  home_csr: { en: "CSR Implementation", od: "CSR କାର୍ଯ୍ୟକାରିତା" },
  home_students_targeted: { en: "Students Targeted", od: "ଲକ୍ଷ୍ୟ ଛାତ୍ର" },
  home_elders_supported: { en: "Elders Supported", od: "ସହାୟତା ପ୍ରାପ୍ତ ବୟସ୍କ" },
  home_csr_target: { en: "CSR Target FY26", od: "CSR ଲକ୍ଷ୍ୟ FY26" },
  home_districts: { en: "Districts in Odisha", od: "ଓଡ଼ିଶାର ଜିଲ୍ଲା" },
  home_founder_quote: {
    en: "Abhiara Foundation provides verified education support through approved programmes and documented need.",
    od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଅନୁମୋଦିତ କାର୍ଯ୍ୟକ୍ରମ ଓ ଲିପିବଦ୍ଧ ଆବଶ୍ୟକତା ଆଧାରରେ ଯାଞ୍ଚ ହୋଇଥିବା ଶିକ୍ଷା ସହାୟତା ପ୍ରଦାନ କରେ।"
  },
  home_founder_name: { en: "Abhimanyu Mallik · Founder", od: "ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ · ପ୍ରତିଷ୍ଠାତା" },

  // ===== OUR STORY PAGE =====
  story_hero_title: { en: "Our Story", od: "ଆମ କାହାଣୀ" },
  story_hero_desc: {
    en: "From a remote village in Odisha to the streets of Mumbai, and back again, with purpose.",
    od: "ଓଡ଼ିଶାର ଏକ ଦୂରବର୍ତ୍ତୀ ଗ୍ରାମରୁ ମୁମ୍ବାଇର ରାସ୍ତାକୁ, ଏବଂ ପୁଣି ଫେରିଆସିଲେ, ଉଦ୍ଦେଶ୍ୟ ସହ।"
  },
  story_the_beginning: { en: "THE BEGINNING", od: "ଆରମ୍ଭ" },
  story_raisar: { en: "Raisar, Odisha", od: "ରାଇସର, ଓଡ଼ିଶା" },
  story_journey_title: { en: "A Journey That Started With a Question", od: "ଏକ ପ୍ରଶ୍ନରୁ ଆରମ୍ଭ ହୋଇଥିବା ଯାତ୍ରା" },

  // ===== VISION PAGE =====
  vision_hero_title: { en: "Our Vision", od: "ଆମ ଦୃଷ୍ଟି" },
  vision_mission: { en: "MISSION", od: "ଲକ୍ଷ୍ୟ" },
  vision_vision: { en: "VISION", od: "ଦୃଷ୍ଟି" },

  // ===== PROGRAMS PAGE =====
  programs_hero_title: { en: "Our Programmes", od: "ଆମ କାର୍ଯ୍ୟକ୍ରମ" },
  programs_hero_desc: {
    en: "Every programme is designed to create lasting, measurable impact in the communities we serve. Rooted in Odisha, scalable across India.",
    od: "ପ୍ରତ୍ୟେକ କାର୍ଯ୍ୟକ୍ରମ ଆମେ ସେବା କରୁଥିବା ସମ୍ପ୍ରଦାୟରେ ସ୍ଥାୟୀ, ମାପଯୋଗ୍ୟ ପ୍ରଭାବ ସୃଷ୍ଟି କରିବା ପାଇଁ ଡିଜାଇନ୍ ହୋଇଛି। ଓଡ଼ିଶାରେ ମୂଳ, ଭାରତ ଜୁଡ଼ି ବିସ୍ତାରଯୋଗ୍ୟ।"
  },
  programs_education_title: { en: "Education & Child Development", od: "ଶିକ୍ଷା ଏବଂ ଶିଶୁ ବିକାଶ" },
  programs_elderly_title: { en: "Elderly Care & Dignity", od: "ବୟସ୍କ ସେବା ଏବଂ ସମ୍ମାନ" },
  programs_csr_title: { en: "CSR Implementation", od: "CSR କାର୍ଯ୍ୟକାରିତା" },
  programs_disaster_title: { en: "Disaster Relief & Emergency Response", od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା ଏବଂ ଜରୁରୀ ପ୍ରତିକ୍ରିୟା" },
  programs_remedial_title: { en: "Remedial Classes & After-School Tutoring", od: "ସଂଶୋଧନ ଶ୍ରେଣୀ ଏବଂ ବିଦ୍ୟାଳୟ ପରେ ଟ୍ୟୁଟରିଂ" },
  programs_health_title: { en: "Health Camps & Wellness Drives", od: "ସ୍ୱାସ୍ଥ୍ୟ ଶିବିର ଏବଂ ସୁସ୍ଥତା ଅଭିଯାନ" },
  programs_alumni_title: { en: "Scholarship Alumni Network", od: "ବୃତ୍ତି ଆଲୁମ୍ନି ନେଟୱାର୍କ" },

  // ===== CSR PARTNERS PAGE =====
  csr_hero_title: { en: "CSR Partners", od: "CSR ସହଭାଗୀ" },
  csr_hero_desc: {
    en: "Partner with Abhiara Foundation for transparent, impactful CSR implementation under Schedule VII of the Companies Act.",
    od: "କମ୍ପାନୀ ଆଇନର ଅନୁସୂଚୀ VII ଅଧୀନରେ ସ୍ୱଚ୍ଛ, ପ୍ରଭାବଶାଳୀ CSR କାର୍ଯ୍ୟକାରିତା ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସହ ଭାଗୀଦାର ହୁଅନ୍ତୁ।"
  },

  // ===== ACTIVITIES PAGE =====
  activities_hero_title: { en: "Activities & Gallery", od: "କାର୍ଯ୍ୟକଳାପ ଏବଂ ଗ୍ୟାଲେରୀ" },
  activities_tab_activities: { en: "Activities", od: "କାର୍ଯ୍ୟକଳାପ" },
  activities_tab_gallery: { en: "Gallery", od: "ଗ୍ୟାଲେରୀ" },
  activities_tab_updates: { en: "Updates", od: "ଅପଡେଟ୍" },

  // ===== VOLUNTEER PAGE =====
  volunteer_hero_title: { en: "Volunteer With", od: "ସ୍ୱେଚ୍ଛାସେବୀ ହୁଅନ୍ତୁ" },
  volunteer_hero_accent: { en: "Abhiara", od: "ଅଭିଆରା" },
  volunteer_hero_desc: {
    en: "Your time, skills, and passion can transform lives. Join our community of changemakers working across education, elderly care, and disaster response in Odisha.",
    od: "ଆପଣଙ୍କ ସମୟ, ଦକ୍ଷତା ଏବଂ ଆବେଗ ଜୀବନ ବଦଳାଇ ପାରେ। ଓଡ଼ିଶାରେ ଶିକ୍ଷା, ବୟସ୍କ ସେବା ଏବଂ ବିପର୍ଯ୍ୟୟ ପ୍ରତିକ୍ରିୟାରେ କାମ କରୁଥିବା ଆମ ପରିବର୍ତ୍ତନକାରୀ ସମ୍ପ୍ରଦାୟରେ ଯୋଗ ଦିଅନ୍ତୁ।"
  },
  volunteer_why: { en: "WHY VOLUNTEER", od: "କାହିଁକି ସ୍ୱେଚ୍ଛାସେବୀ" },
  volunteer_your_time: { en: "Your Time Creates", od: "ଆପଣଙ୍କ ସମୟ ସୃଷ୍ଟି କରେ" },
  volunteer_lasting_impact: { en: "Lasting Impact", od: "ସ୍ଥାୟୀ ପ୍ରଭାବ" },
  volunteer_weekend_teaching: { en: "Weekend Teaching", od: "ସପ୍ତାହାନ୍ତ ଶିକ୍ଷାଦାନ" },
  volunteer_elder_visits: { en: "Elder Companion Visits", od: "ବୟସ୍କ ସାଥୀ ପରିଦର୍ଶନ" },
  volunteer_event_support: { en: "Event Support", od: "ଇଭେଣ୍ଟ ସହାୟତା" },
  volunteer_corporate: { en: "CORPORATE VOLUNTEERING", od: "କର୍ପୋରେଟ ସ୍ୱେଚ୍ଛାସେବା" },
  volunteer_employee_days: { en: "Employee Engagement Days", od: "କର୍ମଚାରୀ ସଂଯୋଗ ଦିବସ" },
  volunteer_fundraise: { en: "FUNDRAISE WITH US", od: "ଆମ ସହ ଅର୍ଥ ସଂଗ୍ରହ କରନ୍ତୁ" },
  volunteer_events_inspire: { en: "Events That", od: "ଇଭେଣ୍ଟ ଯାହା" },
  volunteer_inspire_action: { en: "Inspire Action", od: "କାର୍ଯ୍ୟକୁ ପ୍ରେରିତ କରେ" },
  volunteer_ready: { en: "Ready to Make a Difference?", od: "ପରିବର୍ତ୍ତନ ଆଣିବାକୁ ପ୍ରସ୍ତୁତ?" },
  volunteer_register: { en: "REGISTER AS VOLUNTEER", od: "ସ୍ୱେଚ୍ଛାସେବୀ ଭାବରେ ପଞ୍ଜୀକରଣ" },
  volunteer_whatsapp: { en: "WHATSAPP US", od: "ୱାଟ୍ସଆପ୍ କରନ୍ତୁ" },

  // ===== IMPACT PAGE =====
  impact_hero_title: { en: "Impact &", od: "ପ୍ରଭାବ ଏବଂ" },
  impact_hero_accent: { en: "Transparency", od: "ସ୍ୱଚ୍ଛତା" },
  impact_hero_desc: {
    en: "Every rupee is accounted for. Every impact is documented. We believe in full transparency. Because trust is earned through action, not words.",
    od: "ପ୍ରତ୍ୟେକ ଟଙ୍କାର ହିସାବ ରଖାଯାଏ। ପ୍ରତ୍ୟେକ ପ୍ରଭାବ ଦଲିଲଭୁକ୍ତ। ଆମେ ସମ୍ପୂର୍ଣ୍ଣ ସ୍ୱଚ୍ଛତାରେ ବିଶ୍ୱାସ କରୁ। କାରଣ ବିଶ୍ୱାସ କାର୍ଯ୍ୟ ଦ୍ୱାରା ଅର୍ଜିତ ହୁଏ, ଶବ୍ଦ ଦ୍ୱାରା ନୁହେଁ।"
  },
  impact_fund_utilisation: { en: "FUND UTILISATION", od: "ଅର୍ଥ ବ୍ୟବହାର" },
  impact_how_money_spent: { en: "How Your", od: "ଆପଣଙ୍କ" },
  impact_money_spent: { en: "Money is Spent", od: "ଟଙ୍କା କେମିତି ଖର୍ଚ୍ଚ ହୁଏ" },
  impact_education_programmes: { en: "Education Programmes", od: "ଶିକ୍ଷା କାର୍ଯ୍ୟକ୍ରମ" },
  impact_elderly_care: { en: "Elderly Care", od: "ବୟସ୍କ ସେବା" },
  impact_disaster_relief: { en: "Disaster Relief", od: "ବିପର୍ଯ୍ୟୟ ସହାୟତା" },
  impact_operations: { en: "Operations & Admin", od: "ପରିଚାଳନା ଏବଂ ପ୍ରଶାସନ" },
  impact_reserve: { en: "Reserve Fund", od: "ସଂରକ୍ଷିତ ପାଣ୍ଠି" },
  impact_commitment: {
    en: "90% of all funds go directly to programmes. Administrative costs are kept below 10% through volunteer-driven operations and lean management.",
    od: "ସମସ୍ତ ପାଣ୍ଠିର ୯୦% ସିଧା କାର୍ଯ୍ୟକ୍ରମକୁ ଯାଏ। ସ୍ୱେଚ୍ଛାସେବୀ-ଚାଳିତ ପରିଚାଳନା ଏବଂ ସଂକ୍ଷିପ୍ତ ପ୍ରବନ୍ଧନ ମାଧ୍ୟମରେ ପ୍ରଶାସନିକ ଖର୍ଚ୍ଚ ୧୦% ତଳେ ରଖାଯାଏ।"
  },
  impact_so_far: { en: "IMPACT SO FAR", od: "ଏପର୍ଯ୍ୟନ୍ତ ପ୍ରଭାବ" },
  impact_numbers_matter: { en: "Numbers That", od: "ସଂଖ୍ୟା ଯାହା" },
  impact_matter: { en: "Matter", od: "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ" },
  impact_students_reached: { en: "Students Reached", od: "ପହଞ୍ଚିଥିବା ଛାତ୍ର" },
  impact_elders_visited: { en: "Elders Visited", od: "ପରିଦର୍ଶିତ ବୟସ୍କ" },
  impact_activities_completed: { en: "Activities Completed", od: "ସମ୍ପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟକଳାପ" },
  impact_target_2026: { en: "Target 2026", od: "ଲକ୍ଷ୍ୟ ୨୦୨୬" },
  impact_governance: { en: "GOVERNANCE", od: "ଶାସନ" },
  impact_transparency_pledge: { en: "Our Transparency Pledge", od: "ଆମର ସ୍ୱଚ୍ଛତା ପ୍ରତିଜ୍ଞା" },
  impact_annual_reports: { en: "Annual Reports", od: "ବାର୍ଷିକ ରିପୋର୍ଟ" },
  impact_download_csr: { en: "Download CSR Proposal", od: "CSR ପ୍ରସ୍ତାବ ଡାଉନଲୋଡ୍ କରନ୍ତୁ" },

  // ===== MEDIA PAGE =====
  media_hero_title: { en: "Media", od: "ମିଡିଆ" },
  media_hero_accent: { en: "Room", od: "କକ୍ଷ" },
  media_hero_desc: {
    en: "Official announcements, press releases, and news coverage. For media inquiries, reach out to info@abhiarafoundation.org.",
    od: "ଅଧିକୃତ ଘୋଷଣା, ସାମ୍ବାଦିକ ବିଜ୍ଞପ୍ତି, ଏବଂ ସମ୍ବାଦ ସମ୍ପ୍ରଚାର। ମିଡିଆ ଅନୁସନ୍ଧାନ ପାଇଁ info@abhiarafoundation.org ରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।"
  },
  media_press_releases: { en: "PRESS RELEASES", od: "ସାମ୍ବାଦିକ ବିଜ୍ଞପ୍ତି" },
  media_official: { en: "Official", od: "ଅଧିକୃତ" },
  media_announcements: { en: "Announcements", od: "ଘୋଷଣା" },
  media_news: { en: "NEWS & RECOGNITION", od: "ସମ୍ବାଦ ଏବଂ ସ୍ୱୀକୃତି" },
  media_coverage: { en: "Coverage &", od: "ସମ୍ପ୍ରଚାର ଏବଂ" },
  media_milestones: { en: "Milestones", od: "ମାଇଲଖୁଣ୍ଟ" },
  media_newsletter: { en: "NEWSLETTER", od: "ସମ୍ବାଦପତ୍ର" },
  media_quarterly: { en: "Quarterly Impact Updates", od: "ତ୍ରୈମାସିକ ପ୍ରଭାବ ଅପଡେଟ୍" },
  media_inquiries: { en: "Media Inquiries", od: "ମିଡିଆ ଅନୁସନ୍ଧାନ" },

  // ===== TEAM PAGE =====
  team_hero_title: { en: "Our Team", od: "ଆମ ଦଳ" },
  team_hero_desc: {
    en: "The people behind Abhiara Foundation. Driven by purpose, united by the belief that every life deserves dignity.",
    od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ପଛରେ ଥିବା ବ୍ୟକ୍ତିମାନେ। ଉଦ୍ଦେଶ୍ୟ ଦ୍ୱାରା ଚାଳିତ, ପ୍ରତ୍ୟେକ ଜୀବନ ସମ୍ମାନର ହକଦାର ବୋଲି ବିଶ୍ୱାସରେ ଏକଜୁଟ।"
  },
  team_board: { en: "BOARD OF DIRECTORS", od: "ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳୀ" },
  team_advisors: { en: "ADVISORS", od: "ଉପଦେଷ୍ଟା" },
  team_join: { en: "Join as Core Member", od: "ମୂଳ ସଦସ୍ୟ ଭାବରେ ଯୋଗ ଦିଅନ୍ତୁ" },

  // ===== DONATE PAGE =====
  donate_hero_title: { en: "Support Our Mission", od: "ଆମ ଲକ୍ଷ୍ୟକୁ ସମର୍ଥନ କରନ୍ତୁ" },
  donate_hero_desc: {
    en: "Every contribution, no matter how small, creates a ripple of change across communities in Odisha.",
    od: "ପ୍ରତ୍ୟେକ ଅବଦାନ, ଯେତେ ଛୋଟ ହେଉ, ଓଡ଼ିଶାର ସମ୍ପ୍ରଦାୟରେ ପରିବର୍ତ୍ତନର ଲହରୀ ସୃଷ୍ଟି କରେ।"
  },

  // ===== CONTACT PAGE =====
  contact_hero_title: { en: "Get In Touch", od: "ଯୋଗାଯୋଗ କରନ୍ତୁ" },
  contact_hero_desc: {
    en: "Have a question, want to partner, or ready to volunteer? We would love to hear from you.",
    od: "ଆପଣଙ୍କର ପ୍ରଶ୍ନ ଅଛି, ଭାଗୀଦାର ହେବାକୁ ଚାହୁଁଛନ୍ତି, କିମ୍ବା ସ୍ୱେଚ୍ଛାସେବୀ ହେବାକୁ ପ୍ରସ୍ତୁତ? ଆମେ ଆପଣଙ୍କଠାରୁ ଶୁଣିବାକୁ ଚାହୁଁ।"
  },

  // ===== COMMON / SHARED =====
  common_learn_more: { en: "Learn More", od: "ଅଧିକ ଜାଣନ୍ତୁ" },
  common_contact_us: { en: "CONTACT US", od: "ଯୋଗାଯୋଗ କରନ୍ତୁ" },
  common_read_more: { en: "Read More", od: "ଅଧିକ ପଢ଼ନ୍ତୁ" },
  common_see_programme: { en: "See Programme", od: "କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ" },
  common_partner_with_us: { en: "Partner With Us", od: "ଆମ ସହ ଭାଗୀଦାର ହୁଅନ୍ତୁ" },
  common_subscribe: { en: "SUBSCRIBE", od: "ସଦସ୍ୟତା ନିଅନ୍ତୁ" },
  common_ask_anything: { en: "ASK US ANYTHING", od: "ଆମକୁ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ" },

  // ===== FOOTER =====
  footer_navigate: { en: "Navigate", od: "ନେଭିଗେଟ୍" },
  footer_connect: { en: "Connect", od: "ସଂଯୋଗ" },
  footer_manifesto: {
    en: "Raisar to Mumbai. And back, with purpose.",
    od: "ରାଇସରରୁ ମୁମ୍ବାଇ। ଏବଂ ଫେରିଆସିଲେ, ଉଦ୍ଦେଶ୍ୟ ସହ।"
  },
  footer_rights: { en: "All rights reserved.", od: "ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।" },
} as const;

/** Helper: get translation by key */
export function getTranslation(key: TranslationKey, lang: "en" | "od"): string {
  return translations[key][lang];
}
