CREATE TABLE `core_member_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`location` varchar(500) NOT NULL,
	`district` varchar(255) NOT NULL,
	`state` varchar(255) NOT NULL DEFAULT 'Odisha',
	`occupation` varchar(255),
	`motivation` text NOT NULL,
	`areaOfInterest` enum('education','eldercare','community','health','fundraising','technology','fieldwork','other') NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	CONSTRAINT `core_member_applications_id` PRIMARY KEY(`id`)
);
