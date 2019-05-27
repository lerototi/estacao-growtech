CREATE TABLE humidity(
	id_humidity BIGINT(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    humidity DOUBLE(4,2) NOT NULL,
    registre_date datetime NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET=utf8;