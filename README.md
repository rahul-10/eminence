# Eminence

## Clone this project
```
1. git clone git@github.com:rahul-10/eminence.git
2. Create .env file with help of .env.example (update variable accordingly)
3. npm install
```

## Run Project
Command to start project: npm start

## Test
Added few unit tests only because of time crunch.<br>
Command to run test: npm test


## Curls for Apis
```
1. Register endpoint:
    
    curl --location 'http://localhost:3000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "rahul-dubey010@gmail.com",
    "password": "abcd"
}'


2. Login endpoint: 

curl --location 'http://localhost:3000/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "rahul-dubey010@gmail.com",
    "password": "abcd"
}'


3. Get products:

curl --location 'http://localhost:3000/product?category=smartphones' \
--header 'Authorization: Bearer {{token}}'
```
