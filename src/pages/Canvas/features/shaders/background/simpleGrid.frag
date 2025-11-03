out vec4 finalColor;

uniform vec2 iResolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform vec3 backgroundColor;
uniform float showAxis;
uniform float minZoomForGrid;

void main(void) {
    vec2 screenCoord = gl_FragCoord.xy;
    screenCoord.y = iResolution.y - screenCoord.y;
    vec2 worldCoord = viewportPosition + (screenCoord / viewportZoom);
    
    float gridSize = 50.0;
    float lineWidth = 0.5 / viewportZoom;
    
    // Calculate grid lines
    vec2 gridPos = mod(worldCoord, gridSize);
    
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));
    
    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(lineWidth - aaWidth, lineWidth + aaWidth, distToGrid);
    
    float glowWidth = lineWidth * 2.5;
    float glow = 1.0 - smoothstep(lineWidth, glowWidth, distToGrid);
    glow = glow * glow * 0.25;
    grid = grid + glow;
    
    // Fade out grid when zoomed out too far
  float gridFade = smoothstep(minZoomForGrid * 0.5, minZoomForGrid, viewportZoom);
    gridFade = mix(0.1, 1.0, gridFade);  // Never goes below 15% opacity
    grid *= gridFade;
    
    // Calculate axes - NOW SCALES WITH ZOOM (removed division by viewportZoom)
    float distToXAxis = abs(worldCoord.y);
    float distToYAxis = abs(worldCoord.x);
    
    float axisLineWidth = 1.5;  // Fixed world-space width (scales with zoom)
    float xAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToXAxis);
    float yAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToYAxis);
    
    float axisGlowWidth = axisLineWidth * 2.5;
    float xAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToXAxis);
    float yAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToYAxis);
    xAxis = xAxis + xAxisGlow * xAxisGlow * 0.3;
    yAxis = yAxis + yAxisGlow * yAxisGlow * 0.3;
    
    // Apply axis visibility flags
    xAxis *= showAxis*gridFade;
    yAxis *= showAxis*gridFade;
    
    vec3 gridColor = vec3(0.18, 0.18, 0.19);
    vec3 yAxisColor = vec3(0.25, 0.6, 0.25);  
    vec3 xAxisColor = vec3(0.6, 0.25, 0.25);  
    
    vec3 color = backgroundColor;
    color = mix(color, gridColor, grid * 0.7);
    color = mix(color, yAxisColor, yAxis * 0.8);
    color = mix(color, xAxisColor, xAxis * 0.8);
    
    finalColor = vec4(color, 1.0);
}