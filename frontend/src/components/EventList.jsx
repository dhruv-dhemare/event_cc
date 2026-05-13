export default function EventList({ events, onDelete, onEdit }) {
  return (
    <div className="event-list">
      <h2>All Events ({events.length})</h2>
      
      {events.length === 0 ? (
        <p className="no-events">No events found. Create one to get started!</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Capacity:</strong> {event.capacity}</p>
              <p><strong>Description:</strong> {event.description}</p>
              
              <div className="event-actions">
                <button 
                  className="btn-edit"
                  onClick={() => onEdit(event)}
                >
                  Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => onDelete(event._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
