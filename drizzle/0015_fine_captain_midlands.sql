CREATE TABLE `banners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(500) NOT NULL,
	`imageUrl` text NOT NULL,
	`linkUrl` text,
	`pagePlacement` varchar(500) NOT NULL DEFAULT 'home',
	`bannerPosition` enum('top','middle','bottom') NOT NULL DEFAULT 'top',
	`isActive` boolean NOT NULL DEFAULT true,
	`startDate` timestamp,
	`endDate` timestamp,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `banners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hero_slides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titleEn` varchar(500) NOT NULL,
	`titleOd` varchar(500),
	`subtitleEn` text,
	`subtitleOd` text,
	`imageUrl` text NOT NULL,
	`ctaTextEn` varchar(100),
	`ctaTextOd` varchar(100),
	`ctaHref` varchar(500),
	`accentColor` varchar(20) DEFAULT '#C9A84C',
	`sortOrder` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hero_slides_id` PRIMARY KEY(`id`)
);
