PRAGMA user_version = 1;

CREATE TABLE IF NOT EXISTS catalog (
	CatalogId		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	CatalogCode		VARCHAR2 NOT NULL UNIQUE,
	CatalogNameEn	VARCHAR2,
	CatalogNameRu	VARCHAR2,
	CreateDate		DATETIME DEFAULT CURRENT_TIMESTAMP,
	System			TINYINT DEFAULT 0
);

INSERT OR REPLACE INTO catalog(CatalogId, CatalogCode, CatalogNameEn, CatalogNameRu, System) 
VALUES 	(1, 'first', 'First', 'Первый', 0), 
		(2, 'second', 'Second', 'Второй', 1), 
		(3, 'third', 'Third', 'Третий', 0);

CREATE TABLE IF NOT EXISTS valueType (
	id				INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	code			VARCHAR2 NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS measure (
	id				INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	code			VARCHAR2 NOT NULL UNIQUE,
	code_en			VARCHAR2,
	code_ru			VARCHAR2,
	valueTypeId		INTEGER
);