CREATE TABLE `volunteer_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`qualification` varchar(500) NOT NULL,
	`email` varchar(320) NOT NULL,
	`socialProfile` varchar(500) NOT NULL,
	`areaOfInterest` enum('education','eldercare','csr','finance','technology','fieldwork','other') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `volunteer_submissions_id` PRIMARY KEY(`id`)
);
