import { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import './App.css';

const API_URL = 'http://localhost:5000/api';

export default function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Add or Update event
  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        await axios.put(`${API_URL}/events/${editingEvent._id}`, eventData);
      } else {
        await axios.post(`${API_URL}/events`, eventData);
      }
      fetchEvents();
      setEditingEvent(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  // Delete event
  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`${API_URL}/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  // Edit event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  return (
    <div className="container">
      <h1>Event Registration System</h1>
      
      <button 
        className="btn-primary"
        onClick={() => {
          setEditingEvent(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? 'Cancel' : 'Add New Event'}
      </button>

      {showForm && (
        <EventForm 
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={() => {
            setShowForm(false);
            setEditingEvent(null);
          }}
        />
      )}

      <EventList 
        events={events}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
      />
    </div>
  );
}
