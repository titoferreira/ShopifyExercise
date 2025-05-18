import React, { useState } from 'react';

const AddTemplateForm = ({ onSave, onCancel }) => {
    const [event, setEvent] = useState('');
    const [template, setTemplate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!event || !template) {
            alert('Please fill in all fields.');
            return;
        }

        const newTemplate = { event, template: template };

        try {
            await onSave(newTemplate); // Calls parent handler
            setEvent('');
            setTemplate('');
        } catch (err) {
            console.error('Failed to save template', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h3>Add New Template</h3>
            <div>
                <label>Event:</label>
                <input
                    type="text"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                />
            </div>
            <div>
                <label>HTML Content:</label>
                <textarea
                    rows="5"
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                />
            </div>
            <div style={{ marginTop: '0.5rem' }}>
                <button type="submit" disabled={event.length === 0 || template.length === 0}>Save</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>Cancel</button>
            </div>
        </form>
    );
};

export default AddTemplateForm;
