import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Layout from '../Templates/Layout';
import { selectContacts } from '../redux/slices/contactsSlice';


// Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const AllContactsPage = () => {
  const contacts = useSelector(selectContacts);

  console.log(contacts);

  const SimpleList = () => (
    
      <ul>
      {contacts.map(item => (
        <div className="fixed-bg-question">
        <li key={item._id}>
          <h3>Name: {item.name}</h3>
          <h3>Email: {item.email}</h3>
          <h3>Gender: {item.gender}</h3>
          <h3>Phone: {item.phone}</h3>
        </li>
        </div>

      ))}
    </ul>
  );

  return (
    <Layout>
        <div className="container">
          <a href="/">
            <Button variant="primary" size="lg" className="mt-5 pp-button">
              Back
            </Button>
          </a>
          
          {contacts ? (
          <div className="container fixed-bg-1 text-center">
              <h1 className="text-center display-4 pb-5">All Contacts</h1>
              <SimpleList/>
          </div>
        )
        : <h1 className='text-center'>Something went wrong</h1>}
        </div>
    </Layout>
  );
};

export default AllContactsPage;