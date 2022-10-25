import requests

url1 = 'http://192.168.178.56:3000/new-client-salt'
data1 = {
  'email': 'test@gmail.com',
}

url2 = 'http://192.168.178.56:3000/sign-up'
data2 = {
  'email': 'test@gmail.com',
  'password': '123',
}

url3 = 'http://192.168.178.56:3000/get-client-salt'
data3 = {
  'email': 'test@gmail.com',
}

url4 = 'http://192.168.178.142:3000/sign-in'
data4 = {
  'email': 'Wer@gmail.com',
  'password': '123',
}

url5 = 'http://192.168.178.56:3000/get-inventory'
data5 = {
  'userID': 1,
  'password': '123',
  # 'groupID': 1,
}

url6 = 'http://192.168.178.56:3000/add-item'
data6 = {
  'userID': 2,
  'password': '123',
  'groupID': 1,
  'itemData': {
    'name': 'pears',
    'date': '1665080399656',
    'quantity': 3,
    'type': 'units',
  }
}

url7 = 'http://192.168.178.56:3000/create-group'
data7 = {
  'userID': 2,
  'password': '123',
}

url8 = 'http://192.168.178.56:3000/add-to-group'
data8 = {
  'userID': 2,
  'password': '123',
  'groupID': 1,
}

url9 = 'http://192.168.178.56:3000/get-groups'
data9 = {
  'userID': 2,
  'password': '123',
}

url10 = 'http://192.168.178.142:3000/update-user'
data10 = {
  'userID': 1,
  'password': '123',
  'toUpdate': {
    'FirstName': 'tycho',
    # 'LastName': 'test12332',
    # 'Email': 'test@gmail.com',
    # 'Password': '123',
  }
}

url11 = 'http://192.168.178.142:3000/search-ingredient-recipes'
data11 = {
  'ingredients': [
    'zout',
  ],
  'limit': 10,
}

url12 = 'http://192.168.178.142:3000/search-ingredient-recipes'
data12 = {
  'ingredients': [
    'zout',
  ],
  'limit': 10,
}

url13 = 'http://192.168.178.142:3000/search-ingredient-recipes'
data13 = {
  'ingredients': [
    'zout',
  ],
  'limit': 10,
}

x11 = requests.post(url11, json = data11)
print(x11.text)