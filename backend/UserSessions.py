from flask_jwt_extended import create_access_token, get_jwt_identity, \
                                unset_jwt_cookies, jwt_required
from flask_restful import reqparse, Resource
from flask import jsonify

#The JWTSession class handles user authentication

class JWTSession(Resource):
    def __init__(self,jwt, userRecord):
        self.jwt = jwt               # JSON Web Token object
        self.userRecord = userRecord # UserDBHandler object

        
    
# # To be implemented if time
# # class RefreshToken(JWTSession):
# #     @jwt_required(refresh=True)
# #     def post(self):
# #         identity = get_jwt_identity()
# #         access_token = create_access_token(identity=identity)
# #         return jsonify(access_token=access_token)

# Create a JWT token to return to the user on sign-in
class CreateToken(JWTSession):
    def __init__(self, jwt, userRecord):
        super().__init__(jwt, userRecord)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        try:
            if args:
                # checking if the user already exists or if their email or password are incorrect. In both cases we inform the user the credentials are wrong
                db_results = self.userRecord.get_user_from_db(args.email)
                password_matches = self.userRecord.bcrypt.check_password_hash(db_results[1], args.password)
                if db_results is None or args.email != db_results[0] or not password_matches:
                    response = {"msg": "Wrong email or password."}, 401
                else:
                    access_token = create_access_token(identity=args.email) # set the JWT token to include the users email as a user id
                    response = {"access_token": access_token}
            else:
                response = {"msg": "Bad request!"}, 400
        except TypeError:
            response = {"msg": "Bad request!"}, 400
        print(response)
        return response

# handle the logout request by the user. 
class Logout(JWTSession):
    def __init__(self,jwt,userRecord):
        super().__init__(jwt,userRecord)


    @jwt_required() # Requires a Bearer token in the HTTP header
    def get(self):
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response


# return user profile data to the requester. 
class Profile(JWTSession):
    def __init__(self, jwt, userRecord):
        super().__init__(jwt, userRecord)

    @jwt_required() # Requires a Bearer token in the header
    def get(self):
        profileResults = []
        current_user = get_jwt_identity()  # gets the user email from the Bearer token
        # retrieve any saved flights for this user
        sql = f"SELECT * FROM flight JOIN user ON user.id = flight.userId WHERE user.email = \'{current_user}\'"
        self.userRecord.tableRecord.query(sql)
        for row in self.userRecord.tableRecord.results():
            profileResults.append(row)
        # if there are no saved flights, just send the user data
        if not profileResults:
            profileResults.append(self.userRecord.getUser(current_user))
        return profileResults

    

