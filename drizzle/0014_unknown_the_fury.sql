ALTER TABLE `donations` ADD `isAmountAnonymous` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `occasion_donations` ADD `isAmountAnonymous` boolean DEFAULT false NOT NULL;