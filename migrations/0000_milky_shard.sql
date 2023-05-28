CREATE TABLE `addresses` (
	`code` text PRIMARY KEY NOT NULL,
	`prefecture` text NOT NULL,
	`prefecture_kana` text NOT NULL,
	`prefecture_code` integer NOT NULL,
	`city` text NOT NULL,
	`city_kana` text NOT NULL,
	`town` text DEFAULT ('') NOT NULL,
	`town_kana` text DEFAULT ('') NOT NULL,
	`street` text DEFAULT ('') NOT NULL,
	`office_name` text DEFAULT ('') NOT NULL,
	`office_name_kana` text DEFAULT ('') NOT NULL
);
