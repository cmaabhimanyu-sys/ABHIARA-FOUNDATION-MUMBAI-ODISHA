ALTER TABLE `leadership_members` MODIFY COLUMN `memberType` enum('board','member','advisor') NOT NULL;
--> statement-breakpoint
UPDATE `leadership_members` SET `imageUrl` = 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-44-23-476Z-biswajita-mallik.webp' WHERE `memberType` = 'board' AND `nameEn` = 'Biswajita Mallik';
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Umakanta Mahanta',NULL,'Chief Operating Officer, Odisha','ମୁଖ୍ୟ ପରିଚାଳନା ଅଧିକାରୀ, ଓଡ଼ିଶା',NULL,NULL,'Supports operational coordination for the Foundation in Odisha.','ଓଡ଼ିଶାରେ ଫାଉଣ୍ଡେସନର ପରିଚାଳନା ସମନ୍ୱୟରେ ସହଯୋଗ କରନ୍ତି।','https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-43-36-409Z-umakanta-mahanta.png',NULL,1,30 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Umakanta Mahanta');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Gouranga Charan Sahoo','ଗୌରାଙ୍ଗ ଚରଣ ସାହୁ','Member','ସଦସ୍ୟ','B.Com, Master of Commerce','ବି.କମ୍, ମାଷ୍ଟର ଅଫ୍ କମର୍ସ',NULL,NULL,'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-43-00-715Z-gouranga-charan-sahoo.jpg',NULL,1,40 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Gouranga Charan Sahoo');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Mr. Gurpreetsingh Nebhrani',NULL,'Ground Support and Statutory Compliance','କ୍ଷେତ୍ର ସହଯୋଗ ଓ ବିଧିବଦ୍ଧ ଅନୁପାଳନ','Chartered Accountant, CFA Level 2','ଚାର୍ଟାର୍ଡ ଆକାଉଣ୍ଟାଣ୍ଟ, CFA Level 2','Based in Mumbai and supports ground work and statutory compliance.','ମୁମ୍ବାଇରେ ଆଧାରିତ ଏବଂ କ୍ଷେତ୍ର କାମ ଓ ବିଧିବଦ୍ଧ ଅନୁପାଳନରେ ସହଯୋଗ କରନ୍ତି।','https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-43-07-904Z-gurpreetsingh-nebhrani.jpg',NULL,1,50 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Mr. Gurpreetsingh Nebhrani');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','CA Asis Kumar Samal',NULL,'Member and Ground Support','ସଦସ୍ୟ ଓ କ୍ଷେତ୍ର ସହଯୋଗ','Chartered Accountant','ଚାର୍ଟାର୍ଡ ଆକାଉଣ୍ଟାଣ୍ଟ','Based in Thane, Maharashtra, with roots in Kendrapara, Odisha. Supports ground level programme work.','ମହାରାଷ୍ଟ୍ରର ଠାଣେରେ ରହୁଛନ୍ତି ଏବଂ ଓଡ଼ିଶାର କେନ୍ଦ୍ରାପଡ଼ା ସହିତ ମୂଳ ସମ୍ପର୍କ ରହିଛି। କ୍ଷେତ୍ର ସ୍ତରର କାର୍ଯ୍ୟକ୍ରମରେ ସହଯୋଗ କରନ୍ତି।','https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-43-11-849Z-asis-kumar-samal.jpg',NULL,1,60 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='CA Asis Kumar Samal');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Prasant Behera',NULL,'Member and Ground Support','ସଦସ୍ୟ ଓ କ୍ଷେତ୍ର ସହଯୋଗ','B.Com, CMA Finalist','ବି.କମ୍, CMA ଫାଇନାଲିଷ୍ଟ','Based in Bhubaneswar, Odisha, and supports ground level programme work.','ଭୁବନେଶ୍ୱର, ଓଡ଼ିଶାରେ ଆଧାରିତ ଏବଂ କ୍ଷେତ୍ର ସ୍ତରର କାର୍ଯ୍ୟକ୍ରମରେ ସହଯୋଗ କରନ୍ତି।','https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-43-16-782Z-prasant-behera.jpg',NULL,1,70 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Prasant Behera');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Samiksha Parekh',NULL,'Advocate and Consultant','ଆଇନଜୀବୀ ଓ ପରାମର୍ଶଦାତା',NULL,NULL,'Based in Mumbai. Advises the Foundation on responsible systems, CSR readiness and organisational compliance.','ମୁମ୍ବାଇରେ ଆଧାରିତ। ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ବ୍ୟବସ୍ଥା, CSR ପ୍ରସ୍ତୁତି ଓ ସଂଗଠନୀୟ ଅନୁପାଳନ ବିଷୟରେ ଫାଉଣ୍ଡେସନକୁ ପରାମର୍ଶ ଦିଅନ୍ତି।','https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-43-21-476Z-samiksha-parekh.png',NULL,1,80 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Samiksha Parekh');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Advocate Farheen Ansari',NULL,'Secretarial and Legal Support','ସଚିବୀୟ ଓ ଆଇନଗତ ସହଯୋଗ','Advocate','ଆଇନଜୀବୀ','Supports the Foundation with secretarial and legal work.','ଫାଉଣ୍ଡେସନର ସଚିବୀୟ ଓ ଆଇନଗତ କାମରେ ସହଯୋଗ କରନ୍ତି।','https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-28T13-43-28-531Z-farheen-ansari.png',NULL,1,90 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Advocate Farheen Ansari');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Rajkumar Mallik','ରାଜକୁମାର ମଲ୍ଲିକ','Core Team Member','ମୁଖ୍ୟ ଦଳ ସଦସ୍ୟ',NULL,NULL,'Supports community service and education activities.','ସମୁଦାୟ ସେବା ଓ ଶିକ୍ଷା କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି।',NULL,NULL,1,91 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Rajkumar Mallik');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Alok Behera','ଆଲୋକ ବେହେରା','Core Team Member','ମୁଖ୍ୟ ଦଳ ସଦସ୍ୟ',NULL,NULL,'Supports education and community activities.','ଶିକ୍ଷା ଓ ସମୁଦାୟ କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି।',NULL,NULL,1,92 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Alok Behera');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Ashish (Rocky)','ଆଶିଷ (ରକି)','Core Team Member','ମୁଖ୍ୟ ଦଳ ସଦସ୍ୟ',NULL,NULL,'Supports community service and ground level activities.','ସମୁଦାୟ ସେବା ଓ କ୍ଷେତ୍ର କାର୍ଯ୍ୟରେ ସହଯୋଗ କରନ୍ତି।',NULL,NULL,1,93 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Ashish (Rocky)');
--> statement-breakpoint
INSERT INTO `leadership_members` (`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`imageUrl`,`profileUrl`,`isPublished`,`sortOrder`) SELECT 'member','Manoj Kumar Mallik','ମନୋଜ କୁମାର ମଲ୍ଲିକ','Field Operations','କ୍ଷେତ୍ର ପରିଚାଳନା','MBA in Finance','ଫାଇନାନ୍ସରେ MBA','Coordinates field activities and programme follow up in Odisha.','ଓଡ଼ିଶାରେ କ୍ଷେତ୍ର କାର୍ଯ୍ୟ ଓ କାର୍ଯ୍ୟକ୍ରମ ଅନୁସରଣରେ ସମନ୍ୱୟ କରନ୍ତି।','/images/team-manoj-kumar-mallik.jpeg',NULL,1,94 FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `leadership_members` WHERE `nameEn`='Manoj Kumar Mallik');
--> statement-breakpoint
UPDATE `leadership_members` SET `imageUrl` = CASE `id`
  WHEN 1 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-31-48-782Z-1-abhimanyu-mallik-professional-800x1000.webp'
  WHEN 2 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-31-54-975Z-2-biswajita-mallik-professional-800x1000.webp'
  WHEN 3 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-31-58-631Z-3-amit-kumar-jena-professional-800x1000.webp'
  WHEN 4 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-31-729Z-4-sujit-sahu-professional-800x1000.webp'
  WHEN 5 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-35-445Z-5-sagar-jena-professional-800x1000.webp'
  WHEN 6 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-39-249Z-6-bharat-panigrahy-professional-800x1000.webp'
  WHEN 30001 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-01-917Z-30001-umakanta-mahanta-professional-800x1000.webp'
  WHEN 30002 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-06-404Z-30002-gouranga-charan-sahoo-professional-800x1000.webp'
  WHEN 30003 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-10-263Z-30003-mr-gurpreetsingh-nebhrani-professional-800x1000.webp'
  WHEN 30004 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-13-942Z-30004-ca-asis-kumar-samal-professional-800x1000.webp'
  WHEN 30005 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-17-732Z-30005-prasant-behera-professional-800x1000.webp'
  WHEN 30006 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-21-832Z-30006-samiksha-parekh-professional-800x1000.webp'
  WHEN 30007 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-24-997Z-30007-advocate-farheen-ansari-professional-800x1000.webp'
  WHEN 30011 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-32-28-107Z-30011-manoj-kumar-mallik-professional-800x1000.webp'
  ELSE `imageUrl`
END
WHERE `id` IN (1,2,3,4,5,6,30001,30002,30003,30004,30005,30006,30007,30011);
--> statement-breakpoint
UPDATE `leadership_members` SET `imageUrl` = CASE `id`
  WHEN 1 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-40-50-691Z-1-abhimanyu-mallik-professional-800x1000.webp'
  WHEN 2 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-40-57-287Z-2-biswajita-mallik-professional-800x1000.webp'
  WHEN 3 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-01-799Z-3-amit-kumar-jena-professional-800x1000.webp'
  WHEN 4 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-41-024Z-4-sujit-sahu-professional-800x1000.webp'
  WHEN 5 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-44-508Z-5-sagar-jena-professional-800x1000.webp'
  WHEN 6 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-47-354Z-6-bharat-panigrahy-professional-800x1000.webp'
  WHEN 30001 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-07-495Z-30001-umakanta-mahanta-professional-800x1000.webp'
  WHEN 30002 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-12-448Z-30002-gouranga-charan-sahoo-professional-800x1000.webp'
  WHEN 30003 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-16-161Z-30003-mr-gurpreetsingh-nebhrani-professional-800x1000.webp'
  WHEN 30004 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-22-029Z-30004-ca-asis-kumar-samal-professional-800x1000.webp'
  WHEN 30005 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-26-676Z-30005-prasant-behera-professional-800x1000.webp'
  WHEN 30006 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-30-099Z-30006-samiksha-parekh-professional-800x1000.webp'
  WHEN 30007 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-33-561Z-30007-advocate-farheen-ansari-professional-800x1000.webp'
  WHEN 30011 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-09-29T01-41-37-145Z-30011-manoj-kumar-mallik-professional-800x1000.webp'
  ELSE `imageUrl`
END
WHERE `id` IN (1,2,3,4,5,6,30001,30002,30003,30004,30005,30006,30007,30011);
--> statement-breakpoint
UPDATE `leadership_members` SET `isPublished` = false WHERE `id` IN (5, 6) AND `nameEn` IN ('Sagar Jena', 'Bharat Panigrahy');
--> statement-breakpoint
UPDATE `leadership_members`
SET
  `qualificationEn` = 'B.A.; Diploma in Community Development; PG Diploma in Psychological Counselling',
  `qualificationOd` = 'ବି.ଏ.; କମ୍ୟୁନିଟି ଡେଭଲପମେଣ୍ଟରେ ଡିପ୍ଲୋମା; ସାଇକୋଲୋଜିକାଲ କାଉନସେଲିଂରେ ପିଜି ଡିପ୍ଲୋମା',
  `bioEn` = 'Umakanta has more than 25 years of field experience across Odisha and Karnataka. His work covers community development, sanitation, child welfare, psychological counselling, social justice, self help group training and community mobilisation. He has worked with community organisations in Dhenkanal, Bengaluru and Keonjhar and now supports programme planning, local coordination and responsible field delivery for Abhiara Foundation in Odisha.',
  `bioOd` = 'ଉମାକାନ୍ତଙ୍କର ଓଡ଼ିଶା ଓ କର୍ଣ୍ଣାଟକରେ ୨୫ ବର୍ଷରୁ ଅଧିକ କ୍ଷେତ୍ର ଅନୁଭବ ରହିଛି। ସମୁଦାୟ ବିକାଶ, ପରିମଳ, ଶିଶୁ କଲ୍ୟାଣ, ମନୋବୈଜ୍ଞାନିକ ପରାମର୍ଶ, ସାମାଜିକ ନ୍ୟାୟ, ସ୍ୱୟଂ ସହାୟକ ଗୋଷ୍ଠୀ ପ୍ରଶିକ୍ଷଣ ଓ ସମୁଦାୟ ସଂଗଠନରେ ସେ କାମ କରିଛନ୍ତି। ଢେଙ୍କାନାଳ, ବେଙ୍ଗାଲୁରୁ ଓ କେନ୍ଦୁଝରର ସମୁଦାୟ ସଂଗଠନ ସହ କାମ କରିଥିବା ଉମାକାନ୍ତ ବର୍ତ୍ତମାନ ଓଡ଼ିଶାରେ ଅଭିଆରା ଫାଉଣ୍ଡେସନର କାର୍ଯ୍ୟକ୍ରମ ପରିକଳ୍ପନା, ସ୍ଥାନୀୟ ସମନ୍ୱୟ ଓ ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ କ୍ଷେତ୍ର ପରିଚାଳନାରେ ସହଯୋଗ କରୁଛନ୍ତି।'
WHERE `id` = 30001 AND `nameEn` = 'Umakanta Mahanta';
