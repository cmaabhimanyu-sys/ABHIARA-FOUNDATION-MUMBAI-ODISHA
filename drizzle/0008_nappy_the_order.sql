CREATE TABLE `donations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`donorName` varchar(255) NOT NULL,
	`donorEmail` varchar(320) NOT NULL,
	`donorPhone` varchar(20),
	`amount` int NOT NULL,
	`currency` varchar(10) NOT NULL DEFAULT 'INR',
	`frequency` enum('one_time','monthly') NOT NULL DEFAULT 'one_time',
	`cause` enum('education','elderly_care','general','vidyapeeth') NOT NULL DEFAULT 'general',
	`donationStatus` enum('pending','completed','failed','cancelled') NOT NULL DEFAULT 'pending',
	`razorpayOrderId` varchar(255),
	`razorpayPaymentId` varchar(255),
	`razorpaySubscriptionId` varchar(255),
	`message` text,
	`panNumber` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `donations_id` PRIMARY KEY(`id`)
);
