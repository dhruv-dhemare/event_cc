import { useState, useEffect } from 'react';

export default function EventForm({ event, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: ''
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      capacity: ''
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{event ? 'Edit Event' : 'Add New Event'}</h2>
      
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>
      
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      
      <input
        type="text"
        name="location"
        placeholder="Event Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
        required
      />
      
      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {event ? 'Update Event' : 'Create Event'}
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
