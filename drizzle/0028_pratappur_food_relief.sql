-- Owner-provided programme update, received 14 October 2026.
-- Separate from Mustafapur: nearly six villages, no supplied beneficiary headcount.
-- New photos and press clipping require separate public-media review.
INSERT INTO `activities` (`id`, `title`, `description`, `date`, `location`, `category`, `imageUrl`, `beneficiariesCount`, `isPublished`, `sortOrder`)
SELECT 93002,
'Food relief in Pratappur and nearby villages, Jajpur | ପ୍ରତାପପୁର ଓ ନିକଟବର୍ତ୍ତୀ ଗାଁରେ ଖାଦ୍ୟ ସହାୟତା, ଯାଜପୁର',
'In August 2026, Abhiara Foundation, Mumbai, supported the distribution of food packets and snacks to flood-affected families in Pratappur and nearby villages in Bari block, Jajpur district, Odisha. The relief support reached nearly six villages and helped residents meet immediate food needs during the floods. | ଅଗଷ୍ଟ ୨୦୨୬ରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ମୁମ୍ବାଇ, ଓଡ଼ିଶାର ଯାଜପୁର ଜିଲ୍ଲା ବରୀ ବ୍ଲକର ପ୍ରତାପପୁର ଓ ନିକଟବର୍ତ୍ତୀ ଗାଁର ବନ୍ୟା ପ୍ରଭାବିତ ପରିବାରମାନଙ୍କୁ ଖାଦ୍ୟ ପ୍ୟାକେଟ ଓ ଜଳଖିଆ ବଣ୍ଟନରେ ସହଯୋଗ କରିଥିଲା। ଏହି ସହାୟତା ପ୍ରାୟ ୬ଟି ଗାଁରେ ପହଞ୍ଚିଥିଲା ଏବଂ ବନ୍ୟା ସମୟରେ ବାସିନ୍ଦାମାନଙ୍କର ତତ୍କାଳ ଖାଦ୍ୟ ଆବଶ୍ୟକତା ପୂରଣରେ ସହାୟକ ହୋଇଥିଲା।',
'August 2026 | ଅଗଷ୍ଟ ୨୦୨୬',
'Pratappur, Bari, Jajpur, Odisha | ପ୍ରତାପପୁର, ବରୀ, ଯାଜପୁର, ଓଡ଼ିଶା',
'community', NULL,
'Nearly six villages reached | ପ୍ରାୟ ୬ଟି ଗାଁରେ ସହାୟତା',
TRUE, 1
WHERE NOT EXISTS (SELECT 1 FROM `activities` WHERE `id` = 93002);
