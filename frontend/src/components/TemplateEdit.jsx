import React, { useEffect, useState } from 'react';
import EVENT_MAP from '../constants/EventMap';
import AddTemplateForm from './AddTemplateForm';
import DeleteTemplateForm from './DeleteTemplateForm';

function TemplateEdit() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editedTemplates, setEditedTemplates] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    console.info('fetching emails:');
    useEffect(() => {
        fetch('http://localhost:3000/api/template/list-templates')
            .then((res) => res.json())
            .then((data) => {
                setTemplates(data.templates);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching templates:', err);
                setLoading(false);
            });
    }, []);

    const handleChange = (eventCode, template) => {
        setEditedTemplates((prev) => ({ ...prev, [eventCode]: template }));
    };

    const handleSave = async () => {
        Object.entries(editedTemplates).forEach(async ([eventCode, newTemplate]) => {
            try {
                const res = await fetch('http://localhost:3000/api/template/update-template', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ event: eventCode, template: newTemplate }),
                });

                if (!res.ok) {
                    throw new Error('Failed to update template');
                }

                const data = await res.json();
                console.log('Template updated successfully:', data);
                return data;
            } catch (error) {
                console.error('Error updating template:', error);
                throw error;
            }
        });
    };

    const handleSaveNewTemplate = async (newTemplate) => {
        const response = await fetch('http://localhost:3000/api/template/insert-template', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: newTemplate.event, template: newTemplate.template })
        });

        if (!response.ok) {
            throw new Error('Failed to save');
        }

        setTemplates((prev) => [...prev, newTemplate]);
        setShowAddForm(false);
    };

    const handleDeleteTemplate = async (template) => {
        const response = await fetch('http://localhost:3000/api/template/delete-template', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: template.event })
        });

        if (!response.ok) {
            throw new Error('Failed to delete');
        }

        setTemplates((prev) => prev.filter((tpl) => tpl.event !== template.event));
        setShowDeleteForm(false);
    };

    if (loading) {
        return <p>Loading templates...</p>;
    }

    if (templates.length === 0) {
        return <p>No templates found.</p>;
    }

    return (
        <div>
            <h2>Templates</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Event</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Template</th>
                    </tr>
                </thead>
                <tbody>
                    {templates.map((template) => (
                        <tr key={template.event}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{EVENT_MAP[template.event] || template.event}</td>
                            <td>
                                <textarea
                                    rows={30}
                                    cols={100}
                                    value={editedTemplates[template.event] ?? template.template}
                                    onChange={(e) => handleChange(template.event, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', padding: '10px', borderRadius: '8px' }}>
                <button onClick={handleSave} disabled={Object.keys(editedTemplates).length === 0}>
                    Save All
                </button>
                <button onClick={() => setShowAddForm(true)}>Add Template</button>
                <button onClick={() => setShowDeleteForm(true)}>Delete Template</button>
            </div>
            {showAddForm && (
                <AddTemplateForm
                    onSave={handleSaveNewTemplate}
                    onCancel={() => setShowAddForm(false)}
                />
            )}
            {showDeleteForm && (
                <DeleteTemplateForm
                    onDelete={handleDeleteTemplate}
                    onCancel={() => setShowDeleteForm(false)}
                />
            )}
        </div>
    );
}

export default TemplateEdit;