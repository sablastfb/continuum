out vec4 finalColor;

uniform vec2 iResolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform sampler2D uTexture;

// Function to calculate grid contribution at a specific scale with glow
float getGridLevel(vec2 worldCoord, float gridSize, float lineWidth, float fade) {
    vec2 gridPos = mod(worldCoord, gridSize);
    
    // Distance to nearest grid line
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));
    
    // Anti-aliased line with subtle glow
    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(lineWidth - aaWidth, lineWidth + aaWidth, distToGrid);
    
    // Add subtle glow
    float glowWidth = lineWidth * 3.0;
    float glow = 1.0 - smoothstep(lineWidth, glowWidth, distToGrid);
    glow = glow * glow * 0.2; // Even softer glow
    
    return (grid + glow) * fade;
}

void main(void) {
    // Get screen pixel coordinates and flip Y axis
    vec2 screenCoord = gl_FragCoord.xy;
    screenCoord.y = iResolution.y - screenCoord.y;
    
    // Convert to world coordinates
    vec2 worldCoord = viewportPosition + (screenCoord / viewportZoom);
    
    // Base grid size
    float baseGridSize = 5.0;
    
    // Calculate which grid levels should be visible based on zoom
    float level1Size = baseGridSize;           // 5
    float level2Size = baseGridSize * 5.0;     // 25
    float level3Size = baseGridSize * 25.0;    // 125
    float level4Size = baseGridSize * 125.0;   // 625
    
    // Calculate grid size in screen pixels for each level
    float level1Pixels = level1Size * viewportZoom;
    float level2Pixels = level2Size * viewportZoom;
    float level3Pixels = level3Size * viewportZoom;
    float level4Pixels = level4Size * viewportZoom;
    
    // Improved fade in/out ranges for smoother transitions
    float fadeInStart = 8.0;
    float fadeInEnd = 25.0;
    float fadeOutStart = 160.0;
    float fadeOutEnd = 220.0;
    
    // Calculate fade factors for each level
    float fade1 = smoothstep(fadeInStart, fadeInEnd, level1Pixels) * 
                  (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level1Pixels));
    
    float fade2 = smoothstep(fadeInStart, fadeInEnd, level2Pixels) * 
                  (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level2Pixels));
    
    float fade3 = smoothstep(fadeInStart, fadeInEnd, level3Pixels) * 
                  (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level3Pixels));
    
    float fade4 = smoothstep(fadeInStart, fadeInEnd, level4Pixels) * 
                  (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level4Pixels));
    
    // Refined line widths
    float baseLineWidth = 0.7 / viewportZoom;
    float majorLineWidth = 0.9 / viewportZoom;
    float axisLineWidth = 1.2 / viewportZoom;
    
    // Get grid contributions for each level
    float grid1 = getGridLevel(worldCoord, level1Size, baseLineWidth, fade1);
    float grid2 = getGridLevel(worldCoord, level2Size, majorLineWidth, fade2);
    float grid3 = getGridLevel(worldCoord, level3Size, majorLineWidth, fade3);
    float grid4 = getGridLevel(worldCoord, level4Size, majorLineWidth, fade4);
    
    // Calculate axis lines (x=0 and y=0)
    float aaWidth = 0.3 / viewportZoom;
    
    // X-axis (y=0) - Red
    float distToXAxis = abs(worldCoord.y);
    float xAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToXAxis);
    float xAxisGlow = 1.0 - smoothstep(axisLineWidth, axisLineWidth * 3.0, distToXAxis);
    xAxisGlow = xAxisGlow * xAxisGlow * 0.3;
    xAxis = xAxis + xAxisGlow;
    
    // Y-axis (x=0) - Green
    float distToYAxis = abs(worldCoord.x);
    float yAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToYAxis);
    float yAxisGlow = 1.0 - smoothstep(axisLineWidth, axisLineWidth * 3.0, distToYAxis);
    yAxisGlow = yAxisGlow * yAxisGlow * 0.3;
    yAxis = yAxis + yAxisGlow;
    
    // Softer, more neutral background
    vec3 backgroundColor = vec3(0.11, 0.11, 0.12);
    
    // Much more subtle colors - barely noticeable, just enough to see the grid
    vec3 grid1Color = vec3(0.14, 0.14, 0.15);     // Very subtle lines
    vec3 grid2Color = vec3(0.17, 0.17, 0.18);     // Slightly more visible
    vec3 grid3Color = vec3(0.15, 0.15, 0.16);     // Barely there
    vec3 grid4Color = vec3(0.18, 0.18, 0.19);     // Subtle major grid
    
    // Axis colors
    vec3 xAxisColor = vec3(0.6, 0.25, 0.25);      // Subtle red
    vec3 yAxisColor = vec3(0.25, 0.6, 0.25);      // Subtle green
    
    // Combine all levels with very low opacity
    vec3 color = backgroundColor;
    color = mix(color, grid1Color, grid1 * 0.6);
    color = mix(color, grid2Color, grid2 * 0.7);
    color = mix(color, grid3Color, grid3 * 0.5);
    color = mix(color, grid4Color, grid4 * 0.6);
    
    // Add axis lines on top
    color = mix(color, xAxisColor, xAxis * 0.8);
    color = mix(color, yAxisColor, yAxis * 0.8);
    
    // Very subtle vignette
    vec2 uv = screenCoord / iResolution;
    vec2 center = uv - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.15;
    color *= vignette;
    
    finalColor = vec4(color, 1.0);
}