in vec2 vTextureCoord;
in vec2 vPosition;
out vec4 finalColor;

uniform vec2 iResolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform sampler2D uTexture;
uniform vec3 backgroundColor;
uniform vec2 shapeOffset;  // NEW: Add this to offset for shapes

void main(void) {
    // Get screen pixel coordinates and flip Y axis
    vec2 screenCoord = gl_FragCoord.xy;
    screenCoord.y = iResolution.y - screenCoord.y;
    
    // Convert to world coordinates, accounting for shape offset
    vec2 worldCoord = viewportPosition + (screenCoord / viewportZoom) - shapeOffset;
    
    // Grid settings
    float gridSize = 50.0;
    float lineWidth = 1.0 / viewportZoom;
    
    // Calculate position within grid cell
    vec2 gridPos = mod(worldCoord, gridSize);
    
    // Distance to nearest grid line
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));
    
    // Anti-aliased grid lines
    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(lineWidth - aaWidth, lineWidth + aaWidth, distToGrid);
    
    // Add subtle glow
    float glowWidth = lineWidth * 2.5;
    float glow = 1.0 - smoothstep(lineWidth, glowWidth, distToGrid);
    glow = glow * glow * 0.25;
    grid = grid + glow;
    
    // Calculate axis lines
    float distToXAxis = abs(worldCoord.y);
    float distToYAxis = abs(worldCoord.x);
    
    float axisLineWidth = 1.5 / viewportZoom;
    float xAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToXAxis);
    float yAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToYAxis);
    
    // Add glow to axes
    float axisGlowWidth = axisLineWidth * 2.5;
    float xAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToXAxis);
    float yAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToYAxis);
    xAxis = xAxis + xAxisGlow * xAxisGlow * 0.3;
    yAxis = yAxis + yAxisGlow * yAxisGlow * 0.3;
    
    // Colors
    vec3 gridColor = vec3(0.18, 0.18, 0.19);
    vec3 xAxisColor = vec3(0.6, 0.25, 0.25);  // Red
    vec3 yAxisColor = vec3(0.25, 0.6, 0.25);  // Green
    
    // Combine everything
    vec3 color = backgroundColor;
    color = mix(color, gridColor, grid * 0.7);
    color = mix(color, xAxisColor, xAxis * 0.8);
    color = mix(color, yAxisColor, yAxis * 0.8);
    
    finalColor = vec4(color, 1.0);
}