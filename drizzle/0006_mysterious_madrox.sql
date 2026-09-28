ALTER TABLE `gallery_photos` ADD `mediaType` enum('photo','video') DEFAULT 'photo' NOT NULL;--> statement-breakpoint
ALTER TABLE `gallery_photos` ADD `thumbnailUrl` text;