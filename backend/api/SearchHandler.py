from flask_restful import Resource, request
import json
from backend.api.AmadeusApiHandler import AmadeusApiHandler


# Exception class for when a user inputs a city that does not exist 
class CityNotFound(Exception):
    def __init__(self, message="City Not Found") -> None:
        super(CityNotFound, self).__init__(message)

# SearchHandler class processes user input before passing to Amadeus API
class SearchHandler(Resource):

    iata_code = ""
    airport_name = ""

    def __init__(self):
        self.amadeusApi = AmadeusApiHandler()

    # handles HTTP GET method sent by client
    def get(self):
        args = request.args
        startingCity = "".join(args.getlist('startingCity')[0]).lower().title()
        print(startingCity)
        endingCity = "".join(args.getlist('endingCity')[0]).lower().title()
        try:
            start_iata_code = self.findMatch(startingCity)
            end_iata_code = self.findMatch(endingCity)
        except CityNotFound as e:
            print(e)
            return {"msg": "No results found for this search."}, 400
        amadeusResponse = self.amadeusApi.getData(
                                start_iata_code,
                                end_iata_code,
                                args.getlist('startDate')[0],
                                args.getlist('numAdults')[0],
                                args.getlist('travelClass')[0],
                                args.getlist('nonStop')[0]
                                )
        return amadeusResponse

    #convert input city name into iata code
    def findMatch(self, user_input):
        with open("../backend/data/airports.json", encoding="utf-8") as f:
            data = json.loads(f.read())
        #user_input = "New York"

        for i in data.keys():
            for j in data.values():
                if j["city"] == user_input.lower().title():
                    code = j["iata"]
                    return code
        raise CityNotFound()




    
                    
            
                
                    
        


        
