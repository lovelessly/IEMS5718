import webapp2
import json
from datetime import date
from google.appengine.ext import ndb

class User(ndb.Model):
  Gender=ndb.StringProperty()
  name=ndb.StringProperty()
  age=ndb.IntegerProperty()
  yoe=ndb.IntegerProperty()
  URL=ndb.StringProperty()
  ADMIN=ndb.StringProperty()

class LabUsage(ndb.Model):
  lab=ndb.StringProperty()
  date=ndb.DateProperty()

'''
class Account(ndb.Model):
  username = ndb.StringProperty()
  department = ndb.StringProperty()
  year = ndb.IntegerProperty()

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        mary = Account(key=ndb.Key('Account','mary@gmail.com'),
               username='Mary',
               department='IE',
               year=1)
        mary2 = Account(key=ndb.Key('Account','mary@gmail.com'),
               username='Mary2',
               department='IE',
               year=1)
        peter = Account(key=ndb.Key('Account','peter@gmail.com'),
               username='Peter',
               department='IE',
               year=2)
        john = Account(key=ndb.Key('Account','john@gmail.com'),
               username='John',
               department='IE',
               year=2)
        self.response.write(mary)
        self.response.write('\n')
        mary_key = mary.put()
        mary2.put()
        
        john_key = john.put()
        peter_key = peter.put()
        self.response.write(mary_key)
        self.response.write('\n')
        self.response.write(type(mary_key))
        self.response.write('\n')
        test_key=ndb.Key('Account','mary@gmail.com')
        #mary_key.delete()
        usage1 = LabUsage(lab='1007',date=date(2013,11,30),parent=mary_key) 
        usage2 = LabUsage(lab='1009',date=date(2013,12,3),parent=mary_key) 
        usage1.put();
        usage2.put();
        qry = Account.query(Account.department == 'IE') 
        accounts = qry.fetch()
        for account in accounts:
          	self.response.out.write(account) 
          	self.response.out.write('\n')
        qry = LabUsage.query(ancestor=mary_key) 
        usages = qry.fetch()
        for usage in usages:
          usage.key.delete()
          self.response.out.write(usage) 
          self.response.out.write('\n')
        qry = User.query(ancestor=ndb.Key(User,'1@1'))
        usages = qry.fetch()
        for usage in usages:
          self.response.out.write(usage) 
          self.response.out.write('\n')
'''
class PostHandleForm(webapp2.RequestHandler):
    def post(self):
      #self.response.write('d')
      saveForm(self)

class GetHandleForm(webapp2.RequestHandler):
    def get(self):
      emailadd=self.request.get('email')
      qry=User.query(ancestor=ndb.Key(User,emailadd))
      result=qry.fetch()
      if len(result):
        result=result[0]
        dic={}
        dic['bool']='True'
        dic['Gender']=result.Gender
        dic['URL']=result.URL
        dic['age']=result.age
        dic['name']=result.name
        dic['yoe']=result.yoe
        dic['ADMIN']=result.ADMIN
        jsonobj=json.dumps(dic)
        self.response.write(jsonobj)
      else:
        dic={}
        dic['bool']='False'
        jsonobj=json.dumps(dic)
        self.response.write(jsonobj)

def saveForm(self):
  try:
    age = int(self.request.get('Age'))
  except:
    pass
  name = self.request.get('Name')
  try:
    YOE = int(self.request.get('YOE'))
  except:
    pass
  URL = self.request.get('TTU')
  Gender=self.request.get('Gender')
  EMAIL=self.request.get('OperateEmail')
  ADMIN='False'
  qry=User.query(ancestor=ndb.Key(User,EMAIL))
  result=qry.fetch()
  if len(result):
    ADMIN=result[0].ADMIN
  temp=User(key=ndb.Key(User,EMAIL),
            Gender=Gender,
            name=name,
            age=age,
            yoe=YOE,
            URL=URL,
            ADMIN=ADMIN
            )
  temp.put()
  self.response.write(temp)
    
class Redirect(webapp2.RequestHandler):
  def get(self):
    self.redirect('/index.html')
    
APP = webapp2.WSGIApplication([
  #('/MainPage', MainPage),
  ('/postapi',PostHandleForm),
  ('/getapi',GetHandleForm),
  ('/.*',Redirect)
])