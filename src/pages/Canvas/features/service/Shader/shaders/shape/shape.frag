precision mediump float;

varying vec2 vUV;
uniform vec2 iResolution;
uniform vec3 backgroundColor;
uniform float patternId;
uniform float viewportZoom;
uniform float gridSize;
uniform float lineWidth ;
uniform float marginPosition;
const float minZoomForGrid = 0.5;

vec3 simpleLine(vec2 worldCoord) {
    float lineWidthScaled = lineWidth / viewportZoom;

    vec2 gridPos = mod(worldCoord, gridSize);
    float distToGrid = min(gridPos.y, gridSize - gridPos.y);

    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(lineWidthScaled - aaWidth, lineWidthScaled + aaWidth, distToGrid);

    float glowWidth = lineWidthScaled * 0.5;
    float glow = 1.0 - smoothstep(lineWidthScaled, glowWidth, distToGrid);
    glow = glow * glow * 0.2;
    grid = grid + glow;

    float gridFade = smoothstep(minZoomForGrid * 0.2, minZoomForGrid, viewportZoom);
    gridFade = mix(0.1, 1.0, gridFade);
    grid *= gridFade;

    vec3 gridColor = vec3(0.18, 0.18, 0.19);
    vec3 color = backgroundColor;
    color = mix(color, gridColor, grid * 0.7);

    return color;
}



vec3 simpleGridPattern(vec2 worldCoord) {
    float lineWidthScaled = lineWidth / viewportZoom;
    vec2 gridPos = mod(worldCoord, gridSize);
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));
    
    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(lineWidthScaled - aaWidth, lineWidthScaled + aaWidth, distToGrid);
    
    // Reduce glow intensity based on zoom level
    float glowZoomFactor = smoothstep(0.5, 2.0, viewportZoom); // Glow only visible when zoomed in
    float glowWidth = lineWidthScaled * 2.0;
    float glow = 1.0 - smoothstep(lineWidthScaled, glowWidth, distToGrid);
    glow = glow * glow * 0.25 * glowZoomFactor; // Apply zoom-based reduction
    
    grid = clamp(grid + glow, 0.0, 1.0);
    
    float gridFade = smoothstep(minZoomForGrid * 0.2, minZoomForGrid, viewportZoom);
    gridFade = mix(0.1, 1.0, gridFade);
    grid *= gridFade;
    
    vec3 gridColor = vec3(0.18, 0.18, 0.19);
    vec3 color = backgroundColor;
    
    if (grid > 0.001) {
        color = mix(color, gridColor, grid * 0.7);
    }
    
    return color;
}

vec3 addMargin(vec3 baseColor, vec2 screenCoord) {
    if (marginPosition <= 0.0) {
        return baseColor; // No margin
    }
    
    // Calculate margin position in screen space
    float marginX = 100.0;
    float distToMargin = abs(screenCoord.x - marginX);
    
    // Margin line styling (red like traditional notebook margins)
    vec3 marginColor = vec3(0.85, 0.2, 0.2); // Red color
    float marginLineWidth = 2.0; // Width in pixels
    
    // Anti-aliased margin line
    float aaWidth = 1.0;
    float marginLine = 1.0 - smoothstep(marginLineWidth - aaWidth, marginLineWidth + aaWidth, distToMargin);
    
    // Optional: add subtle glow to margin
    float glowWidth = marginLineWidth * 2.0;
    float glow = 1.0 - smoothstep(marginLineWidth, glowWidth, distToMargin);
    glow = glow * glow * 0.15;
    marginLine = marginLine + glow;
    
    // Blend margin with base color
    return mix(baseColor, marginColor, marginLine * 0.8);
}


void main() {
    vec2 position = iResolution.xy * vUV.xy;
    vec3 color;
    if(patternId < 0.5) {
        color = backgroundColor;
    } else if(patternId < 1.5) {
        color = simpleGridPattern(position);
    } else if(patternId < 2.5) {
        color = simpleLine(position);
    } else if (patternId<3.5){
        color = simpleLine(position);

        // color = addMargin(color, position);
    }


    gl_FragColor = vec4(color, 1.0);
}