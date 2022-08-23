from backend.Record import Record
from flask_restful import reqparse, Resource



#UserDBHandler handles database operations with the user table

class UserDBHandler(Resource):
    def __init__(self, table, bcryptObject):
        self.tableRecord = Record(table)
        self.bcrypt = bcryptObject          # used to hash password for secure storage in DB
        self.flightRecord = Record('flight')


    # return only user email and password from DB
    def get_user_from_db(self,emailaddress):
        self.tableRecord.addQuery("email", emailaddress)
        self.tableRecord.query()
        try:
            record = next(self.tableRecord.results())
        except StopIteration:
            return None
        return [record['email'],record['userpassword']]

    # return only Id from DB    
    def get_user_id_from_db(self,emailaddress):
        self.tableRecord.addQuery("email", emailaddress)
        self.tableRecord.query()
        try:
            record = next(self.tableRecord.results())
        except StopIteration:
            return None
        return [record['id']]

    # return entire user record from DB
    def getUser(self, current_user):
        self.tableRecord.addQuery('email', current_user)
        self.tableRecord.query()
        try:
            record = next(self.tableRecord.results())
        except StopIteration:
            return None
        return record


class RegisterUser(UserDBHandler):
    def __init__(self,table,bcryptObject):
        super().__init__(table,bcryptObject)
    # Create new user
    def post(self):
        #Retrieve post content body
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('password', type=str)
        args = parser.parse_args()
        # hash password and store to db
        if args:
            if self.get_user_from_db(args.email) is None:
                hashed_password = self.bcrypt.generate_password_hash(args.password).decode('utf-8')
                self.tableRecord.insert(f"{args.name},{args.email},{hashed_password}")
                self.tableRecord.commit()

                #debug print
                self.tableRecord.query()
                for row in self.tableRecord.results():
                    print(row)
                #end debug print
                # success message returned to user
                message = {"msg": f"Welcome to Up & Away {args.name}! Sign-in and click on Search to begin."},200
            else:
                # inform user account exists
                message = {"msg": f"This account already exists."},409
        else:
            # failure message returned to user
            message = {"msg": f"Invalid input"}, 400
        return message










