BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "HikesReferencePoints" (
	"hikeId"	INTEGER NOT NULL,
	"locationId"	INTEGER NOT NULL,
	FOREIGN KEY("locationId") REFERENCES "Locations"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY("hikeId") REFERENCES "Hikes"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("hikeId","locationId")
);
CREATE TABLE "HikesHaveHuts" (
	"hikeId"	INTEGER,
	"locationId"	INTEGER,
	PRIMARY KEY("hikeId","locationId"),
	FOREIGN KEY("hikeId") REFERENCES "Hikes"("id") ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY("locationId") REFERENCES "Locations"("id") ON DELETE CASCADE ON UPDATE CASCADE
)
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
CREATE TABLE IF NOT EXISTS "Preferences" (
	"email"	TEXT,
	"duration"	REAL,
	"ascent"	REAL,
	FOREIGN KEY("email") REFERENCES "Users"("email") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("email")
);
CREATE TABLE IF NOT EXISTS "Users" (
	"email"	TEXT NOT NULL UNIQUE,
	"fullname"	TEXT NOT NULL,
	"password"	TEXT NOT NULL UNIQUE,
	"salt"	TEXT NOT NULL CHECK(LENGTH("salt") = 32),
	"role"	TEXT NOT NULL CHECK("role" = "hiker" OR "role" = "guide" OR "role" = "manager" OR "role" = "hutworker" OR "role" = "emergency"),
	"phoneNumber"	TEXT,
	PRIMARY KEY("email")
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
	"track" TEXT,
	"author"	TEXT NOT NULL DEFAULT "antonio.fracassa@live.it",
	FOREIGN KEY("endPt") REFERENCES "Locations"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY("startPt") REFERENCES "Locations"("id") ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY("author") REFERENCES "Users"("email") ON UPDATE CASCADE ON DELETE CASCADE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "Locations" ("id","name","type","latitude","longitude","country","province","town","address","altitude") VALUES (1,'Rifugio La Riposa','hut',45.1788097585636,7.08152295397762,'Italy','TO','Mompantero','Frazione La Riposa',2185.0);
INSERT INTO "Locations" ("id","name","type","latitude","longitude","country","province","town","address","altitude") VALUES (2,'Rocciamelone','generic',45.2038832386576,7.07699005470178,'Italy','TO','Usseglio',NULL,3538.0);
INSERT INTO "Locations" ("id","name","type","latitude","longitude","country","province","town","address","altitude") VALUES (3,'Punto inventato #1','parkinglot',45.1988097585635,7.07809005470178,'Italy','TO','fakeTown',NULL,2500.0);
INSERT INTO "Users" VALUES ('maurizio.merluzzo@donkeykong.com','Maurizio Merlo Petruzzo','wEkfFXBNy+IsamBf6ytlsya/k6VHqYeShPLS5uqFBqbARNNz5EQdgTOIQeGYYSSSv0vRWGM7Xzu2GsN+Po0+hieejGaQbPfibwvBYwYkLs26B9tlQvLnTKiOzoi700G+Fc1gLtxwCvTQTCzttPOLnuS6/KbEzCSfMSlQpuxlEnI=','AtswZqh7TP7M07S9oUEjhACtA9UKVnft','hiker',NULL,'x',1);
INSERT INTO "Users" VALUES ('antonio.fracassa@live.it','Antonio Francesco Cassa','AaAQ4UD5SoYRpR7SoVYGI8Degr33JNOgveYVN1h6pjEo2EWOZslIDkhSIXo5CDjunRRgjsE6aniEjUuBGMBoyT03fFy/XK5QYuqKjPVTGJRaiz38y3QzdUi4eGo1hAZW3lOIGWcHZP+nk6ZOwCE4Z+OGnQ15SWOaZoxxnbEwzhs=','E3s7dCHAKNkeCSlWnmch7TY66EEyh0b5','guide',NULL,'x',2);
INSERT INTO "Users" VALUES ('giulio.uzumaki@tokio.it','Giulio Riccio','7y0PW2S5AUD835HdLjL0HW37P1N7kkbW1/J7QiYnSf4AcQWOVDJwP+gsm8Bnsmn5+PD7wxGJIKS9euEC9qW8aCyTmSrLYA6IsPQZs6sgsSqTKBwuPCiSO1lXuaIq6EwdOmsu2U5QrmZE0Wi829l+/ZC9uweMjfSocZbCOOkp5Mc=','LJIT2NXGYObsuZyeZTKZQx6nU5HVe6ci','manager',NULL,'x',2);
INSERT INTO "Users" VALUES ('jen.shiro@chiocciola.it','Gennaro Sciro','sOt9Nho8guyM9KXLp4nfCz1YOuAKCpzL0dhGtMMTlCESwLNc8MQUdBe3HvZ9nLnkotcjSvcZhV5vOsAr9ldD2++55nt9G387LH4iDKodw8RM/6a+XQx0MN1X5M3hHncPmqz7/wcgGLu27CWF7KsuNeJRcb9dC259PT+XTIK7/Gw=','xhVnJapuMLtBwShK8UfHgOHBiPlQdJu9','hutworker',NULL,'x',2);
INSERT INTO "Users" VALUES ('tony.stark@libero.it','Antonio Forza','9ZIZ5stthAwpSfQbaDzMtkXge0u/Defydo+kNwzOgJ3g4Z+r5ooWJCPLzv4jeU9xLsgXoqe4i7Ejoain08envPgSUe61c5bOnIChAC/rckqkQGhIALQEG5RRPTyHCx+y92/pzDXdh5NbQVrRUKc0iHRZyyU1MGpahadnDrSTkQo=','vwHEEb8x8vFUsHsQJnJNftMUgel1cqUF','emergency',NULL,'x',2);
INSERT INTO "Hikes" ("id","title","length","expTime","ascent","difficulty","startPt","endPt","description","author") VALUES (1,'Sentiero per il Rocciamelone',9.0,6.5,1353.0,'pro',1,2,'Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto con un punto di appoggio a metà strada circa (Il Rifugio gestito Ca’ d’Asti).','antonio.fracassa@live.it');
INSERT INTO "Hikes" ("id","title","length","expTime","ascent","difficulty","startPt","endPt","description","author") VALUES (2,'testTitle',123.0,6.5,1000.0,'pro',1,2,'testDescription','antonio.fracassa@live.it');
INSERT INTO "Hikes" ("id","title","length","expTime","ascent","difficulty","startPt","endPt","description","author") VALUES (3,'testingTitle1',1234.5,6.5,1000.0,'pro',1,2,'Testing description, just to check that it works','antonio.fracassa@live.it');
INSERT INTO "HikesReferencePoints" ("hikeId","locationId") VALUES (1,1);
INSERT INTO "HikesReferencePoints" ("hikeId","locationId") VALUES (1,2);
INSERT INTO "HikesReferencePoints" ("hikeId","locationId") VALUES (1,3);
COMMIT;
