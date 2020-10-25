# resthubfront

## How to run

1. Run resthub api locally as stated in https://github.com/Permas-Teo/resthub

2. To install application: npm install

3. To run application locally: npm start

4. Access application through brower url: http://localhost:3000/

## API Interaction (B4)

Name serves as the primary key, all contact objects will be identified by name, represented with {contact_name} through the api. 

All relevant outputs (messages/data) will be displayed below in the bottom box

GET all contact: http://localhost:8080/api/contacts
Frontend: “View All Contacts” -> Displays all contacts on another page. Click back to return to main page.

GET single contact: http://localhost:8080/api/contacts/{contact_name}
Frontend: “Find Contact” -> Display contact below if item found, else fails. Specify contact_name in input box given (Contact Name) immediately above the button.

DELETE contact: http://localhost:8080/api/contacts/{contact_name}
Frontend: “Delete Contact” -> Delete contact if item found, else fails Specify contact_name in input box given (Contact Name) immediately above the button.

POST contact: http://localhost:8080/api/contacts
Frontend: “Add Contact” -> add contact, fails if duplicate name given. Specify contact_name in input box given (Name) above the button. Optionally, specify gender, email and phone in the respective input boxes.

PUT contact: http://localhost:8080/api/contacts/{contact_name}
Frontend: “Update Contact” -> Update contact if item found, else add contact. Specify contact_name in input box given (Name) above the button. Optionally, specify gender, email and phone in the respective input boxes.

New contact created if {contact_name} does not exist, otherwise update fields of contact with name = {contact_name}. Note: name field cannot be updated through PUT
