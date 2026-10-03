ALTER TABLE `leadership_members` MODIFY COLUMN `memberType` enum('board','auditor','advisor','odisha','member') NOT NULL;
--> statement-breakpoint
-- Firm identity and FRN come from the 14 May 2026 consent. The owner separately confirms ADT filing and appointment.
INSERT INTO `leadership_members`
  (`id`,`memberType`,`nameEn`,`nameOd`,`roleEn`,`roleOd`,`qualificationEn`,`qualificationOd`,`bioEn`,`bioOd`,`bioIsPublic`,`isPublished`,`sortOrder`)
VALUES
  (91004,'auditor','R B R & Associates','ଆର୍ ବି ଆର୍ ଆଣ୍ଡ୍ ଆସୋସିଏଟ୍ସ','Appointed Statutory Auditor','ନିଯୁକ୍ତ ବୈଧାନିକ ଲେଖାପରୀକ୍ଷକ','ICAI Firm Registration No. 138415W. Represented by CA Sandeep Gurav, Partner.','ICAI ଫାର୍ମ ପଞ୍ଜୀକରଣ ସଂଖ୍ୟା 138415W। ପ୍ରତିନିଧି: CA ସନ୍ଦୀପ ଗୁରବ, ପାର୍ଟନର।','The Statutory Auditor is independent of the Board, Advisors, Odisha Division and Core Members.','ବୈଧାନିକ ଲେଖାପରୀକ୍ଷକ ନିର୍ଦ୍ଦେଶକ ମଣ୍ଡଳୀ, ପରାମର୍ଶଦାତା, ଓଡ଼ିଶା ବିଭାଗ ଓ ମୁଖ୍ୟ ସଦସ୍ୟମାନଙ୍କଠାରୁ ସ୍ୱାଧୀନ।',true,true,25)
ON DUPLICATE KEY UPDATE
  `memberType`=VALUES(`memberType`),`nameEn`=VALUES(`nameEn`),`nameOd`=VALUES(`nameOd`),
  `roleEn`=VALUES(`roleEn`),`roleOd`=VALUES(`roleOd`),
  `qualificationEn`=VALUES(`qualificationEn`),`qualificationOd`=VALUES(`qualificationOd`),
  `bioEn`=VALUES(`bioEn`),`bioOd`=VALUES(`bioOd`),
  `bioIsPublic`=VALUES(`bioIsPublic`),`isPublished`=VALUES(`isPublished`),`sortOrder`=VALUES(`sortOrder`);

--> statement-breakpoint
-- Public portraits approved and uploaded to the existing Vercel Blob leadership folder.
-- The external statutory auditor deliberately has no photo or partner profile link.
UPDATE `leadership_members` SET `imageUrl` = CASE `id`
  WHEN 1 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-10-03T17-46-23-757Z-abhimanyu-mallik-maroon-blazer-800x1000-professional-800x100.webp'
  WHEN 91001 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-10-03T17-43-50-944Z-subhasis-sahoo-people-portrait-800x1000-professional-800x100.webp'
  WHEN 91002 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-10-03T17-52-17-582Z-ashish-kumar-swain-people-portrait-800x1000-professional-800.webp'
  WHEN 91003 THEN 'https://cxjy0gqflcaufkda.public.blob.vercel-storage.com/abhiara-images/leadership/2026-10-03T17-53-42-681Z-viky-sangoi-people-portrait-800x1000-professional-800x1000.webp'
  ELSE `imageUrl` END
WHERE `id` IN (1, 91001, 91002, 91003);
