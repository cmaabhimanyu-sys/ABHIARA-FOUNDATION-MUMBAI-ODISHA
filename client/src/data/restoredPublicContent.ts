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
    en: "From Raisar, a small rural village in Kendrapara district, Odisha, to Mumbai",
    od: "ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର ଛୋଟ ଗ୍ରାମ ରାଇସରରୁ ମୁମ୍ବାଇ",
  },
  introduction: {
    en: "Abhiara Foundation grew from a simple belief. The support we receive in life should one day be passed on to someone who needs it.",
    od: "ଅଭିଆରା ଫାଉଣ୍ଡେସନ ଏକ ସରଳ ବିଶ୍ୱାସରୁ ଗଢ଼ିଉଠିଛି। ଜୀବନରେ ଆମେ ପାଇଥିବା ସହାୟତା ଦିନେ ଆବଶ୍ୟକତାରେ ଥିବା ଅନ୍ୟ ଜଣଙ୍କ ପାଖକୁ ପହଞ୍ଚିବା ଉଚିତ।",
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
        en: "Founder Abhimanyu Mallik grew up in Raisar, a rural village in Kendrapara, Odisha. He faced the same shortage of opportunity and guidance that many children from underprivileged families still face today.",
        od: "ପ୍ରତିଷ୍ଠାତା ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ଜିଲ୍ଲାର ଗ୍ରାମୀଣ ରାଇସରରେ ବଢ଼ିଥିଲେ। ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଅନେକ ଶିଶୁ ଆଜି ଯେଉଁ ସୁଯୋଗ ଓ ମାର୍ଗଦର୍ଶନର ଅଭାବ ଦେଖୁଛନ୍ତି, ସେ ମଧ୍ୟ ସେହି ଅଭାବ ଅନୁଭବ କରିଥିଲେ।",
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
        en: "He built his career in Odisha and later moved to Mumbai to continue his work. Family sacrifice, guidance from teachers and friends, and timely help from others made that journey possible.",
        od: "ସେ ଓଡ଼ିଶାରେ ନିଜ କାର୍ଯ୍ୟଜୀବନ ଗଢ଼ିଥିଲେ ଏବଂ ପରେ କାମ ଆଗକୁ ନେବା ପାଇଁ ମୁମ୍ବାଇ ଯାଇଥିଲେ। ପରିବାରର ତ୍ୟାଗ, ଶିକ୍ଷକ ଓ ସାଙ୍ଗମାନଙ୍କର ମାର୍ଗଦର୍ଶନ ଏବଂ ଅନ୍ୟମାନଙ୍କ ସମୟୋଚିତ ସହାୟତା ଏହି ଯାତ୍ରାକୁ ସମ୍ଭବ କରିଥିଲା।",
      },
    },
    {
      label: {
        en: "Why Abhiara",
        od: "ଅଭିଆରା କାହିଁକି",
      },
      title: {
        en: "Passing support forward",
        od: "ସହାୟତାକୁ ଆଗକୁ ପହଞ୍ଚାଇବା",
      },
      body: {
        en: "As his life moved forward, he met orphaned children and children from underprivileged families who were struggling to continue school. He felt that the help he had received should reach them too. This became the purpose of Abhiara Foundation.",
        od: "ଜୀବନ ଆଗକୁ ବଢ଼ିବା ସହ ସେ ପଢ଼ା ଜାରି ରଖିବାରେ କଷ୍ଟ ପାଉଥିବା ଅନାଥ ଶିଶୁ ଓ ସୁବିଧାବଞ୍ଚିତ ପରିବାରର ଶିଶୁଙ୍କୁ ଦେଖିଥିଲେ। ନିଜେ ପାଇଥିବା ସହାୟତା ସେମାନଙ୍କ ପାଖକୁ ମଧ୍ୟ ପହଞ୍ଚିବା ଉଚିତ ବୋଲି ସେ ଭାବିଲେ। ଏହି ଭାବନାରୁ ଅଭିଆରା ଫାଉଣ୍ଡେସନର ଉଦ୍ଦେଶ୍ୟ ଗଢ଼ିଉଠିଲା।",
      },
    },
  ],
  turningPoint: {
    title: {
      en: "What stayed with him",
      od: "ଯାହା ତାଙ୍କ ମନରେ ରହିଗଲା",
    },
    body: {
      en: "No one moves forward alone. Behind every opportunity, there are often people who give advice, encouragement or practical help at the right time. Abhiara was built to pass that support forward, one child and one checked need at a time.",
      od: "କେହି ଏକା ଆଗକୁ ବଢ଼ନ୍ତି ନାହିଁ। ପ୍ରତ୍ୟେକ ସୁଯୋଗ ପଛରେ ଅନେକ ସମୟରେ ଠିକ ସମୟରେ ପରାମର୍ଶ, ଉତ୍ସାହ ବା ବ୍ୟବହାରିକ ସହାୟତା ଦେଇଥିବା ଲୋକ ରହନ୍ତି। ସେହି ସହାୟତାକୁ ଗୋଟିଏ ଶିଶୁ ଓ ଗୋଟିଏ ଯାଞ୍ଚ ହୋଇଥିବା ଆବଶ୍ୟକତା ମାଧ୍ୟମରେ ଆଗକୁ ପହଞ୍ଚାଇବା ପାଇଁ ଅଭିଆରା ଗଢ଼ାଯାଇଛି।",
    },
  },
  sharedBeginning: {
    title: {
      en: "A few friends stood with Abhiara",
      od: "କିଛି ସାଙ୍ଗ ଅଭିଆରା ସହ ଠିଆ ହେଲେ",
    },
    body: {
      en: "This story begins with the founder. A few friends had also grown up with limited opportunities. After building their careers, they chose to support Abhiara Foundation. Their private stories are not published. What matters here is their decision to help children stay in school.",
      od: "ଏହି କାହାଣୀ ପ୍ରତିଷ୍ଠାତାଙ୍କଠାରୁ ଆରମ୍ଭ ହୁଏ। କିଛି ସାଙ୍ଗ ମଧ୍ୟ ସୀମିତ ସୁଯୋଗ ମଧ୍ୟରେ ବଢ଼ିଥିଲେ। ନିଜ କାର୍ଯ୍ୟଜୀବନ ଗଢ଼ିବା ପରେ ସେମାନେ ଅଭିଆରା ଫାଉଣ୍ଡେସନକୁ ସହାୟତା କରିବାକୁ ବାଛିଲେ। ସେମାନଙ୍କ ବ୍ୟକ୍ତିଗତ କାହାଣୀ ପ୍ରକାଶ ହୁଏ ନାହିଁ। ଏଠାରେ ମୁଖ୍ୟ କଥା ହେଉଛି ଶିଶୁଙ୍କ ପଢ଼ା ଜାରି ରଖିବାରେ ସହାୟତା କରିବା ପାଇଁ ସେମାନଙ୍କ ନିଷ୍ପତ୍ତି।",
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
        en: "A clear promise",
        od: "ଏକ ସ୍ପଷ୍ଟ ପ୍ରତିଶ୍ରୁତି",
      },
      body: {
        en: "Education remains our main focus. Other help is limited, verified and subject to available funds and approved budget.",
        od: "ଶିକ୍ଷା ଆମର ପ୍ରମୁଖ ଲକ୍ଷ୍ୟ। ଅନ୍ୟ ସହାୟତା ସୀମିତ, ଯାଞ୍ଚ ହୋଇଥିବା ଏବଂ ଉପଲବ୍ଧ ଅର୍ଥ ଓ ଅନୁମୋଦିତ ବଜେଟ ଉପରେ ନିର୍ଭର କରେ।",
      },
    },
  ],
  quote: {
    en: "The founder wants the support he once received to reach orphaned and underprivileged children through Abhiara Foundation, wherever a checked education need can be supported.",
    od: "ପ୍ରତିଷ୍ଠାତା ନିଜେ ଦିନେ ପାଇଥିବା ସହାୟତାକୁ ଅଭିଆରା ଫାଉଣ୍ଡେସନ ମାଧ୍ୟମରେ ଅନ୍ୟ ଜଣଙ୍କ ପାଖକୁ ପହଞ୍ଚାଇବାକୁ ଚାହାନ୍ତି।",
  },
  attribution: {
    en: "Abhimanyu Mallik, Founder and Director",
    od: "ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ, ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶକ",
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
