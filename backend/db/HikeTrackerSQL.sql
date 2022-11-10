BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "HikesReferencePoints" (
	"hikeId"	INTEGER NOT NULL,
	"locationId"	INTEGER NOT NULL,
	PRIMARY KEY("hikeId","locationId"),
	FOREIGN KEY("hikeId") REFERENCES "Hikes"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY("locationId") REFERENCES "Locations"("id") ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Hikes" (
	"id"	INTEGER NOT NULL,
	"title"	TEXT NOT NULL,
	"length"	REAL NOT NULL,
	"expTime"	REAL NOT NULL,
	"ascent"	REAL NOT NULL,
	"difficulty"	TEXT NOT NULL CHECK("difficulty" = "tourist" OR "difficulty" = "hiker" OR "difficulty" = "pro"),
	"startPt"	INTEGER NOT NULL,
	"endPt"	INTEGER NOT NULL,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("startPt") REFERENCES "Locations"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY("endPt") REFERENCES "Locations"("id") ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "Locations" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"type"	TEXT NOT NULL CHECK("type" = "hut" OR "type" = "parkinglot" OR "type" = "generic"),
	"latitude"	REAL NOT NULL,
	"longitude"	REAL NOT NULL,
	"country"	TEXT,
	"province"	TEXT,
	"town"	TEXT,
	"address"	TEXT,
	"altitude"	REAL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Users" (
	"email"	TEXT NOT NULL UNIQUE,
	"fullname"	TEXT NOT NULL,
	"password"	TEXT NOT NULL UNIQUE,
	"salt"	TEXT NOT NULL CHECK(LENGTH("salt") = 32),
	"role"	TEXT NOT NULL CHECK("role" = "hiker" OR "role" = "guide" OR "role" = "manager" OR "role" = "hutworker" OR "role" = "emergency"),
	PRIMARY KEY("email")
);
INSERT INTO "HikesReferencePoints" ("hikeId","locationId") VALUES (1,1);
INSERT INTO "HikesReferencePoints" ("hikeId","locationId") VALUES (1,2);
INSERT INTO "HikesReferencePoints" ("hikeId","locationId") VALUES (1,3);
INSERT INTO "Hikes" ("id","title","length","expTime","ascent","difficulty","startPt","endPt","description") VALUES (1,'Sentiero per il Rocciamelone',9.0,6.5,1353.0,'pro',1,2,'Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti).');
INSERT INTO "Locations" ("id","name","type","latitude","longitude","country","province","town","address","altitude") VALUES (1,'Rifugio La Riposa','hut',45.1788097585636,7.08152295397762,'Italy','TO','Mompantero','Frazione La Riposa',2185.0);
INSERT INTO "Locations" ("id","name","type","latitude","longitude","country","province","town","address","altitude") VALUES (2,'Rocciamelone','generic',45.2038832386576,7.07699005470178,'Italy','TO','Usseglio',NULL,3538.0);
INSERT INTO "Locations" ("id","name","type","latitude","longitude","country","province","town","address","altitude") VALUES (3,'Punto inventato #1','parkinglot',45.1988097585635,7.07809005470178,'Italy','TO','fakeTown',NULL,2500.0);
INSERT INTO "Users" ("email","fullname","password","salt","role") VALUES ('maurizio.merluzzo@donkeykong.com','Maurizio Merlo Petruzzo','toBeHashed','AtswZqh7TP7M07S9oUEjhACtA9UKVnft','hiker');
INSERT INTO "Users" ("email","fullname","password","salt","role") VALUES ('antonio.fracassa@live.it','Antonio Francesco Cassa','toBeHashed2','E3s7dCHAKNkeCSlWnmch7TY66EEyh0b5','guide');
INSERT INTO "Users" ("email","fullname","password","salt","role") VALUES ('giulio.uzumaki@tokio.it','Giulio Riccio','to be...','LJIT2NXGYObsuZyeZTKZQx6nU5HVe6ci','manager');
INSERT INTO "Users" ("email","fullname","password","salt","role") VALUES ('jen.shiro@chiocciola.it','Gennaro Sciro','or not to be','xhVnJapuMLtBwShK8UfHgOHBiPlQdJu9','hutworker');
INSERT INTO "Users" ("email","fullname","password","salt","role") VALUES ('tony.stark@libero.it','Antonio Forza','hash me, and then just touch me, until I get my, SATISFACTION','vwHEEb8x8vFUsHsQJnJNftMUgel1cqUF','emergency');
COMMIT;
