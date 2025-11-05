in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uFillColor;

void main(void) {
    // Get the original texture alpha (shape mask)
    vec4 texColor = texture(uTexture, vTextureCoord);
    
    // Use the alpha channel to determine if we're inside the shape
    // Fill with color only where the shape exists
    finalColor = vec4(texColor.a,0.0,0.0, texColor.a);
}