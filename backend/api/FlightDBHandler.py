from backend.Record import Record
from flask_restful import Resource, request
from flask_jwt_extended import  get_jwt_identity, jwt_required

# FlightDBHandler handles database operations with the flight table
class FlightDBHandler(Resource):
    def __init__(self, table, jwt, userRecord):
        self.tableRecord = Record(table)
        self.jwt = jwt
        self.userRecord = userRecord

    def get_flight_from_db(self,id):
        self.tableRecord.addQuery("id", id)
        self.tableRecord.query()
        try:
            record = next(self.tableRecord.results())
        except StopIteration:
            return None
        return record

    #helper function to create unique flight id in database
    def nextFlightNumber(self):
        self.tableRecord.query()
        for row in self.tableRecord.results():
            number = row.get('flightId')
        return number + 1

# Stores a flight selected in the client to the flight table
class StoreFlight(FlightDBHandler):
    def __init__(self,table,jwt, userRecord):
        super().__init__(table,jwt, userRecord)
    

    @jwt_required()   # requires a Bearer token in the HTTP method header
    def post(self):
        #Retrieve post content body
        args = request.json
        print(args)
        currentUser = get_jwt_identity() # gets the user email from the Bearer token
        userId = self.userRecord.get_user_id_from_db(currentUser)
        print(userId[0])
        nextFlightId = self.nextFlightNumber()
        # an array of flights is sent in the content body, we loop here to store each one to the DB
        for flight in args.get('flights'):
            #This insertion must be one line - multiline for easier reading results in large empty strings being inserted into the DB
            self.tableRecord.insert(f"{flight.get('airline')},{flight.get('arrivalAirport')},{flight.get('arrivalTime')},{flight.get('arrivalTerminal')},{flight.get('departureAirport')},{flight.get('departureTime')},{flight.get('departureTerminal')},{flight.get('flightTime')},{args.get('price')},{userId[0]}, {nextFlightId}")
        self.tableRecord.commit()

        #debug print
        self.tableRecord.query()
        for row in self.tableRecord.results():
            print(row)
            print()
        return {"msg": "Flight Saved! Click Search to search for another flight or visit your profile page to view your saved flights."}




                
                
                
