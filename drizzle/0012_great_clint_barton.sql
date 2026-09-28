CREATE TABLE `donor_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`panNumber` varchar(20),
	`totalDonated` int NOT NULL DEFAULT 0,
	`donationCount` int NOT NULL DEFAULT 0,
	`accessToken` varchar(128),
	`isMonthlyDonor` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donor_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `donor_profiles_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `donor_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`donorProfileId` int NOT NULL,
	`amount` int NOT NULL,
	`subsCause` enum('education','elderly_care','general','vidyapeeth') NOT NULL DEFAULT 'general',
	`subsStatus` enum('active','paused','cancelled') NOT NULL DEFAULT 'active',
	`razorpaySubsId` varchar(255),
	`nextBillingDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donor_subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(255),
	`content` text NOT NULL,
	`testimonialCategory` enum('donor','beneficiary','partner','volunteer') NOT NULL DEFAULT 'donor',
	`photoUrl` text,
	`rating` int DEFAULT 5,
	`isActive` boolean NOT NULL DEFAULT true,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
