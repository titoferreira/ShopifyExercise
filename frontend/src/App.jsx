import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import EmailList from './components/EmailList';
import './App.css'

function App() {
  return (
    <div>
      <h1>My Email Dashboard</h1>
      <EmailList />
    </div>
  );
}

export default App
