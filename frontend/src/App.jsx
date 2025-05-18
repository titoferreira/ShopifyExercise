import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmailList from './components/EmailList';
import TemplateEdit from './components/TemplateEdit';
import './App.css'

function App() {
  return (
    <div>
      <h1>My Email Dashboard</h1>
      <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', padding: '10px', borderRadius: '8px' }}>
        <Link to="/">
          <button>Emails</button>
        </Link>
        <Link to="/template-edit">
          <button>Template Edit</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<EmailList />} />
        <Route path="/template-edit" element={<TemplateEdit />} />
      </Routes>
    </div>

  );
}

export default App
