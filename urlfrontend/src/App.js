import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddUrlComponent from './components/AddUrlComponent';
import ViewUrlComponent from './components/ViewUrlComponent';

function App() {
    return (
        <div className="App container mt-5">
            <header className="App-header">
                <h1>POCKET URL</h1>
            </header>
            <AddUrlComponent />
            <ViewUrlComponent />
            <footer className="App-footer">
                &copy; 2024 URL Shortener. All rights reserved.
            </footer>
        </div>
    );
}

export default App;
