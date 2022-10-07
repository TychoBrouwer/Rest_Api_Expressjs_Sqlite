import requests

url1 = 'http://131.155.232.150:3000/new-client-salt'
data1 = {
  'email': '1233f4322@gmail.com',
}

url2 = 'http://131.155.232.150:3000/sign-up'
data2 = {
  'email': '1233f4322@gmail.com',
  'password': 'test',
}

url3 = 'http://131.155.232.150:3000/get-client-salt'
data3 = {
  'email': '123343@gmail.com',
}

url4 = 'http://131.155.232.150:3000/sign-in'
data4 = {
  'email': '123343@gmail.com',
  'password': 'test',
}

url5 = 'http://131.155.232.150:3000/get-inventory'
data5 = {
  'userID': 1,
  'password': 'test',
  # 'groupID': 1,
}

url6 = 'http://131.155.232.150:3000/add-item'
data6 = {
  'userID': 2,
  'password': 'test',
  'groupID': 4,
  'itemData': {
    'name': 'pears',
    'date': '1665080399656',
    'quantity': 3,
    'type': 'units',
  }
}

url7 = 'http://131.155.232.150:3000/create-group'
data7 = {
  'userID': 2,
  'password': 'test',
}

url8 = 'http://131.155.232.150:3000/add-to-group'
data8 = {
  'userID': 1,
  'password': 'test',
  'groupID': 1,
}

url9 = 'http://131.155.232.150:3000/get-groups'
data9 = {
  'userID': 1,
  'password': 'test',
}

# x1 = requests.post(url1, json = data1)
# print(x1.text)

# x2 = requests.post(url2, json = data2)
# print(x2.text)

# x3 = requests.post(url3, json = data3)
# print(x3.text)

# x4 = requests.post(url4, json = data4)
# print(x4.text)

# x5 = requests.post(url5, json = data5)
# print(x5.text)

x6 = requests.post(url6, json = data6)
print(x6.text)

# x7 = requests.post(url7, json = data7)
# print(x7.text)

# x8 = requests.post(url8, json = data8)
# print(x8.text)

# x9 = requests.post(url9, json = data9)
# print(x9.text)
