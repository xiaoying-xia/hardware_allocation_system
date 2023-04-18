import requests
from bson.objectid import ObjectId

print("test availibility api")
response = requests.get('http://localhost:5000/availability')
assert(response.status_code==200)
projectId1=response.json()[0]["_id"]
projectId2=response.json()[1]["_id"]
response = requests.post('http://localhost:5000/availability',json=
    [{
      "_id":projectId1,
      "hwset":"hw1",
      "availability":"10"
      
    },
    {
      "_id":projectId2,
      "hwset":"hw2",
      "availability":"10"
      
    }])
assert(response.status_code==201)

print("check user api")
response = requests.post('http://localhost:5000/user/signup',json=
{
    "email":"123.gmail.com",\
    "password":"123456",\
    "firstName":"Tom",\
    "lastName":"Cat"\
})
assert(response.status_code==201 or response.status_code==400)

response = requests.post('http://localhost:5000/user/signin',json=
{
    "email":"123.gmail.com",\
    "password":"123456"
})
assert(response.status_code==200)
userToken=response.json()["token"]
userId=response.json()["result"]["_id"]

response = requests.post('http://localhost:5000/user/join',json=
{
    projectId1:projectId1
},headers={"authorization":"abc "+userToken})
assert(response.status_code==201)

response = requests.post('http://localhost:5000/user/leave',json=
{
    projectId1:projectId1
},headers={"authorization":"abc "+userToken})
assert(response.status_code==201)

print("check project api")
response = requests.get('http://localhost:5000/projects')
assert(response.status_code==200)

response = requests.post('http://localhost:5000/projects',json=
{
    "projectName": "project 3",
    "description": "project for test",
    "creator": "Tom Cat",
    "tags": [],
    "selectedFile": "",
  "hw1Count": 10,
  "hw2Count": 10,
},headers={"authorization":"abc "+userToken})
assert(response.status_code==201)
projectId3=response.json()["_id"]

response = requests.patch('http://localhost:5000/projects/'+projectId3,data=
{
    "projectName": "project 3",
    "description": "project for test",
    "creator": "Tom Cat",
    "tags": [],
    "selectedFile": "",
  "hw1Count": 10,
  "hw2Count": 10,
},headers={"authorization":"abc "+userToken})
assert(response.status_code==201)



