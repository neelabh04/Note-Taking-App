import { useState } from "react";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login',{
        email: email,
        password: password
      })
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login