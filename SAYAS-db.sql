 DROP TABLE IF EXISTS `focus_sessions`;
 DROP TABLE IF EXISTS `quits`;
 DROP TABLE IF EXISTS `tasks`;
 DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `daily_goals`;
 DROP TABLE IF EXISTS `weekly_goals`;
 DROP TABLE IF EXISTS `weekly_goals`;
 CREATE TABLE IF NOT EXISTS `weekly_goals` (`id` INTEGER NOT NULL auto_increment , `hours` INTEGER, `success` TINYINT(1), `hours_done` INTEGER, 
`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
 SHOW INDEX FROM `weekly_goals`;
DROP TABLE IF EXISTS `daily_goals`;
CREATE TABLE IF NOT EXISTS `daily_goals` (`id` INTEGER NOT NULL auto_increment , `minute` INTEGER, `success` TINYINT(1), `minutes_done` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `weeklyGoalId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`weeklyGoalId`) REFERENCES `weekly_goals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `daily_goals`;
 DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `username` VARCHAR(255), `password` VARCHAR(500), `email` VARCHAR(255), `first_name` VARCHAR(255), `last_name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `dailyGoalId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`dailyGoalId`) REFERENCES `daily_goals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
SHOW INDEX FROM `users`;
 DROP TABLE IF EXISTS `tasks`;
 CREATE TABLE IF NOT EXISTS `tasks` (`id` INTEGER NOT NULL auto_increment , `desc` VARCHAR(255), `done` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
 SHOW INDEX FROM `tasks`;
 DROP TABLE IF EXISTS `quits`;
 CREATE TABLE IF NOT EXISTS `quits` (`id` INTEGER NOT NULL auto_increment , `reason` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt`  DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
 SHOW INDEX FROM `quits`;
 DROP TABLE IF EXISTS `focus_sessions`;
 CREATE TABLE IF NOT EXISTS `focus_sessions` (`id` INTEGER NOT NULL auto_increment , `success` TINYINT(1), `duration` INTEGER, `actual_duration` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `userId` INTEGER, `quitId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (`quitId`) REFERENCES `quits` (`id`) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB;
 SHOW INDEX FROM `focus_sessions`;


