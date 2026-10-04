export type BilingualText = {
  en: string;
  od: string;
};

export type ReviewedArchiveRecord = {
  id: string;
  date: BilingualText;
  title: BilingualText;
  summary: BilingualText;
  location: BilingualText;
  result: BilingualText;
  reviewNote: BilingualText;
};

export const FOUNDER_STORY = {
  eyebrow: {
    en: "Founder story",
    od: "ପ୍ରତିଷ୍ଠାତାଙ୍କ କାହାଣୀ",
  },
  title: {
    en: "From Raisar, a village in Kendrapara district, Odisha, to Mumbai",
    od: "ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର ରାଇସର ଗାଁରୁ ମୁମ୍ବାଇ",
  },
  introduction: {
    en: "Abhiara Foundation is a Section 8 not for profit company established to organise verified education support for orphaned and underprivileged children.",
    od: "ଅନାଥ ଓ ସୁବିଧାବଞ୍ଚିତ ଶିଶୁଙ୍କ ପାଇଁ ଯାଞ୍ଚ ଆଧାରିତ ଶିକ୍ଷା ସହାୟତା ସଂଗଠିତ କରିବାକୁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଏକ ଧାରା ୮ ଅଲାଭକାରୀ କମ୍ପାନୀ ଭାବେ ସ୍ଥାପିତ ହୋଇଛି।",
  },
  chapters: [
    {
      label: {
        en: "Raisar village, Kendrapara district, Odisha",
        od: "ରାଇସର ଗ୍ରାମ, କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲା, ଓଡ଼ିଶା",
      },
      title: {
        en: "A rural beginning",
        od: "ଗ୍ରାମରୁ ଆରମ୍ଭ",
      },
      body: {
        en: "Founder Abhimanyu Mallik grew up in his home village of Raisar in Kendrapara district, Odisha. He faced the same shortage of opportunity and guidance that many children from underprivileged families still face today.",
        od: "ପ୍ରତିଷ୍ଠାତା ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର ନିଜ ଗାଁ ରାଇସରରେ ବଢ଼ିଥିଲେ। ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଅନେକ ଶିଶୁ ଆଜି ଯେଉଁ ସୁଯୋଗ ଓ ମାର୍ଗଦର୍ଶନର ଅଭାବ ଦେଖୁଛନ୍ତି, ସେ ମଧ୍ୟ ସେହି ଅଭାବ ଅନୁଭବ କରିଥିଲେ।",
      },
    },
    {
      label: {
        en: "Odisha to Mumbai",
        od: "ଓଡ଼ିଶାରୁ ମୁମ୍ବାଇ",
      },
      title: {
        en: "Building a career",
        od: "ନିଜ କାର୍ଯ୍ୟଜୀବନ ଗଢ଼ିବା",
      },
      body: {
        en: "He built his career in Odisha and later moved to Mumbai to continue his professional work. His rural background provides context for the Foundation's education focus.",
        od: "ସେ ଓଡ଼ିଶାରେ ନିଜ କାର୍ଯ୍ୟଜୀବନ ଗଢ଼ିଥିଲେ ଏବଂ ପରେ ପେଶାଗତ କାମ ଜାରି ରଖିବା ପାଇଁ ମୁମ୍ବାଇ ଯାଇଥିଲେ। ତାଙ୍କ ଗ୍ରାମୀଣ ପୃଷ୍ଠଭୂମି ଫାଉଣ୍ଡେସନର ଶିକ୍ଷା କେନ୍ଦ୍ରିତ କାମର ପରିପ୍ରେକ୍ଷ୍ୟ ଦେଇଥାଏ।",
      },
    },
    {
      label: {
        en: "Why Abhiara",
        od: "ଅଭିଆରା କାହିଁକି",
      },
      title: {
        en: "A structured education response",
        od: "ସଂଗଠିତ ଶିକ୍ଷା ସହାୟତା",
      },
      body: {
        en: "Abhiara Foundation was established to provide structured education support where a child's need can be verified and an approved programme budget is available.",
        od: "ଶିଶୁଙ୍କ ଆବଶ୍ୟକତା ଯାଞ୍ଚ ହୋଇପାରିଲେ ଏବଂ ଅନୁମୋଦିତ କାର୍ଯ୍ୟକ୍ରମ ବଜେଟ ଉପଲବ୍ଧ ଥିଲେ ସଂଗଠିତ ଶିକ୍ଷା ସହାୟତା ଦେବା ପାଇଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ସ୍ଥାପିତ ହୋଇଛି।",
      },
    },
  ],
  turningPoint: {
    title: {
      en: "From background to programme focus",
      od: "ପୃଷ୍ଠଭୂମିରୁ କାର୍ଯ୍ୟକ୍ରମ ଲକ୍ଷ୍ୟ",
    },
    body: {
      en: "The Foundation applies this background through a defined process: receive a request, verify the education need, review available funds, approve support and keep a private programme record.",
      od: "ଫାଉଣ୍ଡେସନ ଏହି ପୃଷ୍ଠଭୂମିକୁ ଏକ ନିର୍ଦ୍ଧାରିତ ପ୍ରକ୍ରିୟାରେ କାର୍ଯ୍ୟକାରୀ କରେ। ଅନୁରୋଧ ଗ୍ରହଣ, ଶିକ୍ଷା ଆବଶ୍ୟକତା ଯାଞ୍ଚ, ଉପଲବ୍ଧ ଅର୍ଥ ସମୀକ୍ଷା, ସହାୟତା ଅନୁମୋଦନ ଏବଂ ବ୍ୟକ୍ତିଗତ କାର୍ଯ୍ୟକ୍ରମ ରେକର୍ଡ ରଖାଯାଏ।",
    },
  },
  sharedBeginning: {
    title: {
      en: "Support for the organisation",
      od: "ସଂଗଠନ ପାଇଁ ସହାୟତା",
    },
    body: {
      en: "Directors, advisors, volunteers and supporters contribute through defined roles. Public information focuses on programme work, governance and verified results rather than private personal stories.",
      od: "ନିର୍ଦ୍ଦେଶକ, ପରାମର୍ଶଦାତା, ସ୍ୱେଚ୍ଛାସେବୀ ଓ ସମର୍ଥକମାନେ ନିର୍ଦ୍ଧାରିତ ଭୂମିକାରେ ଯୋଗଦାନ କରନ୍ତି। ସାର୍ବଜନିକ ସୂଚନା ବ୍ୟକ୍ତିଗତ କାହାଣୀ ପରିବର୍ତ୍ତେ କାର୍ଯ୍ୟକ୍ରମ, ପରିଚାଳନା ଓ ଯାଞ୍ଚ ହୋଇଥିବା ଫଳାଫଳ ଉପରେ କେନ୍ଦ୍ରିତ ରହେ।",
    },
  },
  why: [
    {
      title: {
        en: "Support at the right time",
        od: "ଠିକ ସମୟରେ ସହାୟତା",
      },
      body: {
        en: "A school fee, a book, a bag or clear guidance can help an orphaned or underprivileged child continue learning.",
        od: "ସ୍କୁଲ ଫିସ, ପୁସ୍ତକ, ବ୍ୟାଗ ବା ଠିକ ମାର୍ଗଦର୍ଶନ ଜଣେ ଶିଶୁଙ୍କୁ ପଢ଼ା ଜାରି ରଖିବାରେ ସହାୟତା କରିପାରେ।",
      },
    },
    {
      title: {
        en: "Education with dignity",
        od: "ସମ୍ମାନ ସହ ଶିକ୍ଷା",
      },
      body: {
        en: "The child is not a story for publicity. Support is based on verified need and private details stay protected.",
        od: "ଶିଶୁ ପ୍ରଚାର ପାଇଁ କାହାଣୀ ନୁହେଁ। ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ଅନୁସାରେ ସହାୟତା ଦିଆଯାଏ ଏବଂ ବ୍ୟକ୍ତିଗତ ବିବରଣୀ ସୁରକ୍ଷିତ ରହେ।",
      },
    },
    {
      title: {
        en: "A clear programme scope",
        od: "ସ୍ପଷ୍ଟ କାର୍ଯ୍ୟକ୍ରମ ସୀମା",
      },
      body: {
        en: "Education remains our main focus. Other help is limited, verified and subject to available funds and approved budget.",
        od: "ଶିକ୍ଷା ଆମର ପ୍ରମୁଖ ଲକ୍ଷ୍ୟ। ଅନ୍ୟ ସହାୟତା ସୀମିତ, ଯାଞ୍ଚ ହୋଇଥିବା ଏବଂ ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।",
      },
    },
  ],
  quote: {
    en: "Education support is reviewed through documented need, available funds and an approved programme budget. Child privacy and dignity remain part of every decision.",
    od: "ଲିପିବଦ୍ଧ ଆବଶ୍ୟକତା, ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ କାର୍ଯ୍ୟକ୍ରମ ବଜେଟ ଆଧାରରେ ଶିକ୍ଷା ସହାୟତା ସମୀକ୍ଷା କରାଯାଏ। ପ୍ରତ୍ୟେକ ନିଷ୍ପତ୍ତିରେ ଶିଶୁଙ୍କ ଗୋପନୀୟତା ଓ ସମ୍ମାନ ସୁରକ୍ଷିତ ରହେ।",
  },
  attribution: {
    en: "Abhiara Foundation programme standard",
    od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ କାର୍ଯ୍ୟକ୍ରମ ମାନଦଣ୍ଡ",
  },
} as const;

export const BIRTHDAY_WITH_PURPOSE = {
  title: {
    en: "Birthday with Purpose",
    od: "ଉଦ୍ଦେଶ୍ୟ ସହ ଜନ୍ମଦିନ",
  },
  introduction: {
    en: "Celebrate your birthday with family and friends while helping orphaned children and children from underprivileged families stay in school.",
    od: "ପରିବାର ଓ ସାଙ୍ଗମାନଙ୍କ ସହ ଜନ୍ମଦିନ ପାଳନ କରନ୍ତୁ ଏବଂ ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କୁ ପଢ଼ା ଜାରି ରଖିବାରେ ସହାୟତା କରନ୍ତୁ।",
  },
  shareMessage: {
    en: "For my birthday, I am supporting education through Abhiara Foundation. You can join me with a one-time donation that may help orphaned and underprivileged children stay in school: https://www.abhiarafoundation.org/donate-for-education",
    od: "ମୋ ଜନ୍ମଦିନରେ ମୁଁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ମାଧ୍ୟମରେ ଶିକ୍ଷାକୁ ସହାୟତା କରୁଛି। ଅନାଥ ଓ ସୁବିଧାବଞ୍ଚିତ ଶିଶୁଙ୍କୁ ପଢ଼ା ଜାରି ରଖିବାରେ ସହାୟତା ପାଇଁ ଆପଣ ଏକଥର ଦାନ କରି ଯୋଗ ଦେଇପାରିବେ: https://www.abhiarafoundation.org/donate-for-education",
  },
} as const;

export const REVIEWED_EDUCATION_ARCHIVE: ReviewedArchiveRecord[] = [
  {
    id: "pratibha-samman-2026",
    date: { en: "4 June 2026", od: "୪ ଜୁନ ୨୦୨୬" },
    title: {
      en: "Abhiara Pratibha Samman",
      od: "ଅଭିଆରା ପ୍ରତିଭା ସମ୍ମାନ",
    },
    summary: {
      en: "Students were honoured at Raisar Kharisan High School with trophies, certificates and medals.",
      od: "ରାଇସର ଖରିସାନ ଉଚ୍ଚ ବିଦ୍ୟାଳୟରେ ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ଟ୍ରଫି, ପ୍ରମାଣପତ୍ର ଓ ପଦକ ସହ ସମ୍ମାନିତ କରାଗଲା।",
    },
    location: {
      en: "Garadpur, Kendrapara, Odisha",
      od: "ଗରଦପୁର, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    },
    result: {
      en: "57 students honoured",
      od: "୫୭ ଛାତ୍ରଛାତ୍ରୀ ସମ୍ମାନିତ",
    },
    reviewNote: {
      en: "The date, school, location and count come from the reviewed activity record. Historic media is not shown on this card.",
      od: "ତାରିଖ, ବିଦ୍ୟାଳୟ, ସ୍ଥାନ ଓ ସଂଖ୍ୟା ସମୀକ୍ଷା ହୋଇଥିବା କାର୍ଯ୍ୟକ୍ରମ ରେକର୍ଡରୁ ନିଆଯାଇଛି। ଏହି କାର୍ଡରେ ପୁରୁଣା ମିଡିଆ ଦେଖାଯାଇନାହିଁ।",
    },
  },
  {
    id: "independence-day-books-2026",
    date: { en: "15 August 2026", od: "୧୫ ଅଗଷ୍ଟ ୨୦୨୬" },
    title: {
      en: "School books and dictionaries",
      od: "ସ୍କୁଲ ବହି ଓ ଶବ୍ଦକୋଷ",
    },
    summary: {
      en: "School books and dictionaries were distributed to encourage students to continue their education.",
      od: "ଛାତ୍ରଛାତ୍ରୀଙ୍କୁ ପଢ଼ା ଜାରି ରଖିବାକୁ ଉତ୍ସାହ ଦେବା ପାଇଁ ସ୍କୁଲ ବହି ଓ ଶବ୍ଦକୋଷ ବଣ୍ଟନ କରାଗଲା।",
    },
    location: {
      en: "Raisar, Kendrapara, Odisha",
      od: "ରାଇସର, କେନ୍ଦ୍ରାପଡ଼ା, ଓଡ଼ିଶା",
    },
    result: {
      en: "Books and dictionaries distributed",
      od: "ବହି ଓ ଶବ୍ଦକୋଷ ବଣ୍ଟନ",
    },
    reviewNote: {
      en: "A student count is not published because a verified total is not available in the reviewed record.",
      od: "ସମୀକ୍ଷା ହୋଇଥିବା ରେକର୍ଡରେ ଯାଞ୍ଚ ହୋଇଥିବା ମୋଟ ସଂଖ୍ୟା ନଥିବାରୁ ଛାତ୍ରଛାତ୍ରୀ ସଂଖ୍ୟା ପ୍ରକାଶ ହୋଇନାହିଁ।",
    },
  },
];

export const REVIEWED_SUPPORT_ARCHIVE: ReviewedArchiveRecord[] = [
  {
    id: "pana-sankranti-water-2026",
    date: { en: "14 April 2026", od: "୧୪ ଏପ୍ରିଲ ୨୦୨୬" },
    title: {
      en: "Drinking water service for Pana Sankranti",
      od: "ପଣା ସଂକ୍ରାନ୍ତିରେ ପାନୀୟ ଜଳ ସେବା",
    },
    summary: {
      en: "Free drinking water was served as a public service during Pana Sankranti.",
      od: "ପଣା ସଂକ୍ରାନ୍ତି ଅବସରରେ ସାର୍ବଜନୀନ ସେବା ଭାବେ ନିଶୁଳ୍କ ପାନୀୟ ଜଳ ବଣ୍ଟନ କରାଗଲା।",
    },
    location: {
      en: "Koraput, Kendrapara and Bhubaneswar, Odisha",
      od: "କୋରାପୁଟ, କେନ୍ଦ୍ରାପଡ଼ା ଓ ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶା",
    },
    result: {
      en: "Service at 3 locations",
      od: "୩ ସ୍ଥାନରେ ସେବା",
    },
    reviewNote: {
      en: "No beneficiary count is published. This is a historical community service record, not a current flagship programme.",
      od: "ଲାଭାନ୍ୱିତ ସଂଖ୍ୟା ପ୍ରକାଶ ହୋଇନାହିଁ। ଏହା ପୁରୁଣା ସମାଜ ସେବା ରେକର୍ଡ, ବର୍ତ୍ତମାନର ପ୍ରମୁଖ କାର୍ଯ୍ୟକ୍ରମ ନୁହେଁ।",
    },
  },
  {
    id: "kankili-fire-relief-2026",
    date: { en: "June and August 2026", od: "ଜୁନ ଓ ଅଗଷ୍ଟ ୨୦୨୬" },
    title: {
      en: "Essential supplies after a house fire",
      od: "ଘରେ ଅଗ୍ନିକାଣ୍ଡ ପରେ ଆବଶ୍ୟକ ସାମଗ୍ରୀ",
    },
    summary: {
      en: "After field review, clothes, rice, groceries and household essentials were handed over directly.",
      od: "କ୍ଷେତ୍ର ଯାଞ୍ଚ ପରେ ଲୁଗାପଟା, ଚାଉଳ, ଖାଦ୍ୟସାମଗ୍ରୀ ଓ ଘରୋଇ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ସିଧାସଳଖ ଦିଆଗଲା।",
    },
    location: {
      en: "Kankili, Parjang, Dhenkanal, Odisha",
      od: "କଙ୍କିଲି, ପରଜଙ୍ଗ, ଢେଙ୍କାନାଳ, ଓଡ଼ିଶା",
    },
    result: {
      en: "1 verified family supported",
      od: "୧ ଯାଞ୍ଚ ହୋଇଥିବା ପରିବାରକୁ ସହାୟତା",
    },
    reviewNote: {
      en: "The family name, portrait and private hardship details are not published.",
      od: "ପରିବାରର ନାମ, ଫଟୋ ଓ ବ୍ୟକ୍ତିଗତ କଷ୍ଟର ବିବରଣୀ ପ୍ରକାଶ ହୋଇନାହିଁ।",
    },
  },
  {
    id: "puri-elder-visit-2025",
    date: { en: "October 2025", od: "ଅକ୍ଟୋବର ୨୦୨୫" },
    title: {
      en: "Visit to Hope is Life Old Age Home",
      od: "ହୋପ ଇଜ୍ ଲାଇଫ ବୃଦ୍ଧାଶ୍ରମ ପରିଦର୍ଶନ",
    },
    summary: {
      en: "The team spent time with residents and shared food, clothing and other essentials during the visit.",
      od: "ପରିଦର୍ଶନ ସମୟରେ ଦଳ ବାସିନ୍ଦାଙ୍କ ସହ ସମୟ ବିତାଇଥିଲେ ଏବଂ ଖାଦ୍ୟ, ପୋଷାକ ଓ ଅନ୍ୟ ଆବଶ୍ୟକ ସାମଗ୍ରୀ ଦେଇଥିଲେ।",
    },
    location: { en: "Puri, Odisha", od: "ପୁରୀ, ଓଡ଼ିଶା" },
    result: {
      en: "40+ elder residents visited",
      od: "୪୦+ ବୃଦ୍ଧ ବାସିନ୍ଦାଙ୍କୁ ଭେଟିଥିଲେ",
    },
    reviewNote: {
      en: "This is a historical visit record. It is not presented as an active elder care programme or the planned Abhiara Vidyapitha elder home.",
      od: "ଏହା ଏକ ପୁରୁଣା ପରିଦର୍ଶନ ରେକର୍ଡ। ଏହାକୁ ସକ୍ରିୟ ବୃଦ୍ଧ ସେବା କାର୍ଯ୍ୟକ୍ରମ ବା ପରିକଳ୍ପିତ ଅଭିଆରା ବିଦ୍ୟାପୀଠ ବୃଦ୍ଧ ସେବା ଗୃହ ଭାବେ ଦେଖାଯାଉ ନାହିଁ।",
    },
  },
];
