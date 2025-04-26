CREATE TABLE `mybookstore` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`author` varchar(255) NOT NULL,
	`year` int NOT NULL,
	`book` varchar(255) NOT NULL,
	`status` varchar(7) NOT NULL DEFAULT 'Unread',
	CONSTRAINT `mybookstore_id` PRIMARY KEY(`id`),
	CONSTRAINT `mybookstore_book_unique` UNIQUE(`book`)
);
