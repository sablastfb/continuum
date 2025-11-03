in vec2 vTextureCoord;
in vec2 vPosition;
out vec4 finalColor;

uniform vec2 iResolution;
uniform float viewportZoom;
uniform sampler2D uTexture;
uniform vec3 backgroundColor;
uniform vec2 shapeSize;

void main(void) {
    // Convert texture coords (0-1) to world pixel coordinates
    // This makes the grid size independent of shape size
    vec2 shapeCoord = vTextureCoord * shapeSize;
    
    // Grid settings - this is now in actual pixels
    float gridSize = 50.0;  // 50 pixels per grid cell, constant regardless of shape size
    float lineWidth = max(1.0, 1.5 / viewportZoom);  // Minimum 1px line width
    
    // Calculate position within grid cell
    vec2 gridPos = mod(shapeCoord, gridSize);
    
    // Distance to nearest grid line
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));
    
    // Anti-aliased grid lines
    float aaWidth = 0.5;
    float grid = 1.0 - smoothstep(lineWidth - aaWidth, lineWidth + aaWidth, distToGrid);
    
    // Add subtle glow
    float glowWidth = lineWidth * 2.0;
    float glow = 1.0 - smoothstep(lineWidth, glowWidth, distToGrid);
    glow = glow * glow * 0.25;
    grid = grid + glow;
    
    // Colors
    vec3 gridColor = vec3(0.18, 0.18, 0.19);
    
    // Combine
    vec3 color = backgroundColor;
    color = mix(color, gridColor, grid * 0.7);
    
    finalColor = vec4(color, 1.0);
}