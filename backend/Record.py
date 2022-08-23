import sqlite3
from datetime import datetime

class Record:
    queryParams = {}    #user entered query params
    rows = []           #store query results
    queryString = ""    #sql string

    def __init__(self,tableName):
        self.tableName = tableName
        self.conn = sqlite3.connect('database.db', check_same_thread=False, timeout=10)
        self.conn.row_factory = sqlite3.Row  # return dictionary instead of tuple
        self.cur = self.conn.cursor()

    #accepts a string of comma separated values to insert into a table. User must know table schema.
    def insert(self,arg):
        now = datetime.now()
        dt_string = now.strftime("%Y-%m-%d %H:%M:%S")
        itemsToInsert = [None, dt_string] + arg.split(',')
        numColumns = len(itemsToInsert)
        sql = f"INSERT INTO {self.tableName} VALUES (" + ",".join(numColumns * ["?"]) + ")"
        print(sql)
        self.cur.execute(sql, itemsToInsert)

    #delete from the table item matching passed in column name and value
    def delete(self,columnName, value):
        sql = f"DELETE FROM {self.tableName} WHERE {columnName} = \'{value}\'"
        self.curr.execute(sql)


    #adds query parameters to be built into sql 
    def addQuery(self,param,value):
        self.queryParams.update({param:value})

    #builds SQL select statement from list of queries. Currently only support AND operations
    def queryBuilder(self):
        self.queryString = f"SELECT * FROM {self.tableName} "
        if len(self.queryParams) > 0:
            self.queryString +="WHERE "
            for index, key in enumerate(self.queryParams):
                self.queryString += f"{key} = \'{self.queryParams[key]}\'"
                if index != len(self.queryParams) - 1:
                    self.queryString += " AND WHERE "
    
    #queries a DB table and stores all matching results to rows
    def query(self,sql=None):
        if sql is None:
            self.queryBuilder()
            print(self.queryString)
            self.cur.execute(self.queryString)
            self.rows = self.cur.fetchall()
            self.queryParams.clear()
        else:   # in case we want to do a raw query
            self.cur.execute(sql)
            self.rows = self.cur.fetchall()


    #returns a generator object of query results
    def results(self):
        for row in self.rows:
            yield dict(row)

    # commit any changes to the database 
    def commit(self):
        self.conn.commit()

    # close the connection to the database
    def close_connection(self):
        self.conn.close()

    





