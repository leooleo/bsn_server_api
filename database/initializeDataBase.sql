CREATE TABLE sessions (
    sessionId int NOT NULL,    
    PRIMARY KEY (sessionId)
);

CREATE TABLE vitalData (
    dataId SERIAL,        
    sessionId int NOT NULL,
    data char(200),
    PRIMARY KEY (dataId),
    FOREIGN KEY (sessionId) REFERENCES sessions(sessionId)
);

CREATE TABLE relialibilityCostData (
    relialibilityCostId SERIAL,
    sessionId int NOT NULL,
    timeInserted TIMESTAMP,
    reliability int,
    cost int,
    PRIMARY KEY (relialibilityCostId),
    FOREIGN KEY (sessionId) REFERENCES sessions(sessionId)
);