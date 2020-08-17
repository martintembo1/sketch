import mysql.connector as mysql
from datetime import date,datetime,timedelta
import os
import json

today = datetime.now() + timedelta(days=0)
time = datetime.now()
print(today)
"""
mydb = mysql.connect(
host="localhost",
user="root",
passwd="",
database="mydatabase"
)
"""




class User(object):

    def __init__(self,config=None):

        sep = os.path.sep
        fullpath = "utils"+sep+"models"+sep+"config"+sep+"database.json"
        config = open(os.path.abspath(fullpath),"r")
        settings = config.read()
        user  = json.loads(settings)
        self.__host = user["host"]
        self.__user = user["user"]
        self.__password = user["pass"]
        self.__db = user["database"]
        print(user)

        try:
            self.mydb  = mysql.connect(
                host=self.__host,
                user=self.__user,
                passwd=self.__password,
                database=self.__db
            )
            print("Connected with database")
            self.mycursor = self.mydb.cursor()

        except:
            self.mydb = mysql.connect(
                host=self.__host,
                user=self.__user,
                passwd=self.__password
            )
            print("Connected no database")

            self.mycursor = self.mydb.cursor()
    def exc(self,sql,val=None):
    	if val is None:
    		
    		f_exec = self.mycursor.execute(sql) 
    		return f_exec
    		 
    	else:
    		f_exec = self.mycursor.execute(sql,val)
    		return f_exec
    	
    def done(self):
    	try:	
    		self.mydb.commit()
    	except Exception(e):
    		
    		return f'{e}'

    def createDB(self,db_name):
        sql = f"""
        CREATE DATABASE IF NOT EXISTS {db_name}
        """
        self.exc(sql,db_name)
    def insert(self,table,data):
        sql = f"""
        INSERT INTO {table} (owners_name,company_name,company_line,password)
        
        VALUES(%s,%s,%s,%s)
                
        """
        self.exc(sql,data)
        self.done()

    def createTABLE(self,table_name):
        sql = f"""
        CREATE TABLE IF NOT EXISTS {table_name}(
        id INT NOT NULL  AUTO_INCREMENT PRIMARY KEY,
        owners_name VARCHAR(60),
        owners_line VARCHAR(20), 
        owners_picture BLOB NULL, 
        password VARCHAR(100) NOT NULL, 
        company_name VARCHAR(60) NOT NULL, 
        company_line varchar(20) NOT NULL, 
        company_picture BLOB NULL, 
        created_date DATE
        )
        """
        sql2 = f"""
        CREATE TABLE IF NOT EXISTS {table_name}(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(60) NOT NULL,
            contents TEXT NOT NULL,
            created_date DATE
        )
        """
        if table_name == "feedback":
            self.exc(sql2)

        elif table_name == "user":
            self.exc(sql)

        else:
            print("Already a user")

    def login(self,userAccount,password):
        
        sql = """
        SELECT owners_name,password
        FROM admin
        """
        self.exc(sql)
        print("LOGIN AREA")
        admin = self.mycursor.fetchone()
        adminName = admin[0]
        adminPass = admin[1]
        if userAccount == adminName and password == adminPass:
            #cookies
            
            print("Logged in")
            
            return True

        else:
            print("Not Logged in")
            return False

    def postFeedback(self,content):

        sql = """
        INSERT INTO feedback(username,contents)
        VALUES(%s,%s)
        """
        
        if type(content) == tuple and content is not None:
            try:
                self.exc(sql,content)
                self.done()
                print("feedback posted")
                return True
            except Exception as e:
                print(e," :feedback not posted")
                return False

    def getUsername(self):

        sql = """
        SELECT owners_name FROM admin
        """
        self.exc(sql)
        username = self.mycursor.fetchone()
        
        return username[0]
    def getPassword(self):
        sql = """
        SELECT password FROM admin
        """
        self.exc(sql)
        password = self.mycursor.fetchone()
        return password[0]
