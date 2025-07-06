# Ghibli Art Generator API

A Spring Boot REST API with React frontend that transforms images and text into Studio Ghibli-style artwork using Stability AI.

## 🚀 Getting Started

### Prerequisites
- Java 11 or higher
- Maven
- Stability AI API key

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

## 🔧 Backend Setup (Spring Boot)

### 1. Configure API Key
Open the `run.sh` file and replace the API key with your Stability AI API key:

```bash
#!/bin/bash

# === Set your API key as an environment variable ===
export API_KEY="your-stability-ai-api-key-here"

# === Start Spring Boot with Maven ===
mvn spring-boot:run
```

### 2. Application Properties
The `application.properties` file is already configured:

```properties
spring.application.name=ghbliapi
stability.api.baseurl=https://api.stability.ai
api.key=${API_KEY}
#feign client configuration to handle multipart form data request for uploading image to stability api
feign.encoder.encoder-class=org.springframework.openfeign.support.SpringEncoder
```

### 3. Run the Backend
Make the script executable and run:

```bash
chmod +x run.sh
./run.sh
```

Or run directly with Maven:
```bash
export API_KEY="your-stability-ai-api-key-here"
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

## 🎨 Frontend Setup (React)

### 1. Navigate to the React Project Directory
```bash
cd web/webinterface
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## 🔄 Running Both Backend and Frontend

### Using Split Terminal (Recommended)

**Terminal 1 (Backend):**
```bash
# From project root
export API_KEY="your-stability-ai-api-key-here"
mvn spring-boot:run
```

**Terminal 2 (Frontend):**
```bash
# From project root
cd web/webinterface
npm install
npm start
```

### Using the Run Script
You can also use the provided `run.sh` script for the backend:

**Terminal 1 (Backend):**
```bash
chmod +x run.sh
./run.sh
```

**Terminal 2 (Frontend):**
```bash
cd web/webinterface
npm start
```

## 🌐 API Endpoints

### Generate Ghibli Art from Image
```http
POST /api/v1/generation/generate
Content-Type: multipart/form-data

Parameters:
- image: MultipartFile (the source image)
- prompt: String (description of desired transformation)

Response: PNG image bytes
```

### Generate Ghibli Art from Text
```http
POST /api/v1/generation/generate-from-text
Content-Type: application/json

Body:
{
  "prompt": "A peaceful forest scene",
  "style": "anime"
}

Response: PNG image bytes
```

## 🎨 Features

### Image-to-Image Generation
- Upload an image and provide a text prompt
- The API transforms your image into Studio Ghibli anime style
- Automatically appends ", in the beautiful, detailed anime style of studio ghibli" to your prompt

### Text-to-Image Generation
- Generate artwork from text descriptions only
- Multiple style options available
- Customizable parameters (resolution, steps, etc.)

### Style Options
- `anime` - General anime style
- `general` - Default anime style


## 🔧 Development

### Backend Development
- Built with Spring Boot
- Uses Feign Client for Stability AI integration
- Supports multipart form data for image uploads
- CORS enabled for frontend integration

### Frontend Development
- React application in `web/webinterface` directory
- Pre-configured to work with backend on port 8080
- Development server runs on port 3000

### Code Structure

**Service Layer:**
```java
@Service
public class GhibliArtService {
    // Handles image and text-to-image generation
    // Integrates with Stability AI API
}
```

**Controller Layer:**
```java
@RestController
@RequestMapping("/api/v1/generation")
@CrossOrigin(origins={"http://localhost:3000","http://192.168.1.213:3000"})
public class GenerationController {
    // REST endpoints for generation requests
}
```

**DTOs:**
- `TextToImageRequest` - Request payload for text-to-image generation
- `TextGenerationRequestDTO` - Frontend request structure

## 🔑 API Key Setup

### Getting Your Stability AI API Key
1. Visit [Stability AI Platform](https://platform.stability.ai/)
2. Sign up for an account
3. Navigate to your API keys section
4. Create a new API key
5. Copy the key and replace it in the `run.sh` file

### Security Note
- Never commit your API key to version control
- The current setup uses environment variables for security
- Keep your API key secure and don't share it publicly


## 🛠️ Troubleshooting

### Common Issues

**Backend won't start:**
- Check if Java is installed: `java -version`
- Ensure port 8080 is available
- Verify your Stability AI API key is correctly set

**Frontend won't start:**
- Make sure Node.js is installed: `node -v`
- Check if port 3000 is available
- Try deleting `node_modules` and running `npm install` again

**API calls failing:**
- Verify your Stability AI API key is valid and has credits
- Check if both backend and frontend are running
- Ensure CORS is properly configured

**Image generation errors:**
- Check API key validity and account credits
- Verify image file format is supported
- Ensure prompt text is not empty

### Development Tips
- Use browser developer tools to debug frontend issues
- Check Spring Boot console logs for backend errors
- Monitor API usage in your Stability AI dashboard
- Test API endpoints directly using tools like Postman

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both backend and frontend
5. Submit a pull request

## 🎯 Usage Examples

### Example 1: Transform a Photo
1. Start both backend and frontend
2. Upload a photo of a landscape
3. Add prompt: "magical forest with floating spirits"
4. Generate your Studio Ghibli-style artwork

### Example 2: Create from Text
1. Use the text-to-image endpoint
2. Prompt: "A small cottage by a crystal lake"
3. Style: "anime"
4. Generate original Ghibli-inspired art

The API automatically enhances your prompts with Studio Ghibli styling cues for authentic results!