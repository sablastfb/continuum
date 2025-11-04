precision mediump float;

in vec2 vTextureCoord;
in vec2 vPosition;

out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec4 uInputSize;
uniform vec4 uOutputFrame;

// Pattern parameters
uniform float uGridSize;           // Size of grid cells (default: 20.0)
uniform float uLineWidth;          // Thickness of grid lines (default: 0.05)
uniform vec3 uGridColor;           // Grid line color (default: vec3(0.3))
uniform vec3 uBackgroundColor;     // Background color (default: vec3(0.95))
uniform float uOpacity;            // Pattern opacity (default: 1.0)

void main(void) {
    // Get the base texture color
    vec4 texColor = texture(uTexture, vTextureCoord);
    
    // Use vTextureCoord (0-1 UV space) scaled to create grid
    vec2 coord = vTextureCoord * uGridSize;
    
    // Calculate distance to nearest grid line
    vec2 gridPos = mod(coord, 1.0);
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(1.0 - gridPos.x, 1.0 - gridPos.y));
    
    // Anti-aliased grid line
    float aaWidth = 0.01;
    float grid = 1.0 - smoothstep(uLineWidth - aaWidth, uLineWidth + aaWidth, distToGrid);
    
    // Optional: Add subtle glow
    float glowWidth = uLineWidth * 2.0;
    float glow = 1.0 - smoothstep(uLineWidth, glowWidth, distToGrid);
    grid = grid + glow * glow * 0.15;
    
    // Mix grid color with background
    vec3 patternColor = mix(uBackgroundColor, uGridColor, clamp(grid, 0.0, 1.0));
    
    // Blend pattern with texture
    vec3 color = mix(texColor.rgb, patternColor, uOpacity);
    
    finalColor = vec4(color, texColor.a);
}