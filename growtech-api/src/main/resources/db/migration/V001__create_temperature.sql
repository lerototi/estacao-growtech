CREATE TABLE temperature(
	id_temp BIGINT(50) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	temperature double(4,2) NOT NULL,
	registre_date timestamp not null
)ENGINE = InnoDB DEFAULT CHARSET=utf8;