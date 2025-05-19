import React, { useEffect, useState } from 'react';
import EVENT_MAP from '../constants/EventMap';

function EmailList() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    console.info('fetching emails:');
    useEffect(() => {
        fetch('http://localhost:3000/api/email/list-emails')
            .then((res) => res.json())
            .then((data) => {
                setEmails(data.emails);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching emails:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading emails...</p>;
    }

    if (emails.length === 0) {
        return <p>No emails found.</p>;
    }

    return (
        <div>
            <h2>Emails Sent</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Recipient</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Event</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {emails.map((email) => (
                        <tr key={email.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{email.recipient}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{EVENT_MAP[email.event] || email.event}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{(new Date(email.sent_at)).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmailList;
