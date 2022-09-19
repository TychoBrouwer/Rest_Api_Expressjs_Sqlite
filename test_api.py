import requests

# url = 'http://192.168.178.142:3000/new-client-salt'
# data = {
#   'email': 'tychdadadaoffaf@nfrg.vrs',
# }
# $2b$10$S2lBs57VaKGeykpGTVLwuO

# url = 'http://192.168.178.142:3000/sign-up'
# data = {
#   'email': 'tychdadadaoffaf@nfrg.vrs',
#   'password': 'gferwfregfg',
# }

# url = 'http://192.168.178.142:3000/get-client-salt'
# data = {
#   'email': 'tychdadadaoffaf@nfrg.vrs',
# }
# $2b$10$m5R4T6qk7nU/slLHNxWgUO

url = 'http://192.168.178.142:3000/sign-in'
data = {
  'email': 'tychdadadaoffaf@nfrg.vrs',
  'password': 'gferwfregfg',
}

x = requests.post(url, json = data)

print(x.text)
