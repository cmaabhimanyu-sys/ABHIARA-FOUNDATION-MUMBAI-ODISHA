ALTER TABLE `leadership_members` MODIFY COLUMN `memberType` enum('board','advisor','odisha','member') NOT NULL;
--> statement-breakpoint
-- The first 15 published records follow the owner's approved order. Unpublished historical records remain untouched.
UPDATE `leadership_members` SET
  `memberType` = CASE `id`
    WHEN 1 THEN 'board' WHEN 2 THEN 'board'
    WHEN 4 THEN 'advisor' WHEN 3 THEN 'advisor'
    WHEN 30001 THEN 'odisha' WHEN 30011 THEN 'odisha'
    ELSE 'member' END,
  `sortOrder` = CASE `id`
    WHEN 1 THEN 10 WHEN 2 THEN 20 WHEN 4 THEN 30 WHEN 3 THEN 50
    WHEN 30001 THEN 60 WHEN 30011 THEN 70 WHEN 30003 THEN 80
    WHEN 30007 THEN 90 WHEN 30006 THEN 100 WHEN 30004 THEN 110
    WHEN 30005 THEN 120 WHEN 30002 THEN 130 WHEN 60001 THEN 140
    WHEN 90001 THEN 150 ELSE `sortOrder` END,
  `roleEn` = CASE `id`
    WHEN 1 THEN 'Founder & Director'
    WHEN 2 THEN 'Co-Founder & Director'
    WHEN 4 THEN 'Guiding Patron & Legal Advisor'
    WHEN 3 THEN 'Founding Patron & Strategic Advisor'
    WHEN 30001 THEN 'President, Odisha Division'
    WHEN 30011 THEN 'Vice President, Odisha Division'
    ELSE 'Core Member' END,
  `roleOd` = CASE `id`
    WHEN 1 THEN 'ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶକ'
    WHEN 2 THEN 'ସହ-ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶିକା'
    WHEN 4 THEN 'ମାର୍ଗଦର୍ଶକ ପୃଷ୍ଠପୋଷକ ଓ ଆଇନ ପରାମର୍ଶଦାତା'
    WHEN 3 THEN 'ପ୍ରତିଷ୍ଠାକାଳୀନ ପୃଷ୍ଠପୋଷକ ଓ ରଣନୀତିକ ପରାମର୍ଶଦାତା'
    WHEN 30001 THEN 'ସଭାପତି, ଓଡ଼ିଶା ବିଭାଗ'
    WHEN 30011 THEN 'ଉପସଭାପତି, ଓଡ଼ିଶା ବିଭାଗ'
    ELSE 'ମୁଖ୍ୟ ସଦସ୍ୟ' END,
  `qualificationEn` = CASE `id`
    WHEN 30001 THEN 'B.A., Diploma in Community Development, PG Diploma in Psychological Counselling'
    WHEN 30007 THEN 'CS and LLB'
    WHEN 90001 THEN 'Graduation'
    ELSE `qualificationEn` END,
  `qualificationOd` = CASE `id`
    WHEN 30001 THEN 'ବି.ଏ., ସମୁଦାୟ ବିକାଶରେ ଡିପ୍ଲୋମା, ମନସ୍ତାତ୍ତ୍ୱିକ ପରାମର୍ଶରେ ପିଜି ଡିପ୍ଲୋମା'
    WHEN 30007 THEN 'କମ୍ପାନୀ ସଚିବ (CS) ଓ LLB'
    WHEN 90001 THEN 'ସ୍ନାତକ'
    ELSE `qualificationOd` END,
  `bioEn` = CASE `id`
    WHEN 2 THEN 'Official Director; not involved in day-to-day activities.'
    WHEN 30001 THEN 'More than 25 years of experience in community development, child welfare and field operations across Odisha and Karnataka.'
    WHEN 30011 THEN 'Leads verification and field coordination; supports the President in Odisha operations.'
    ELSE `bioEn` END,
  `bioOd` = CASE `id`
    WHEN 2 THEN 'କମ୍ପାନୀର ଆଧିକାରିକ ନିର୍ଦ୍ଦେଶିକା; ଦୈନନ୍ଦିନ କାର୍ଯ୍ୟରେ ସାମିଲ ନୁହନ୍ତି।'
    WHEN 30001 THEN 'ଓଡ଼ିଶା ଓ କର୍ଣ୍ଣାଟକରେ ସମୁଦାୟ ବିକାଶ, ଶିଶୁ କଲ୍ୟାଣ ଓ କ୍ଷେତ୍ର କାର୍ଯ୍ୟରେ ୨୫ ବର୍ଷରୁ ଅଧିକ ଅଭିଜ୍ଞତା।'
    WHEN 30011 THEN 'ଯାଞ୍ଚ ଓ କ୍ଷେତ୍ର ସମନ୍ୱୟର ନେତୃତ୍ୱ ନିଅନ୍ତି; ଓଡ଼ିଶାର କାର୍ଯ୍ୟରେ ସଭାପତିଙ୍କୁ ସହଯୋଗ କରନ୍ତି।'
    ELSE `bioOd` END,
  `nameOd` = CASE `id`
    WHEN 30001 THEN 'ଶ୍ରୀ ଉମାକାନ୍ତ ମହାନ୍ତ'
    ELSE `nameOd` END
WHERE `id` IN (1,2,3,4,30001,30011,30003,30007,30006,30004,30005,30002,60001,90001);
--> statement-breakpoint
INSERT INTO `leadership_members`
  (`id`,`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`isPublished`,`sortOrder`)
VALUES
  (91001,'advisor','Mr. Subhasis Sahoo, CMA','ଶ୍ରୀ ସୁଭାଶିଷ ସାହୁ, CMA','Senior Advisor, Education & Community Engagement','ବରିଷ୍ଠ ପରାମର୍ଶଦାତା, ଶିକ୍ଷା ଓ ସମୁଦାୟ ସମ୍ପର୍କ',NULL,NULL,NULL,NULL,1,40),
  (91002,'member','Mr. Ashish Kumar Swain','ଶ୍ରୀ ଆଶିଷ କୁମାର ସ୍ୱାଇଁ','Core Member','ମୁଖ୍ୟ ସଦସ୍ୟ','M.S. Pharm','ଏମ୍.ଏସ୍. ଫାର୍ମ',NULL,NULL,1,160),
  (91003,'member','Mr. Viky Sangoi','ଶ୍ରୀ ବିକି ସାଙ୍ଗୋଇ','Core Member','ମୁଖ୍ୟ ସଦସ୍ୟ','MBA in Finance','ଫାଇନାନ୍ସରେ MBA',NULL,NULL,1,170)
ON DUPLICATE KEY UPDATE
  `memberType`=VALUES(`memberType`),`nameEn`=VALUES(`nameEn`),`nameOd`=VALUES(`nameOd`),
  `roleEn`=VALUES(`roleEn`),`roleOd`=VALUES(`roleOd`),
  `qualificationEn`=VALUES(`qualificationEn`),`qualificationOd`=VALUES(`qualificationOd`),
  `bioEn`=VALUES(`bioEn`),`bioOd`=VALUES(`bioOd`),
  `isPublished`=VALUES(`isPublished`),`sortOrder`=VALUES(`sortOrder`);
