from amadeus import Client, ResponseError
import json

#The AmadeusAPIHandler handles API authentication, API requests, and API response processing

class AmadeusApiHandler():

    def __init__(self):
        #Creates a bearer token to authorize API requests
        self.amadeus = Client(
            client_id='insert Amadeus API token',
            client_secret='insert secret Key'
        )
    
    # Generate condensed JSON data to better manipulate in the front-end
    # price, airline name, flight time, 
    def parseResponse(self, responseData):
        myList =  []
        index = 0
        for item in responseData.data:
            for itinerary in item["itineraries"]:
                flights = []
                for segment in itinerary["segments"]:
                    # convert airline code to airline name
                    airline = self.convertCarrierCode(segment.get('operating',{}).get('carrierCode',{}))
                    flights.append(
                        {

                            'airline': airline,
                            'arrivalAirport': segment.get('arrival',{}).get('iataCode',{}),
                            'arrivalTime': segment.get('arrival',{}).get('at',{}),
                            'arrivalTerminal' : segment.get('arrival', {}).get('terminal',{}),
                            'departureAirport' : segment.get('departure',{}).get('iataCode',{}),
                            'departureTime' : segment.get('departure',{}).get('at',{}),
                            'departureTerminal' : segment.get('departure',{}).get('terminal',{}),
                            'flightTime' : segment.get('duration', {})
                    
                        }
                    )
                myList.append(
                    {
                        'index' : index,
                        'price' : item.get('price', {}).get('grandTotal', {}),
                        'flights': flights
                    }
                )
                index = index + 1
        return myList

    # unused - to be implemented at future data for hotel searches
    def getHotels(self, city):
        return self.amadeus.shopping.hotel_offers.get(cityCode=city)



    # Searches for carrier code and carrier name match in carriers.json
    def convertCarrierCode(self, code):
        with open("../backend/data/carriers.json", encoding="utf-8") as f:
            data = json.loads(f.read())
        
        for i in data:
            if i["Code"] == code:
                return i["Description"]
        return " "
           

                    
    # connect to Amadeus and retrieve flight data
    def getData(self,olc,dlc,dd,a,tc,ns):
        try:
            ### original API
            response = self.amadeus.shopping.flight_offers_search.get(
                originLocationCode=olc,
                destinationLocationCode=dlc,
                departureDate=dd,
                currencyCode="USD",
                adults=a,
                max = 100,
                travelClass = tc,
                nonStop = ns
        )   
            return self.parseResponse(response)
        except ResponseError as e:
            print(e)
            return e