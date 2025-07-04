import React, { useState } from 'react';

const API_BASE_URL = 'http://localhost:8080/api/v1/generation';

function App() {
  const [textPrompt, setTextPrompt] = useState('');
  const [style, setStyle] = useState('anime');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate image from text
  const generateFromText = async () => {
    if (!textPrompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/generate-from-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: textPrompt,
          style: style
        })
      });

      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setGeneratedImage(imageUrl);
      } else {
        setError('Failed to generate image from text');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate image from uploaded image
  const generateFromImage = async () => {
    if (!selectedFile || !imagePrompt.trim()) {
      setError('Please select an image and enter a prompt');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('prompt', imagePrompt);

      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setGeneratedImage(imageUrl);
      } else {
        setError('Failed to generate image from uploaded image');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Make sure The Image is in size of height and weight less than 1024px </h1>
      <h1>🎨 Ghibli Art Generator</h1>
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      {/* Text to Image Section */}
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Generate from Text</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Enter your prompt (e.g., 'a magical forest')"
            value={textPrompt}
            onChange={(e) => setTextPrompt(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            <option value="anime">Anime</option>
            <option value="general">General</option>
            <option value="3d_model">3D Model</option>
            <option value="analog_film">Analog Film</option>
            <option value="cinematic">Cinematic</option>
            <option value="comic_book">Comic Book</option>
            <option value="digital_art">Digital Art</option>
            <option value="enhance">Enhance</option>
            <option value="fantasy_art">Fantasy Art</option>
            <option value="isometric">Isometric</option>
            <option value="line_art">Line Art</option>
            <option value="low_poly">Low Poly</option>
            <option value="modeling_compound">Modeling Compound</option>
            <option value="neon_punk">Neon Punk</option>
            <option value="origami">Origami</option>
            <option value="photographic">Photographic</option>
            <option value="pixel_art">Pixel Art</option>
            <option value="tile_texture">Tile Texture</option>
          </select>
        </div>
        <button
          onClick={generateFromText}
          disabled={loading}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Generating...' : 'Generate from Text'}
        </button>
      </div>

      {/* Image to Image Section */}
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Generate from Image</h2>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '100%'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Enter modification prompt (e.g., 'make it more colorful')"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        <button
          onClick={generateFromImage}
          disabled={loading}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Generating...' : 'Generate from Image'}
        </button>
      </div>

      {/* Generated Image Display */}
      {generatedImage && (
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h2>Generated Ghibli Art</h2>
          <img 
            src={generatedImage} 
            alt="Generated Ghibli Art" 
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <a
              href={generatedImage}
              download="ghibli-art.png"
              style={{
                backgroundColor: '#FF9800',
                color: 'white',
                padding: '10px 20px',
                textDecoration: 'none',
                borderRadius: '4px',
                display: 'inline-block'
              }}
            >
              Download Image
            </a>
          </div>
        </div>
      )}

      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          fontSize: '18px',
          color: '#666'
        }}>
          🎨 Creating your Ghibli masterpiece...
        </div>
      )}
    </div>
  );
}

export default App;