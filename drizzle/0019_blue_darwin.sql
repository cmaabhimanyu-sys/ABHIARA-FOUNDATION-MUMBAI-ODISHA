CREATE TABLE `leadership_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`memberType` enum('board','advisor') NOT NULL,
	`nameEn` varchar(255) NOT NULL,
	`nameOd` varchar(255),
	`roleEn` varchar(255) NOT NULL,
	`roleOd` varchar(255),
	`qualificationEn` varchar(500),
	`qualificationOd` varchar(500),
	`bioEn` text,
	`bioOd` text,
	`imageUrl` text,
	`profileUrl` text,
	`isPublished` boolean NOT NULL DEFAULT false,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leadership_members_id` PRIMARY KEY(`id`)
);


INSERT INTO `leadership_members` (`memberType`, `nameEn`, `nameOd`, `roleEn`, `roleOd`, `qualificationEn`, `qualificationOd`, `bioEn`, `bioOd`, `imageUrl`, `profileUrl`, `isPublished`, `sortOrder`) VALUES
('board', 'Abhimanyu Mallik', 'ଅଭିମନ୍ୟୁ ମଲ୍ଲିକ', 'Founder and Director', 'ପ୍ରତିଷ୍ଠାତା ଓ ନିର୍ଦ୍ଦେଶକ', 'Cost and Management Accountant', 'କଷ୍ଟ ଏବଂ ମ୍ୟାନେଜମେଣ୍ଟ ଆକାଉଣ୍ଟାଣ୍ଟ', 'Abhimanyu looks after finance, statutory compliance, programme planning and public reporting. He works to keep decisions, records and use of funds clear and accountable.', 'ଅଭିମନ୍ୟୁ ଆର୍ଥିକ ପରିଚାଳନା, ଆଇନଗତ ଅନୁପାଳନ, କାର୍ଯ୍ୟକ୍ରମ ଯୋଜନା ଓ ସାର୍ବଜନୀନ ରିପୋର୍ଟିଂ ଦେଖନ୍ତି। ନିଷ୍ପତ୍ତି, ରେକର୍ଡ ଓ ଅର୍ଥ ବ୍ୟବହାର ସ୍ପଷ୍ଟ ଓ ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ରହିବାକୁ ସେ କାମ କରନ୍ତି।', '/images/team-abhimanyu-mallik.png', 'https://www.linkedin.com/in/abhimanyu-mallik/', true, 10),
('board', 'Biswajita Mallik', 'ବିଶ୍ୱଜିତା ମଲ୍ଲିକ', 'Director', 'ନିର୍ଦ୍ଦେଶକ', 'MBA in Human Resource', 'ମାନବ ସମ୍ବଳରେ MBA', 'Biswajita supports community relations, family programme coordination and regular follow up with field teams. Her work helps the Foundation stay connected with the people it serves.', 'ବିଶ୍ୱଜିତା ସମୁଦାୟ ସମ୍ପର୍କ, ପରିବାର ସହାୟତା କାର୍ଯ୍ୟକ୍ରମ ଓ କ୍ଷେତ୍ର ଦଳ ସହ ନିୟମିତ ସମନ୍ୱୟରେ ସାହାଯ୍ୟ କରନ୍ତି। ତାଙ୍କ କାମ ଫାଉଣ୍ଡେସନକୁ ଲୋକମାନଙ୍କ ସହ ଯୋଡ଼ି ରଖେ।', NULL, NULL, true, 20),
('advisor', 'Amit Kumar Jena', 'ଅମିତ କୁମାର ଜେନା', 'Founding Patron and Strategic Advisor', 'ପ୍ରତିଷ୍ଠାକାଳୀନ ପୃଷ୍ଠପୋଷକ ଓ ରଣନୀତିକ ପରାମର୍ଶଦାତା', NULL, NULL, 'Amit supports the Foundation with strategic guidance and helps the team review priorities, partnerships and future direction.', 'ଅମିତ ଫାଉଣ୍ଡେସନକୁ ରଣନୀତିକ ମାର୍ଗଦର୍ଶନ ଦିଅନ୍ତି ଏବଂ ପ୍ରାଥମିକତା, ସହଭାଗିତା ଓ ଭବିଷ୍ୟତ ଦିଗର ସମୀକ୍ଷାରେ ଦଳକୁ ସହଯୋଗ କରନ୍ତି।', '/images/team-amit-kumar-jena.jpeg', NULL, true, 100),
('advisor', 'Sujit Sahu', 'ସୁଜିତ ସାହୁ', 'Legal Advisor', 'ଆଇନ ପରାମର୍ଶଦାତା', 'LLB, MBA', 'LLB, MBA', 'Sujit supports the Foundation on legal matters, compliance and governance.', 'ସୁଜିତ ଫାଉଣ୍ଡେସନକୁ ଆଇନଗତ ବିଷୟ, ଅନୁପାଳନ ଓ ପରିଚାଳନାରେ ପରାମର୍ଶ ଦିଅନ୍ତି।', '/images/team-advocate-sujit-sahu.png', NULL, true, 110),
('advisor', 'Sagar Jena', 'ସାଗର ଜେନା', 'Education Advisor', 'ଶିକ୍ଷା ପରାମର୍ଶଦାତା', 'Ama Chatasali and rights work', 'ଆମ ଚାଟଶାଳୀ ଓ ଅଧିକାର କାର୍ଯ୍ୟ', 'Sagar shares practical guidance from village level education work and helps the team understand local learning needs.', 'ସାଗର ଗ୍ରାମ ସ୍ତରର ଶିକ୍ଷା କାମରୁ ବ୍ୟବହାରିକ ପରାମର୍ଶ ଦିଅନ୍ତି ଓ ସ୍ଥାନୀୟ ଶିକ୍ଷା ଆବଶ୍ୟକତା ବୁଝିବାରେ ଦଳକୁ ସାହାଯ୍ୟ କରନ୍ତି।', '/images/team-sagar-jena.png', NULL, false, 120),
('advisor', 'Bharat Panigrahy', 'ଭରତ ପାଣିଗ୍ରାହୀ', 'CSR and Compliance Advisor', 'CSR ଓ ଅନୁପାଳନ ପରାମର୍ଶଦାତା', 'XLRI, HR professional', 'XLRI, HR ପେଶାଜୀବୀ', 'Bharat advises the Foundation on responsible systems, CSR readiness and organisational compliance.', 'ଭରତ ଦାୟିତ୍ୱପୂର୍ଣ୍ଣ ବ୍ୟବସ୍ଥା, CSR ପ୍ରସ୍ତୁତି ଓ ସଂଗଠନୀୟ ଅନୁପାଳନ ବିଷୟରେ ପରାମର୍ଶ ଦିଅନ୍ତି।', '/images/team-bharat-panigrahy.png', NULL, false, 130);
