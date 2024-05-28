import { useState } from "react";
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formData = {
    email: email,
    password: password
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signup',formData)
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="text"
            value={email}
            placeholder="Enter the email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="text"
            value={password}
            placeholder="Enter the password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
