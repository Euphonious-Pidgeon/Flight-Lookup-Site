DROP TABLE IF EXISTS flight;

CREATE TABLE flight (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  airlineName TEXT,
  arrivalAirport TEXT,
  arrivalDateTime TEXT NOT NULL,
  arrivalTerminal TEXT,
  departureAirport TEXT,
  departureDateTime TEXT NOT NULL,
  departureTerminal TEXT,
  flightTime TEXT,
  price TEXT NULL,
  userId INTEGER, 
  flightId INTEGER
);

