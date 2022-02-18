# ShareDocs

This is an web application used for sharing the same document with multiple users. 
Users can collaborate on a same document page simultaneously with a unique document id.  

## Description

ShareDocs is React application for front-end with Ruby on Rails as back-end server. The user is able to create and login to an account. Ruby on Rails is used to authenticate and authorize users. This application uses Quill.js to create text-editor that different users can access. MongoDB Document Database is used to store any edits that were made to the documen and socket.io is used for real-time collaboration between different browsers.

## Getting Started

### Dependencies

Used libraries :
- Rails 6.1.4.4
- Quill.js
- Socket.io library
- MongoDB
- Bootstrap 5

### Installing

Run git clone and follow guidelines below to start the app.


### Executing program

#### Start rails server

Under **server/authentication** directory :
```
rails s -p 8001
```
- This will start the rails server using port 8001

#### Start socket.io server

Under **server** directory :
```
npm run devStart
```
- This will start socket.io server for user interface

#### Start MongoDB

```
./mongod --dbpath ./data/db
```

#### Start react front-end application

Under **client** directory :

```
npm start
```

## Authors

Contributors names and contact info

Harris Kim  - [LinkedIn](https://www.linkedin.com/in/harris-kim/)

## Version History

To be updated.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
