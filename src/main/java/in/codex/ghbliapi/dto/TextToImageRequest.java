package in.codex.ghbliapi.dto;

import java.util.List;

public class TextToImageRequest {
    private List<TextPrompt> text_prompts;
    private double cfg_scale=7;
    private int height=1024;
    private int width=1024;
    private int samples=1;
    private String style_preset;
    private int steps=30;

    public static class TextPrompt {
        private String text;
        public TextPrompt(String text) {
            this.text = text;
        }
        public String getText() {
            return text;
        }
        public void setText(String text) {
            this.text = text;
        }
    }
    public TextToImageRequest(String text ,String style)
    {
        this.text_prompts = List.of(new TextPrompt(text));
        this.style_preset = style;
    }
    public List<TextPrompt> getText_prompts() {
        return text_prompts;
    }
    public double getCfg_scale() {
        return cfg_scale;
    }
    public int getHeight() {
        return height;
    }
    public int getWidth() {
        return width;
    }
    public int getSamples() {
        return samples;
    }
    public String getStyle_preset() {
        return style_preset;
    }
    public int getSteps() {
        return steps;
    }


    
}
