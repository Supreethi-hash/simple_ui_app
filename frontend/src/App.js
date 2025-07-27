import React, { useState, useEffect } from 'react';

const apiUrl = 'http://localhost:5000';

export default function App() {
  const [mode, setMode] = useState('login'); // login or register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  // For items
  const [items, setItems] = useState([]);
  const [newItemText, setNewItemText] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemText, setEditItemText] = useState('');

  // Fetch items after login
  useEffect(() => {
    if (loggedInUser) {
      fetchItems();
    }
  }, [loggedInUser]);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${apiUrl}/items`);
      const data = await res.json();
      setItems(data);
    } catch {
      setMessage('Failed to load items');
    }
  };

  const handleSubmit = async () => {
    setMessage('');
    if (!username || !password) {
      setMessage('Username and password are required');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Error');
        return;
      }

      setMessage(data.message);
      if (mode === 'login') {
        setLoggedInUser(username);
      }
    } catch {
      setMessage('Network error');
    }
  };

  const handleAddItem = async () => {
    if (!newItemText.trim()) {
      setMessage('Item text required');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newItemText }),
      });
      const newItem = await res.json();
      if (res.ok) {
        setItems([...items, newItem]);
        setNewItemText('');
        setMessage('');
      } else {
        setMessage(newItem.message || 'Failed to add item');
      }
    } catch {
      setMessage('Network error');
    }
  };

  const startEditItem = (item) => {
    setEditItemId(item.id);
    setEditItemText(item.text);
    setMessage('');
  };

  const handleEditItem = async () => {
    if (!editItemText.trim()) {
      setMessage('Item text required');
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/items/${editItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editItemText }),
      });
      const updatedItem = await res.json();
      if (res.ok) {
        setItems(items.map(i => (i.id === editItemId ? updatedItem : i)));
        setEditItemId(null);
        setEditItemText('');
        setMessage('');
      } else {
        setMessage(updatedItem.message || 'Failed to edit item');
      }
    } catch {
      setMessage('Network error');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/items/${id}`, { method: 'DELETE' });
      const deletedItem = await res.json();
      if (res.ok) {
        setItems(items.filter(i => i.id !== id));
        setMessage('');
      } else {
        setMessage(deletedItem.message || 'Failed to delete item');
      }
    } catch {
      setMessage('Network error');
    }
  };

  if (loggedInUser) {
    return (
      <div style={{ maxWidth: 500, margin: 'auto', fontFamily: 'Arial' }}>
        <h1>Welcome, {loggedInUser}!</h1>
        <button onClick={() => {
          setLoggedInUser(null);
          setUsername('');
          setPassword('');
          setMessage('');
          setItems([]);
          setNewItemText('');
          setEditItemId(null);
          setEditItemText('');
        }}>Logout</button>

        <h2>Your Items</h2>

        <div>
          <input
            placeholder="New item text"
            value={newItemText}
            onChange={e => setNewItemText(e.target.value)}
            style={{ width: '70%', marginRight: 8 }}
          />
          <button onClick={handleAddItem}>Add</button>
        </div>

        {items.length === 0 && <p>No items yet</p>}

        <ul style={{ paddingLeft: 0 }}>
          {items.map(item => (
            <li key={item.id} style={{ listStyle: 'none', marginTop: 8 }}>
              {editItemId === item.id ? (
                <>
                  <input
                    value={editItemText}
                    onChange={e => setEditItemText(e.target.value)}
                    style={{ marginRight: 8 }}
                  />
                  <button onClick={handleEditItem}>Save</button>
                  <button onClick={() => setEditItemId(null)} style={{ marginLeft: 4 }}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{item.text}</span>
                  <button onClick={() => startEditItem(item)} style={{ marginLeft: 8 }}>Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)} style={{ marginLeft: 4 }}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>

        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial' }}>
      <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ display: 'block', marginBottom: 8, width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: 8, width: '100%' }}
      />
      <button onClick={handleSubmit}>{mode === 'login' ? 'Login' : 'Register'}</button>
      {message && <p style={{ marginTop: 8 }}>{message}</p>}
      <p style={{ marginTop: 10 }}>
        {mode === 'login' ? 'No account?' : 'Have an account?'}{' '}
        <button
          style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setMessage('');
          }}
        >
          {mode === 'login' ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
}
