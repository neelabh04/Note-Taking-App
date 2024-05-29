import React from 'react';
import Navbar from './Navbar';
import NoteList from './NoteList';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <NoteList />
      </div>
    </div>
  );
};

export default Dashboard;