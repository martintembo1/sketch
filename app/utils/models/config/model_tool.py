#  
#  DB Script Tool
#  Python - 2020-05-31 09:55:34
#  
#  MODEL CLASSES FOR dbSalesDemo DATABASE
#



# Products.py -------------------------------------
from datetime import datetime, date

# 
# Python - Model Class - dbSalesDemo.products
# products
#
class Products(Object):

    #
    # Constructor
    #
    # Example: 
    # myProducts = Products( val1, val2,.. )
    #
    def __init__(self, id = None, category_id = None, category_name = None, status = None, details = None, cost_price = None, selling_price = None, date_from = None, date_to = None):
        self.__id = id
        self.__category_id = category_id
        self.__category_name = category_name
        self.__status = status
        self.__details = details
        self.__cost_price = cost_price
        self.__selling_price = selling_price
        self.__date_from = date_from
        self.__date_to = date_to


    #
    # Properties
    #

    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, id):
        self.__id = id

    @property
    def category_id(self):
        return self.__category_id

    @category_id.setter
    def category_id(self, category_id):
        self.__category_id = category_id

    @property
    def category_name(self):
        return self.__category_name

    @category_name.setter
    def category_name(self, category_name):
        self.__category_name = category_name

    @property
    def status(self):
        return self.__status

    @status.setter
    def status(self, status):
        self.__status = status

    @property
    def details(self):
        return self.__details

    @details.setter
    def details(self, details):
        self.__details = details

    @property
    def cost_price(self):
        return self.__cost_price

    @cost_price.setter
    def cost_price(self, cost_price):
        self.__cost_price = cost_price

    @property
    def selling_price(self):
        return self.__selling_price

    @selling_price.setter
    def selling_price(self, selling_price):
        self.__selling_price = selling_price

    @property
    def date_from(self):
        return self.__date_from

    @date_from.setter
    def date_from(self, date_from):
        self.__date_from = date_from

    @property
    def date_to(self):
        return self.__date_to

    @date_to.setter
    def date_to(self, date_to):
        self.__date_to = date_to



    #
    # Methods
    #

    def __str__ (self):
        return ""



# User.py -------------------------------------
from datetime import datetime, date

# 
# Python - Model Class - dbSalesDemo.user
# admin
#
class User(Object):

    #
    # Constructor
    #
    # Example: 
    # myUser = User( val1, val2,.. )
    #
    def __init__(self, id = None, owners_name = None, owners_line = None, owners_picture = None, password = None, company_name = None, company_line = None, company_picture = None, created_date = None):
        self.__id = id
        self.__owners_name = owners_name
        self.__owners_line = owners_line
        self.__owners_picture = owners_picture
        self.__password = password
        self.__company_name = company_name
        self.__company_line = company_line
        self.__company_picture = company_picture
        self.__created_date = created_date


    #
    # Properties
    #

    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, id):
        self.__id = id

    @property
    def owners_name(self):
        return self.__owners_name

    @owners_name.setter
    def owners_name(self, owners_name):
        self.__owners_name = owners_name

    @property
    def owners_line(self):
        return self.__owners_line

    @owners_line.setter
    def owners_line(self, owners_line):
        self.__owners_line = owners_line

    @property
    def owners_picture(self):
        return self.__owners_picture

    @owners_picture.setter
    def owners_picture(self, owners_picture):
        self.__owners_picture = owners_picture

    @property
    def password(self):
        return self.__password

    @password.setter
    def password(self, password):
        self.__password = password

    @property
    def company_name(self):
        return self.__company_name

    @company_name.setter
    def company_name(self, company_name):
        self.__company_name = company_name

    @property
    def company_line(self):
        return self.__company_line

    @company_line.setter
    def company_line(self, company_line):
        self.__company_line = company_line

    @property
    def company_picture(self):
        return self.__company_picture

    @company_picture.setter
    def company_picture(self, company_picture):
        self.__company_picture = company_picture

    @property
    def created_date(self):
        return self.__created_date

    @created_date.setter
    def created_date(self, created_date):
        self.__created_date = created_date



    #
    # Methods
    #

    def __str__ (self):
        return ""