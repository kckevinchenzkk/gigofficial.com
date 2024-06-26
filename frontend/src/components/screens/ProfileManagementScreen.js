import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from 'react-bootstrap';

function ProfileManagementScreen() {
  const [username, setUsername] = useState('');
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [birth_date, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [membership, setMembership] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!userInfo) {
        console.log('User is not logged in');
        return;
      }
  
      try {
        const config = {
          headers: {
            'Authorization': `JWT ${userInfo.accessToken}`, 
          },
        };
        const { data } = await axios.get('/store/customers/', config);
        setPhone(data.phone);
        setBirthday(data.birth_date);
        setMembership(data.membership);
      } catch (error) {
        console.error('Failed to fetch customer details:', error);
      }
    };
  
    fetchCustomerDetails();
  }, [userInfo]);
  
  useEffect(() => {
    // Fetch user info and populate the states
    const fetchUserInfo = async () => {
      try {
        const { data } = await axios.get('http://127.0.0.1:8000/auth/users/me/', {
          headers: {
            // Your auth token needs to be included here for authenticated requests
            // Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Authorization': `JWT ${userInfo.accessToken}`, 
          },
        });
        setEmail(data.email);
        setFirstname(data.first_name);
        setLastname(data.last_name);
        setUsername(data.username);
        // Set other fields similarly, based on the data structure you receive
        // You may need to adjust this depending on how your backend sends the user's info
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Implement the update logic. This might involve sending a PUT or PATCH request to your backend.
      // Make sure to include the Authorization header if this endpoint is protected
      await axios.put('http://127.0.0.1:8000/path/to/update/profile', {
        username,
        birth_date,
        email,
        password, // Be cautious with updating passwords. Ensure your backend handles it securely.
        address,
      }, {
        headers: {
           'Authorization': `JWT ${userInfo.accessToken}`, 
        },
      });

      history.push('/profile');
      // Optionally, show a success message to the user
    } catch (error) {
      // Handle errors, e.g., show error message
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div className="customer-profile">
      <h2>Customer Profile</h2>
      <ListGroup>
        <ListGroup.Item><strong>Username:</strong> {username}</ListGroup.Item>
        <ListGroup.Item><strong>Password:</strong> {password}</ListGroup.Item>
        <ListGroup.Item><strong>First Name:</strong> {first_name}</ListGroup.Item>
        <ListGroup.Item><strong>Last Name:</strong> {last_name}</ListGroup.Item>
        <ListGroup.Item><strong>Phone Number:</strong> {phone}</ListGroup.Item>
        <ListGroup.Item><strong>Email:</strong> {email}</ListGroup.Item>
        <ListGroup.Item><strong>Address:</strong> {address}</ListGroup.Item>
        <ListGroup.Item><strong>Birthday:</strong> {birth_date}</ListGroup.Item>
        <ListGroup.Item><strong>Membership:</strong> {membership}</ListGroup.Item>
      </ListGroup>
    </div>
      <h2>Profile Management</h2>
      <form onSubmit={handleSubmit}>
        {/* Example of a text input for the username */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* Add other form fields for birthday, email, etc., similar to the username field */}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileManagementScreen;
