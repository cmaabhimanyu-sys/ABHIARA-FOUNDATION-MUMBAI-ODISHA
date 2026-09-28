CREATE TABLE `campaign_donations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campaignId` int NOT NULL,
	`campDonorName` varchar(255) NOT NULL,
	`campDonorEmail` varchar(320) NOT NULL,
	`campDonorAmount` int NOT NULL,
	`campDonorMessage` text,
	`isAnonymous` boolean NOT NULL DEFAULT false,
	`campDonationStatus` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `campaign_donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fundraising_campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`creatorName` varchar(255) NOT NULL,
	`creatorEmail` varchar(320) NOT NULL,
	`creatorPhone` varchar(20),
	`title` varchar(500) NOT NULL,
	`description` text NOT NULL,
	`campaignType` enum('birthday','marathon','wedding','memorial','corporate','school','festival','other') NOT NULL DEFAULT 'birthday',
	`campaignCause` enum('education','elderly_care','general','vidyapeeth') NOT NULL DEFAULT 'general',
	`goalAmount` int NOT NULL,
	`raisedAmount` int NOT NULL DEFAULT 0,
	`donorCount` int NOT NULL DEFAULT 0,
	`endDate` varchar(20),
	`slug` varchar(255) NOT NULL,
	`campaignStatus` enum('active','completed','cancelled') NOT NULL DEFAULT 'active',
	`isApproved` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fundraising_campaigns_id` PRIMARY KEY(`id`),
	CONSTRAINT `fundraising_campaigns_slug_unique` UNIQUE(`slug`)
);
