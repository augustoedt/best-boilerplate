CREATE TABLE `user_details` (
	`id` text PRIMARY KEY NOT NULL,
	`firstname` text,
	`lastname` text,
	`avatar` text,
	`age` integer
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`passhash` text NOT NULL,
	`details` text,
	`email` text NOT NULL,
	FOREIGN KEY (`details`) REFERENCES `user_details`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);