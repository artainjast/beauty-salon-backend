CREATE TABLE mariNail_Reservation_Calender( id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key', startTime INT NOT NULL, endTime INT NOT NULL, currentSpace TINYINT NOT NULL, maximumSpace TINYINT NOT NULL, created_at INT NOT NULL, updated_at INT NOT NULL, deleted_at INT NOT NULL DEFAULT 0 );

CREATE TABLE mariNail_Reservation_Space(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    reservation_calender_id INT NOT NULL,
    customer_id INT NOT NULL,
    space_state TINYINT NOT NULL DEFAULT 0,
    created_at INT NOT NULL,
    updated_at INT NOT NULL, 
    deleted_at INT NOT NULL DEFAULT 0,
    FOREIGN KEY (`reservation_calender_id`) REFERENCES `mariNail_Reservation_Calender` (`id`),
    FOREIGN KEY (`customer_id`) REFERENCES `mariNail_Customers` (`ID`)
);