CREATE TABLE `audio_history`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `participant_id` INT NOT NULL,
    `audio_id` INT NOT NULL,
    `played_date` TIMESTAMP NOT NULL,
    `position` INT NOT NULL
);
CREATE TABLE `group`(
    `group_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL
);
CREATE TABLE `permission`(
    `permission_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` INT NOT NULL,
    `method` ENUM('') NOT NULL,
    `url_pattern` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL
);
CREATE TABLE `subtitle`(
    `subtitle_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `audio_id` INT NOT NULL,
    `language` ENUM('') NOT NULL
);
CREATE TABLE `table_13`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comment_id` INT NOT NULL,
    `participant_id` INT NOT NULL,
    `interaction_type` ENUM('') NOT NULL
);
CREATE TABLE `comment`(
    `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `audio_id` INT NOT NULL,
    `participant_id` INT NOT NULL,
    `content` TEXT NOT NULL,
    `like_count` INT NOT NULL,
    `dislike_count` INT NOT NULL
);
CREATE TABLE `album`(
    `album_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `cover_image_url` VARCHAR(255) NOT NULL,
    `release_date` TIMESTAMP NOT NULL,
    `is_public` BOOLEAN NOT NULL
);
CREATE TABLE `role`(
    `role_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL
);
CREATE TABLE `participant`(
    `participant_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NULL,
    `google_id` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `create_at` TIMESTAMP NOT NULL,
    `group_id` INT NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `jwt_token` TEXT NOT NULL,
    `refresh_token` VARCHAR(255) NOT NULL,
    `refresh_token_expire` TIMESTAMP NOT NULL,
    `delete_at` TIMESTAMP NOT NULL,
    `password_reset_token` VARCHAR(255) NOT NULL,
    `password_reset_token_expire` TIMESTAMP NOT NULL,
    `avatar_url` TEXT NOT NULL,
    `is_verified` BOOLEAN NOT NULL,
    `last_login` TIMESTAMP NOT NULL
);
ALTER TABLE
    `participant` ADD UNIQUE `participant_username_unique`(`username`);
ALTER TABLE
    `participant` ADD UNIQUE `participant_google_id_unique`(`google_id`);
ALTER TABLE
    `participant` ADD UNIQUE `participant_email_unique`(`email`);
CREATE TABLE `group_role`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `group_id` INT NOT NULL,
    `role_id` INT NOT NULL
);
CREATE TABLE `permission_role`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `permisstion_id` INT NOT NULL,
    `role_id` INT NOT NULL
);
CREATE TABLE `audio`(
    `audio_id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `album_id` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `file_url` VARCHAR(500) NOT NULL,
    `upload_date` TIMESTAMP NOT NULL,
    `play_acount` INT NOT NULL,
    `like_count` INT NOT NULL,
    `is_public` BOOLEAN NOT NULL,
    `duration` INT NOT NULL
);
CREATE TABLE `favorite_audio`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `participant_id` INT NOT NULL,
    `audio_id` INT NOT NULL,
    `added_date` TIMESTAMP NOT NULL
);
ALTER TABLE
    `audio_history` ADD CONSTRAINT `audio_history_audio_id_foreign` FOREIGN KEY(`audio_id`) REFERENCES `audio`(`audio_id`);
ALTER TABLE
    `group_role` ADD CONSTRAINT `group_role_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `role`(`role_id`);
ALTER TABLE
    `group_role` ADD CONSTRAINT `group_role_group_id_foreign` FOREIGN KEY(`group_id`) REFERENCES `group`(`group_id`);
ALTER TABLE
    `permission_role` ADD CONSTRAINT `permission_role_permisstion_id_foreign` FOREIGN KEY(`permisstion_id`) REFERENCES `permission`(`permission_id`);
ALTER TABLE
    `permission_role` ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `role`(`role_id`);
ALTER TABLE
    `audio` ADD CONSTRAINT `audio_album_id_foreign` FOREIGN KEY(`album_id`) REFERENCES `album`(`album_id`);
ALTER TABLE
    `favorite_audio` ADD CONSTRAINT `favorite_audio_audio_id_foreign` FOREIGN KEY(`audio_id`) REFERENCES `audio`(`audio_id`);
ALTER TABLE
    `subtitle` ADD CONSTRAINT `subtitle_audio_id_foreign` FOREIGN KEY(`audio_id`) REFERENCES `audio`(`audio_id`);
ALTER TABLE
    `table_13` ADD CONSTRAINT `table_13_participant_id_foreign` FOREIGN KEY(`participant_id`) REFERENCES `participant`(`participant_id`);
ALTER TABLE
    `favorite_audio` ADD CONSTRAINT `favorite_audio_participant_id_foreign` FOREIGN KEY(`participant_id`) REFERENCES `participant`(`participant_id`);
ALTER TABLE
    `participant` ADD CONSTRAINT `participant_group_id_foreign` FOREIGN KEY(`group_id`) REFERENCES `group`(`group_id`);
ALTER TABLE
    `audio_history` ADD CONSTRAINT `audio_history_participant_id_foreign` FOREIGN KEY(`participant_id`) REFERENCES `participant`(`participant_id`);
ALTER TABLE
    `comment` ADD CONSTRAINT `comment_audio_id_foreign` FOREIGN KEY(`audio_id`) REFERENCES `audio`(`audio_id`);
ALTER TABLE
    `comment` ADD CONSTRAINT `comment_participant_id_foreign` FOREIGN KEY(`participant_id`) REFERENCES `participant`(`participant_id`);
ALTER TABLE
    `table_13` ADD CONSTRAINT `table_13_comment_id_foreign` FOREIGN KEY(`comment_id`) REFERENCES `comment`(`comment_id`);