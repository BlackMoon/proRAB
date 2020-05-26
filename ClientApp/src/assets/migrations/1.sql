PRAGMA user_version = 1;

CREATE TABLE IF NOT EXISTS catalog (
	CatalogId		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	CatalogCode		VARCHAR2 NOT NULL UNIQUE,
	CatalogNameEn	VARCHAR2,
	CatalogNameRu	VARCHAR2
);


INSERT OR REPLACE INTO catalog(CatalogId, CatalogCode, CatalogNameEn, CatalogNameRu) 
VALUES 	(1, 'first', 'first', 'первый'), 
		(2, 'second', 'second', 'второй'), 
		(3, 'third', 'third', 'третий');

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