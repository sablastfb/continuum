out vec4 finalColor;

uniform vec2 iResolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform sampler2D uTexture;
uniform vec3 backgroundColor;
uniform float showAxis;
uniform float minZoomForGrid;  // Dots fade out below this zoom level

void main(void) {
    // Get screen pixel coordinates and flip Y axis
    vec2 screenCoord = gl_FragCoord.xy;
    screenCoord.y = iResolution.y - screenCoord.y;
    
    // Convert to world coordinates
    vec2 worldCoord = viewportPosition + (screenCoord / viewportZoom);
    
    // Dot pattern settings
    float dotSpacing = 50.0;  // Spacing in world units
    float dotRadius = 1.5;     // Radius in world units (fixed size)
    
    // Find nearest dot center
    vec2 cellCenter = floor(worldCoord / dotSpacing) * dotSpacing + dotSpacing * 0.5;
    
    // Distance from current point to nearest dot center
    float distToDot = length(worldCoord - cellCenter);
    
    // Create smooth dot (radius in world units, not affected by zoom)
    float worldDotRadius = dotRadius;
    float smoothEdge = 0.9; // Smooth edge width in world units
    float dotMask = smoothstep(worldDotRadius + smoothEdge, worldDotRadius, distToDot);
    
    // Fade out dots when zoomed out, but keep minimum visibility
    float dotFade = smoothstep(minZoomForGrid * 0.5, minZoomForGrid, viewportZoom);
    dotFade = mix(0.15, 1.0, dotFade);  // Never goes below 15% opacity
    dotMask *= dotFade;
    
    // Calculate axes - scales with zoom
    float distToXAxis = abs(worldCoord.y);
    float distToYAxis = abs(worldCoord.x);
    
    float aaWidth = 0.5 / viewportZoom;
    float axisLineWidth = 1.5;  // Fixed world-space width
    
    float xAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToXAxis);
    float yAxis = 1.0 - smoothstep(axisLineWidth - aaWidth, axisLineWidth + aaWidth, distToYAxis);
    
    float axisGlowWidth = axisLineWidth * 2.5;
    float xAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToXAxis);
    float yAxisGlow = 1.0 - smoothstep(axisLineWidth, axisGlowWidth, distToYAxis);
    xAxis = xAxis + xAxisGlow * xAxisGlow * 0.3;
    yAxis = yAxis + yAxisGlow * yAxisGlow * 0.3;
    
    // Apply axis visibility flags
    xAxis *= showAxis*dotFade;
    yAxis *= showAxis*dotFade;
    
    // Colors
    vec3 dotColor = vec3(0.25);
    vec3 yAxisColor = vec3(0.25, 0.6, 0.25);  
    vec3 xAxisColor = vec3(0.6, 0.25, 0.25);
    
    vec3 color = backgroundColor;
    color = mix(color, dotColor, dotMask * 0.7);
    color = mix(color, yAxisColor, yAxis * 0.8);
    color = mix(color, xAxisColor, xAxis * 0.8);
    
    finalColor = vec4(color, 1.0);
}