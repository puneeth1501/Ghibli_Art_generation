package in.codex.ghbliapi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import in.codex.ghbliapi.client.StabilityAIClient;
import in.codex.ghbliapi.dto.TextToImageRequest;
import jakarta.websocket.Decoder.Text;

@Service
public class GhibliArtService {
    private final StabilityAIClient stabilityAIClient;
    private final String apikey;
    
    public GhibliArtService(StabilityAIClient stabilityAIClient,@Value("${api.key}") String apikey) {
        this.stabilityAIClient = stabilityAIClient;
        this.apikey = apikey;
    }

    public byte[] createGhibliArt(MultipartFile image,String prompt){
        String finalPrompt =prompt+", in the beautiful, detailed anime style of studio ghibli";
        String  engineId="stable-diffusion-v1-6";
        String stylePreset="anime";
        return stabilityAIClient.generateImageFromImage("Bearer "+apikey, engineId, image, finalPrompt, stylePreset);
    }

    public byte[] createGhibliArtFromText(String prompt,String style){
        String finalPrompt=prompt+", in the beautiful, detailed anime style of studio ghibli";
        String  engineId="stable-diffusion-v1-6";
        String stylePreset=style.equals("general")?"anime":style.replace("_","_");

        TextToImageRequest requestPayload = new TextToImageRequest(finalPrompt,stylePreset);

        return stabilityAIClient.generateImageFromText("Bearer "+apikey, engineId,  requestPayload);
    }
}
