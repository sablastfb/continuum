in vec2 vTextureCoord;
in vec2 vPosition;
out vec4 finalColor;
uniform vec2 resolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform sampler2D uTexture;

void main(void) {
    // Get screen pixel coordinates
    vec2 pixelCoord = vTextureCoord * resolution;
    
    // FIX 1: Make grid square by using aspect ratio
    float aspect = resolution.x / resolution.y;
    vec2 correctedCoord = pixelCoord;
    if (aspect > 1.0) {
        correctedCoord.x /= aspect;
    } else {
        correctedCoord.y *= aspect;
    }
    
    // FIX 2: Apply viewport transformations
    // Scale by zoom first, then translate
    correctedCoord = correctedCoord / viewportZoom + viewportPosition / viewportZoom;
    
    // Grid settings
    float gridSize = 50.0; // Base grid size (at zoom = 1)
    float lineWidth = 2.0; // Base line width
    
    // Scale line width with zoom to keep consistent visual size
    float scaledLineWidth = lineWidth / viewportZoom;
    
    // Calculate grid lines
    vec2 gridPos = mod(correctedCoord, gridSize);
    
    // Check if we're on a grid line
    float gridLine = 0.0;
    if (gridPos.x < scaledLineWidth || gridPos.y < scaledLineWidth) {
        gridLine = 1.0;
    }
    
    // Colors
    vec3 backgroundColor = vec3(0.1, 0.1, 0.15);
    vec3 gridColor = vec3(0.3, 0.3, 0.4);
    
    vec3 color = mix(backgroundColor, gridColor, gridLine);
    
    finalColor = vec4(color, 1.0);
}