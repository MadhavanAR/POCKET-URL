import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewUrlComponent = () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        const fetchUrlAndSetUrl = async () => {
            try {
                const result = await axios.get('http://localhost:3001/all');
                setUrls(result.data);
            } catch (err) {
                console.error('Error fetching URLs:', err);
            }
        };
        fetchUrlAndSetUrl();
    }, []); // Only fetch once when the component mounts

    return (
        <div className="view-url-component mt-5">
            <h2 className="mb-4">Shortened URLs</h2>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Original Url</th>
                        <th>Short Url</th>
                        <th>Click Count</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url, idx) => (
                        <tr key={idx}>
                            <td>{url.origUrl}</td>
                            <td>
                                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                                    {url.shortUrl}
                                </a>
                            </td>
                            <td>{url.clicks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUrlComponent;
