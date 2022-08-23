"""
This is a stand-alone program to initialize the databases. Running this file will drop and create new tables. 
This program is intended to be run once on deployment.

"""
import sqlite3
conn = sqlite3.connect('database.db', check_same_thread=False, timeout=10)

#execute sql script to create user table
with open('userSchema.sql') as f:
    conn.executescript(f.read())

with open('flightSchema.sql') as f: 
    conn.executescript(f.read())

cur = conn.cursor()


#initialize user table with test entry
cur.execute("INSERT INTO user (username, email, userpassword) VALUES (?, ?, ?)", 
    ('testuser', 'test@test', 'test'))

#initialize flight table with test entry
cur.execute("INSERT INTO flight (arrivalAirport, arrivalDateTime, arrivalTerminal, departureAirport, departureDateTime, departureTerminal, flightTime, price, userId, flightId) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)", 
    ('arrivalAirportTest', 'arrivalDateTimeTest', 'arrivalTerminalTest', 'departureAirportTest', 'departureDateTimeTest', 'departureTerminalTest', 'flightTimeTest', 'priceTest',0,0))

conn.commit()
conn.close()
