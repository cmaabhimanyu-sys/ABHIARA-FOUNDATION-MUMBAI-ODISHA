ALTER TABLE `leadership_members` ADD `bioIsPublic` boolean DEFAULT false NOT NULL;
--> statement-breakpoint
UPDATE `leadership_members` SET `bioIsPublic` = true WHERE `id` IN (2, 30001, 30011);
