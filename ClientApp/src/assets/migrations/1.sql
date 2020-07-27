PRAGMA user_version = 1;

CREATE TABLE IF NOT EXISTS catalog (
	CatalogId			INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	CatalogCode			VARCHAR NOT NULL UNIQUE,
	CatalogNameEn		VARCHAR,
	CatalogNameRu		VARCHAR,	
	TableName			VARCHAR,
	IsSystem			TINYINT DEFAULT 0,
	CreateDate			DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS field (
	FieldId				INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	CatalogId			INTEGER NOT NULL,	
	FieldCode			VARCHAR NOT NULL,
	FieldNameEn			VARCHAR,
	FieldNameRu			VARCHAR,
	CreateDate			DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY(CatalogId) REFERENCES catalog(CatalogId)
);

CREATE UNIQUE INDEX IF NOT EXISTS uxField ON field (
	CatalogId,
	FieldCode
);

CREATE TABLE IF NOT EXISTS catalogBlock (
	CatalogBlockId		INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	CatalogBlockNameEn	VARCHAR,
	CatalogBlockNameRu	VARCHAR,
	Density				REAL DEFAULT 0,
	Mass				REAL DEFAULT 0,
	CreateDate			DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO catalog(CatalogId, CatalogCode, CatalogNameEn, CatalogNameRu, TableName, IsSystem) 
VALUES 	(1, 'block', 'Blocks', 'Блоки', 'catalogBlock', 0), 
		(2, 'material', 'Materials', 'Материалы', 'catalogMaterial', 1);

INSERT OR IGNORE INTO catalogBlock(CatalogBlockId, CatalogBlockNameEn, CatalogBlockNameRu, Density, Mass) 
VALUES 	(1, 'white brick', 'кирпич белый', 7000, 6),
		(2, 'red brick', 'кирпич красный', 6000, 5),
		(3, 'decorate brick', 'кирпич облицовочный', 6000, 5);

INSERT OR IGNORE INTO field(CatalogId, FieldCode, FieldNameEn, FieldNameRu) 
VALUES 	(1, 'density', 'Density', 'Плотность, кг/м3'),
		(1, 'mass', 'Mass', 'Масса, кг');

CREATE TABLE IF NOT EXISTS valueType (
	ValueTypeId			INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	ValueTypeCode		VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS measure (
	id					INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	code				VARCHAR NOT NULL UNIQUE,
	code_en				VARCHAR,
	code_ru				VARCHAR,
	valueTypeId			INTEGER
);