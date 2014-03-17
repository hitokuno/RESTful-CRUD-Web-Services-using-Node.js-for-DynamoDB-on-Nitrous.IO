RESTful CRUD Web Services using Node.js for DynamoDB on [Nitrous.IO](https://www.nitrous.io/)
=====================

Very simple CRUD RESTful Web Service for DynamoDB on Nitrous.IO.  
Create, Read all, Read an item, Update and Delete are implemented.

Installation
--------
Install modules.

    npm install restify  
    npm install aws-sdk

Put app.js and config.json on your Nitrous.IO box.   
Edit config.json with yours.

To launch  

    node app.js

Access by curl
--------
* Create by POST  
`curl -i -X POST -H "Content-Type: application/json" -d '{"datetime":"2013-03-13T23:27:32.256Z" , "by":"tokuno"}' http://your_host:8080/Group/JAWS-UG`
* Read all items by GET  
`curl -H "Content-Type: application/json" http://your_host:8080/Groups`
* Read an item by GET  
`curl -H "Content-Type: application/json" http://your_host:8080/Group/JAWS-UG`
* Update by PUT  
`curl -i -X PUT -H "Content-Type: application/json" -d '{"datetime":"2021-03-14T00:04:01.951Z" , "by":"Hoge hoge"}' http://your_host:8080/Group/JAWS-UG`
* Delete by DELETE  
`curl -i -X DELETE http://your_host:8080/Group/JAWS-UG`


Create or Delete by Pentaho
--------
To be written.

License
--------
[Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/)

Auther
--------
TOKUNO, Hirokazu, [Code for Aizu](http://aizu.io/)
