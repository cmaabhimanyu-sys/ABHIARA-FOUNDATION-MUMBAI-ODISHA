-- Owner-provided programme update, received 14 October 2026.
-- One activity only: around 100 people, not an exact headcount or a total per photo.
-- Photos remain separate owner-reviewed gallery records; no original photo is exposed here.
INSERT INTO `activities` (`id`, `title`, `description`, `date`, `location`, `category`, `imageUrl`, `beneficiariesCount`, `isPublished`, `sortOrder`)
SELECT 93001,
'Food support reaches around 100 people in Mustafapur | ମୁସ୍ତାଫାପୁରରେ ପ୍ରାୟ ୧୦୦ ଜଣଙ୍କୁ ଖାଦ୍ୟ ସହାୟତା',
'In August 2026, Abhiara Foundation, Mumbai, supported the distribution of snacks and food to around 100 people in one flood-affected village under Mustafapur Panchayat, Dhamnagar, Bhadrak, Odisha. The relief effort provided immediate food support to residents during a difficult time. | ଅଗଷ୍ଟ ୨୦୨୬ରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନ, ମୁମ୍ବାଇ, ଓଡ଼ିଶାର ଭଦ୍ରକ ଜିଲ୍ଲା ଧାମନଗରର ମୁସ୍ତାଫାପୁର ପଞ୍ଚାୟତ ଅନ୍ତର୍ଗତ ଗୋଟିଏ ବନ୍ୟା ପ୍ରଭାବିତ ଗାଁରେ ପ୍ରାୟ ୧୦୦ ଜଣଙ୍କୁ ଜଳଖିଆ ଓ ଖାଦ୍ୟ ବଣ୍ଟନରେ ସହଯୋଗ କରିଥିଲା। ଏହି ରିଲିଫ କାମ ଦ୍ୱାରା ଅସୁବିଧା ସମୟରେ ବାସିନ୍ଦାମାନଙ୍କୁ ତତ୍କାଳ ଖାଦ୍ୟ ସହାୟତା ଦିଆଯାଇଥିଲା।',
'August 2026 | ଅଗଷ୍ଟ ୨୦୨୬',
'Mustafapur Panchayat, Dhamnagar, Bhadrak, Odisha | ମୁସ୍ତାଫାପୁର ପଞ୍ଚାୟତ, ଧାମନଗର, ଭଦ୍ରକ, ଓଡ଼ିଶା',
'community', NULL,
'One village · Around 100 people | ଗୋଟିଏ ଗାଁ · ପ୍ରାୟ ୧୦୦ ଜଣ',
TRUE, 0
WHERE NOT EXISTS (SELECT 1 FROM `activities` WHERE `id` = 93001);
