ALTER TABLE `donations` MODIFY COLUMN `cause` enum('education','elderly_care','general','vidyapeeth','medical_emergency') NOT NULL DEFAULT 'general';--> statement-breakpoint
ALTER TABLE `donor_subscriptions` MODIFY COLUMN `subsCause` enum('education','elderly_care','general','vidyapeeth','medical_emergency') NOT NULL DEFAULT 'general';--> statement-breakpoint
ALTER TABLE `fundraising_campaigns` MODIFY COLUMN `campaignCause` enum('education','elderly_care','general','vidyapeeth','medical_emergency') NOT NULL DEFAULT 'general';--> statement-breakpoint
ALTER TABLE `memorial_donations` MODIFY COLUMN `memorialCause` enum('education','elderly_care','general','vidyapeeth','medical_emergency') NOT NULL DEFAULT 'general';--> statement-breakpoint
ALTER TABLE `occasion_donations` MODIFY COLUMN `occasionCause` enum('education','elderly_care','general','vidyapeeth','medical_emergency') NOT NULL DEFAULT 'general';--> statement-breakpoint
ALTER TABLE `donations` ADD `expenseCategory` varchar(255);--> statement-breakpoint
ALTER TABLE `occasion_donations` ADD `isPublicOnWall` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `occasion_donations` ADD `wantReminder` boolean DEFAULT false NOT NULL;