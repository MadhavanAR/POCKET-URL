import React, { useState } from 'react';
import axios from 'axios';

const AddUrlComponent = () => {
    const [url, setUrl] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        if (!url) {
            alert("Please enter a URL.");
            return;
        }

        axios
            .post("http://localhost:3001/short", { origUrl: url })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });

        setUrl("");
    };

    return (
        <div className="add-url-component">
            <section className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="mb-4">URL Shortener</h1>
                <form className="w-100" onSubmit={onSubmit}>
                    <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="http://samplesite.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary btn-lg w-100">
                        Shorten URL
                    </button>
                </form>
            </section>
        </div>
    );
};

export default AddUrlComponent;
