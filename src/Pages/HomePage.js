import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Layout from '../Templates/Layout';
import { getContacts } from '../redux/slices/contactsSlice';

import { API_HOST } from '../consts';


const HomePage = () => {
  const initialState = { topName: '', botName: '', botGender: '', botEmail: '', botPhone: '', botMessage: '', };
  const [myData, setMyData] = useState(initialState);
  const [error, setError] = useState('');
  const [errorBot, setErrorBot] = useState('');

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('All output will be displayed here.');
  const [toggle, setToggle] = useState(0);

  function getErrorFindContact(myData) {
    if (myData.topName === "") {
      return "Cannot be empty";
    }
    return "";
  }
  
  function getErrorPostContact(myData) {
    if (myData.botName === "") {
      return "Name Field cannot be empty.";
    } 
    return "";
  }

  const ContactComponent = () => {
    return (
      <div className="container fixed-bg-3 text-center">
      <h1 className="text-center pb-4 pt-5">{message}</h1> {/*{contact["message"]} */}

      {(toggle === 1) ? (
      <div className="fixed-bg-question">
          <h3>Name: {name}</h3>
          <h3>Email: {email}</h3>
          <h3>Gender: {gender}</h3>
          <h3>Phone: {phone}</h3>
        </div>
      ) : <div/>}

      </div>

    );
  };

  const dispatch = useDispatch();
  const history = useHistory();

  // update fields
  const handleChange = ({ target: { value, name } }) => {
    setMyData({ ...myData, [name]: value });
  };

  function handleClickGetContacts() {
      dispatch(getContacts());
      history.push("/allcontacts");
  };

  function resetFields() {
    setName("");  
    setEmail("");  
    setPhone("");  
    setGender(""); 
    setMessage("") 
    setToggle(0);

  }

  function handleClickGetContact() {
    resetFields();
    const errorMsg = getErrorFindContact(myData);
    if (!errorMsg) {
      setError('');
      const apiUrl = `${API_HOST}/api/contacts/${myData.topName}`; 
      fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        })
          .then((response) => response.json())
          .then((result) => {
            setMessage(result.message);  
            if (result.data) {
              setToggle(1);
              setName(result.data.name);  
              setEmail(result.data.email);  
              setPhone(result.data.phone);  
              setGender(result.data.gender);  
            }
            
          })
          .catch((err) => console.log(err)
        );
      } else {
        setError(errorMsg);
      }
  };

  function handleClickDeleteContact() {
    resetFields();
    const errorMsg = getErrorFindContact(myData);
    if (!errorMsg) {
      setError('');
      const apiUrl = `${API_HOST}/api/contacts/${myData.topName}`; 
      fetch(apiUrl, {
        method: 'DELETE',
        })
          .then((response) => response.json())
          .then((result) => {
            setMessage(result.message);              
          })
          .catch((err) => {
            setMessage("Contact deleted successfully");
          }
        );
      } else {
        setError(errorMsg);
      }
  };

  function handleClickPostContact() {
    resetFields();
    const errorMsg = getErrorPostContact(myData);
    if (!errorMsg) {
      setErrorBot('');
      const apiUrl = `${API_HOST}/api/contacts`; 
      fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ "name":myData.botName, "email":myData.botEmail, "phone":myData.botPhone, "gender":myData.botGender }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.name === "MongoError") {
              setMessage("Failed to add contact: Duplicate Name");  
              return;
            }
            setMessage(result.message);  
            if (result.data) {
              setToggle(1);
              setName(result.data.name);  
              setEmail(result.data.email);  
              setPhone(result.data.phone);  
              setGender(result.data.gender);  
            }
            
          })
          .catch((err) => console.log(err)
        );
      } else {
        setErrorBot(errorMsg);
      }
  };

  function handleClickPutContact() {
    resetFields();
    const errorMsg = getErrorPostContact(myData);
    if (!errorMsg) {
      setErrorBot('');
      const apiUrl = `${API_HOST}/api/contacts/${myData.botName}`; 
      fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ "name":myData.botName, "email":myData.botEmail, "phone":myData.botPhone, "gender":myData.botGender }),
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            if (result.name === "MongoError") {
              setMessage("Failed to add contact: Duplicate Name");  
              return;
            }
            setMessage(result.message);  
            if (result.data.value) {
              setToggle(1);
              setName(result.data.value.name);  
              setEmail(result.data.value.email);  
              setPhone(result.data.value.phone);  
              setGender(result.data.value.gender);  
            }
            
          })
          .catch((err) => console.log(err)
        );
      } else {
        setErrorBot(errorMsg);
      }
  };

  return (
    <Layout>
      <div className="container fixed-bg-3 text-center">
        <h1 className="text-center display-4 pb-5 pt-5">RestHub</h1>
        <Button
          variant="primary"
          size="lg"
          className="pp-button-long mb-5"
          onClick={handleClickGetContacts}
        >View All Contacts
        </Button>

        <div className="break"/>

        <form>
          <input
            className="input-top"
            name="topName"
            type="text"
            onChange={handleChange}
            placeholder="Contact Name (to find/delete by name)"
            value={myData.topName}
          />
          <p className="error-message">{error}</p>
        </form>
        <Button
          variant="primary"
          size="lg"
          className="pp-button"
          onClick={handleClickGetContact}
        >Find Contact
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="pp-button ml-3"
          onClick={handleClickDeleteContact}
        >Delete Contact
        </Button>

        <div className="break"/>

        <form>
          <input
            className="input-top mt-5"
            name="botName"
            type="text"
            onChange={handleChange}
            placeholder="Name"
            value={myData.botName}
          />
          <br/>
          <input
            className="input-top"
            name="botGender"
            type="text"
            onChange={handleChange}
            placeholder="Gender"
            value={myData.botGender}
          />
          <br/>
          <input
            className="input-top"
            name="botEmail"
            type="text"
            onChange={handleChange}
            placeholder="Email"
            value={myData.botEmail}
          />
          <br/>
          <input
            className="input-top mb-5"
            name="botPhone"
            type="text"
            onChange={handleChange}
            placeholder="Phone"
            value={myData.botPhone}
          />
        </form>
        <Button
          variant="primary"
          size="lg"
          className="pp-button"
          onClick={handleClickPostContact}
        >Add Contact
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="pp-button ml-3"
          onClick={handleClickPutContact}
        >Update Contact
        </Button>
        <p className="error-message">{errorBot}</p>
        <br />
      </div>

      <ContactComponent/>
      <br /><br /><br />

    </Layout>
  )};

export default HomePage;
