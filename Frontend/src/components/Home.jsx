import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to NotesApp</h1>
      <div className="mt-4">
        <button className="btn btn-primary me-3" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
