import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NoteForm from './components/NoteForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new-note" element={<NoteForm />} />
      <Route path="/edit-note/:id" element={<NoteForm />} />
    </Routes>
  );
}

export default App;