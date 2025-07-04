package in.codex.ghbliapi.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import in.codex.ghbliapi.dto.TextGenerationRequestDTO;
import in.codex.ghbliapi.service.GhibliArtService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/generation")
@CrossOrigin(origins={"http://localhost:3000","http://192.168.1.213:3000"})
@RequiredArgsConstructor
public class GenerationController {
    private final GhibliArtService ghibliArtService;

    @PostMapping(value="/generate",produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateGhibliArtFromImage(@RequestParam("image") MultipartFile image,@RequestParam("prompt") String prompt){

        try{
            byte[]imageBytes=ghibliArtService.createGhibliArt(image, prompt);

            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);
    }
    catch(Exception e){
        e.printStackTrace();
        return ResponseEntity.internalServerError().build();

    }
    
}
    @PostMapping(value="/generate-from-text",produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateGhibliArtFromText(@RequestBody TextGenerationRequestDTO requestDTO){
        try{
            String prompt=requestDTO.getPrompt();
            String style=requestDTO.getStyle();
            byte[]imageBytes=ghibliArtService.createGhibliArtFromText(prompt, style);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(imageBytes);

    
    }
    catch(Exception e){
        e.printStackTrace();
        return ResponseEntity.internalServerError().build();
    }

}
    
}
