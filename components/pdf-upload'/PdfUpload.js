import axios from 'axios';
import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import pdfToText from 'react-pdftotext';

const PdfUpload = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const extractText = (event) => {
        const fileToExtract = event.target.files[0];
        setFile(fileToExtract);
    };

    const formatText = (text) => {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const formattedData = lines.map(line => {
            try {
                // Remove spaces from keys and parse JSON
                const cleanedLine = line.replace(/\s+/g, ''); 
                return JSON.parse(cleanedLine);
            } catch (error) {
                console.error('Error parsing line:', line);
                return null;
            }
        }).filter(item => item !== null);
    
        return formattedData;
    };
    


const handleFileUpload = async () => {
    if (!file) return;

    try {
        const extractedText = await pdfToText(file);
        setText(extractedText);

        const formattedData = formatText(extractedText);

        if (Array.isArray(formattedData) && formattedData.length === 1 && Array.isArray(formattedData[0])) {
            const flatData = formattedData[0];
            // Send the formatted data to the server
            const response = await axios.post('http://localhost:5000/students', flatData);
            setSuccess('Text uploaded successfully!');
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while uploading the text.');
    }
};
    return (
        <div className="mt-4">
            <div className="mb-2">
                <input type="file" accept=".pdf" onChange={extractText} />
            </div>
            <div className="d-grid">
                <Button variant="primary" type="submit" onClick={handleFileUpload}>
                    Add multiple students
                </Button>
            </div>
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </div>
    );
};

export default PdfUpload;
