import mysql.connector as mysql
from datetime import date,datetime,timedelta
import os
import json

sep = os.path.sep
fullpath = "config"+sep+"database.json"
config = open(fullpath,"r")
settings = config.read()
data = json.loads(settings)

print(data)

tomorrow = datetime.now() + timedelta(days=30)
print(tomorrow)

mydb = mysql.connect(
host="localhost",
user="root",
passwd="",
database="mydatabase"
)
print(mydb)
mycursor = mydb.cursor()
#CREATE DATABASE
#sql = """
#CREATE DATABASE mydatabase
#"""
#mycursor.execute(sql)


#CHECK DBs
"""
sql = ""
SHOW DATABASES
""
mycursor.execute(sql)

for x in mycursor:
	print(x)
	
"""
#CREATE A TABLE
"""
sql = ""
CREATE TABLE users(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(255),
	fav INT
	
)
""
sql = ""
CREATE TABLE products(
	id INT NOT NULL,
	name VARCHAR(255)
)

"""

sql = "SELECT \
  users.name AS user, \
  products.name AS favorite \
  FROM users \
  INNER JOIN products ON users.fav = products.id"

#val = [(140,"Chocolate heaven"),(341,"Butter Soup")]
mycursor.execute(sql)

myresult = mycursor.fetchall()
print(myresult)

#ADD COLUMN
"""
sql2 = ""
ALTER TABLE customers ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY
""
mycursor.execute(sql2)
"""
#CHECK TABLES
"""
sql = ""
SHOW TABLES
""

mycursor.execute(sql)

for x in mycursor:
	print(x)
"""
#INSERT DATA
"""
sql = ""
INSERT INTO customers (name,address)
VALUES (%s,%s)
""
val = ("Josephine","John Lang")

mycursor.execute(sql,val)


#required to make changes
mydb.commit()

print(mycursor.rowcount,"record inserted.")
"""

#INSERT MULTIPLE ROWS
"""
sql = ""
INSERT INTO customers (name,address)
VALUES (%s,%s)
""
val = [
	("Anely","Kamwala South"),
	("Brenda","John Lang"),
	("Precious","John Lang")
]


mycursor.executemany(sql,val)
mydb.commit()

print(mycursor.rowcount,"was recorded");
"""
#INSERT AND RETRIEVE ID
"""
sql = ""
INSERT INTO customers (name,address)
VALUES (%s,%s)
""
val = ("Nancy","Kamwala South")
mycursor.execute(sql,val)
mydb.commit()

print(" 1 record inserted ID:",mycursor.lastrowid)

"""

"""
sql = ""
SELECT * FROM customers
WHERE address = 'Kamwala South'
""

mycursor.execute(sql)

myresult = mycursor.fetchall()

for x in myresult:
	print(x)
"""	
	
#WILDCARD CHARACTERS
"""
sql = ""
SELECT * FROM customers
WHERE address LIKE '%South%'
ORDER BY id DESC
""

mycursor.execute(sql)

myresult = mycursor.fetchall()

print(myresult)
"""
#FROM A SPECIC ROW
""""
sql = ""
	SELECT * FROM customers
	LIMIT 5
	OFFSET 3
""
mycursor.execute(sql)
myresult = mycursor.fetchall()

print(myresult)
"""


