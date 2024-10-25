CREATE TABLE `user_details` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`firstname` text,
	`lastname` text,
	`avatar` text,
	`age` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
