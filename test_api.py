import requests

# url = 'http://192.168.178.142:3000/new-client-salt'
# data = {
#   'email': '12@gmail.com',
# }

url = 'http://192.168.178.142:3000/sign-up'
data = {
  'email': '12@gmail.com',
  'password': '3c4acabf456ecc2c06f74c52e2c52e1bbbb610a294d951822a5bcc444dd18b2a',
}

# url = 'http://192.168.178.142:3000/get-client-salt'
# data = {
#   'email': '12@gmail.com',
# }

# url = 'http://192.168.178.142:3000/sign-in'
# data = {
#   'email': '12@gmail.com',
#   'password': '3c4acabf456ecc2c06f74c52e2c52e1bbbb610a294d951822a5bcc444dd18b2a',
# }

x = requests.post(url, json = data)

print(x.text)
