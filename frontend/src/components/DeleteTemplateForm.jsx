import React, { useState } from 'react';

const DeleteTemplateForm = ({ onDelete, onCancel }) => {
    const [event, setEvent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!event) {
            alert('Please fill in all fields.');
            return;
        }

        const deleteTemplate = { event };

        try {
            await onDelete(deleteTemplate); // Calls parent handler
            setEvent('');
        } catch (err) {
            console.error('Failed to delete template', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h3>Delete Template</h3>
            <div>
                <label>Event:</label>
                <input
                    type="text"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                />
            </div>
            <div style={{ marginTop: '0.5rem' }}>
                <button type="submit" disabled={event.length === 0}>Delete</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancel</button>
            </div>
        </form>
    );
};

export default DeleteTemplateForm;
