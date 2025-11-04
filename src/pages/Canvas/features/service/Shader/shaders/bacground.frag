out vec4 finalColor;

uniform vec2 iResolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform vec3 backgroundColor;
uniform float showAxis;
uniform float patternId;

const float minZoomForGrid = 0.5;

// Convert screen coordinates to world coordinates
vec2 screenToWorld(vec2 screenCoord) {
    screenCoord.y = iResolution.y - screenCoord.y;
    return viewportPosition + (screenCoord / viewportZoom);
}

// Calculate axis lines contribution
vec3 calculateAxes(vec2 worldCoord, float fade) {

    float aaWidth = 0.5 / viewportZoom;
    float axisLineWidth = 1.5;

    // X-axis (red)
    float distToXAxis = abs(worldCoord.y);
    float xAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToXAxis);
    float axisGlowWidth = axisLineWidth * 2.5;
    float xAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToXAxis);
    xAxis = xAxis + xAxisGlow * xAxisGlow * 0.3;

    // Y-axis (green)
    float distToYAxis = abs(worldCoord.x);
    float yAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToYAxis);
    float yAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToYAxis);
    yAxis = yAxis + yAxisGlow * yAxisGlow * 0.3;

    xAxis *= fade;
    yAxis *= fade;

    vec3 xAxisColor = vec3(0.6, 0.25, 0.25);
    vec3 yAxisColor = vec3(0.25, 0.6, 0.25);

    // Return combined axis contribution
    vec3 axisContribution = vec3(0.0);
    axisContribution = mix(axisContribution, yAxisColor, yAxis * 0.8);
    axisContribution = mix(axisContribution, xAxisColor, xAxis * 0.8);

    return axisContribution;
}

// Simple grid pattern
vec3 simpleGridPattern(vec2 worldCoord) {
    float gridSize = 50.0;
    float lineWidth = 0.5 / viewportZoom;

    vec2 gridPos = mod(worldCoord, gridSize);
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));

    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(lineWidth - aaWidth, lineWidth + aaWidth, distToGrid);

    float glowWidth = lineWidth * 2.5;
    float glow = 1.0 - smoothstep(lineWidth, glowWidth, distToGrid);
    glow = glow * glow * 0.25;
    grid = grid + glow;

    float gridFade = smoothstep(minZoomForGrid * 0.2, minZoomForGrid, viewportZoom);
    gridFade = mix(0.1, 1.0, gridFade);
    grid *= gridFade;

    vec3 gridColor = vec3(0.18, 0.18, 0.19);
    vec3 color = backgroundColor;
    color = mix(color, gridColor, grid * 0.7);

    return color;
}

// Dot pattern
vec3 dotPattern(vec2 worldCoord) {
    float dotSpacing = 50.0;
    float dotRadius = 1.5;

    vec2 cellCenter = floor(worldCoord / dotSpacing) * dotSpacing + dotSpacing * 0.5;
    float distToDot = length(worldCoord - cellCenter);

    float worldDotRadius = dotRadius;
    float smoothEdge = 0.9;
    float dotMask = smoothstep(worldDotRadius + smoothEdge, worldDotRadius, distToDot);

    float dotFade = smoothstep(minZoomForGrid * 0.5, minZoomForGrid, viewportZoom);
    dotFade = mix(0.15, 1.0, dotFade);
    dotMask *= dotFade;

    vec3 dotColor = vec3(0.25);
    vec3 color = backgroundColor;
    color = mix(color, dotColor, dotMask * 0.7);

    return color;
}

// Helper for multi-level grid
float getGridLevel(vec2 worldCoord, float gridSize, float lineWidth, float fade) {
    vec2 gridPos = mod(worldCoord, gridSize);
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));

    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(lineWidth - aaWidth, lineWidth + aaWidth, distToGrid);

    float glowWidth = lineWidth * 3.0;
    float glow = 1.0 - smoothstep(lineWidth, glowWidth, distToGrid);
    glow = glow * glow * 0.2;

    return (grid + glow) * fade;
}

// Multi-scale grid pattern
vec3 gridScalePattern(vec2 worldCoord, vec2 screenCoord) {
    float baseGridSize = 5.0;

    float level1Size = baseGridSize;
    float level2Size = baseGridSize * 5.0;
    float level3Size = baseGridSize * 25.0;
    float level4Size = baseGridSize * 125.0;

    float level1Pixels = level1Size * viewportZoom;
    float level2Pixels = level2Size * viewportZoom;
    float level3Pixels = level3Size * viewportZoom;
    float level4Pixels = level4Size * viewportZoom;

    float fadeInStart = 8.0;
    float fadeInEnd = 25.0;
    float fadeOutStart = 160.0;
    float fadeOutEnd = 220.0;

    float fade1 = smoothstep(fadeInStart, fadeInEnd, level1Pixels) *
        (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level1Pixels));
    float fade2 = smoothstep(fadeInStart, fadeInEnd, level2Pixels) *
        (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level2Pixels));
    float fade3 = smoothstep(fadeInStart, fadeInEnd, level3Pixels) *
        (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level3Pixels));
    float fade4 = smoothstep(fadeInStart, fadeInEnd, level4Pixels) *
        (1.0 - smoothstep(fadeOutStart, fadeOutEnd, level4Pixels));

    float baseLineWidth = 0.7 / viewportZoom;
    float majorLineWidth = 0.9 / viewportZoom;

    float grid1 = getGridLevel(worldCoord, level1Size, baseLineWidth, fade1);
    float grid2 = getGridLevel(worldCoord, level2Size, majorLineWidth, fade2);
    float grid3 = getGridLevel(worldCoord, level3Size, majorLineWidth, fade3);
    float grid4 = getGridLevel(worldCoord, level4Size, majorLineWidth, fade4);

    vec3 grid1Color = vec3(0.14, 0.14, 0.15);
    vec3 grid2Color = vec3(0.17, 0.17, 0.18);
    vec3 grid3Color = vec3(0.15, 0.15, 0.16);
    vec3 grid4Color = vec3(0.18, 0.18, 0.19);

    vec3 color = backgroundColor;
    color = mix(color, grid1Color, grid1 * 0.6);
    color = mix(color, grid2Color, grid2 * 0.7);
    color = mix(color, grid3Color, grid3 * 0.5);
    color = mix(color, grid4Color, grid4 * 0.6);

    // Vignette
    vec2 uv = screenCoord / iResolution;
    vec2 center = uv - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.15;
    color *= vignette;

    return color;
}

void main(void) {
    vec2 screenCoord = gl_FragCoord.xy;
    vec2 worldCoord = screenToWorld(screenCoord);

    vec3 color;

    if(patternId < 0.5) {
        // Solid color
        color = backgroundColor;
    } else if(patternId < 1.5) {
        // Dot pattern
        color = dotPattern(worldCoord);
    } else if(patternId < 2.5) {
        // Simple grid
        color = simpleGridPattern(worldCoord);
    } else {
        // Multi-scale grid
        color = gridScalePattern(worldCoord, screenCoord);
    }

    if(showAxis < 0.5) {
        vec3 axes = calculateAxes(worldCoord, 1.0);
        color = color * (1.0 - clamp(length(axes), 0.0, 1.0)) + axes;
    }

    finalColor = vec4(color, 1.0);
}