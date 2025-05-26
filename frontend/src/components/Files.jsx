import React, { useState } from 'react';

const ImageUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFile = e => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length === 0) return;

    const fileArray = Array.from(selectedFiles);

    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result;
        // Use functional update to append to the files array
        setFiles(prevFiles => [...prevFiles, base64Image]);
      };
      reader.onerror = error => {
        console.error('Error reading file:', error);
      };
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>Upload Images</h2>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFile}
        style={{
          display: 'block',
          margin: '10px auto 20px',
          padding: '10px',
          borderRadius: '5px',
          border: '2px solid #3f51b5',
          cursor: 'pointer',
        }}
      />

      {files.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {files.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`uploaded preview ${index}`}
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 0 6px rgba(63,81,181,0.3)' }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

