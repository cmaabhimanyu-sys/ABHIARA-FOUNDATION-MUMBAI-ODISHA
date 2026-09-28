CREATE TABLE `site_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`title` varchar(500) NOT NULL,
	`alt` varchar(500) NOT NULL DEFAULT '',
	`category` varchar(100) NOT NULL,
	`slot` varchar(200),
	`caption` text,
	`attribution` varchar(500),
	`location` varchar(500),
	`mediaType` enum('image','video') NOT NULL DEFAULT 'image',
	`thumbnailUrl` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_images_id` PRIMARY KEY(`id`)
);
