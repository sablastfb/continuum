in vec2 vTextureCoord;
in vec2 vPosition;
out vec4 finalColor;

uniform vec2 iResolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform sampler2D uTexture;

void main(void) {
    // Get screen pixel coordinates and flip Y axis
    vec2 screenCoord = gl_FragCoord.xy;
    screenCoord.y = iResolution.y - screenCoord.y; // Flip Y to match PixiJS coordinates
    
    // Convert to world coordinates
    vec2 worldCoord = viewportPosition + (screenCoord / viewportZoom);
    
    // DEBUG: Draw circles at specific world positions
    // Circle at world origin (0, 0) - RED
    float distToOrigin = length(worldCoord - vec2(0.0, 0.0));
    if (distToOrigin < 50.0) {
        finalColor = vec4(1.0, 0.0, 0.0, 0.5);
        return;
    }
    
    // Circle at (100, 100) - BLUE
    float distTo100 = length(worldCoord - vec2(100.0, 100.0));
    if (distTo100 < 30.0) {
        finalColor = vec4(0.0, 0.0, 1.0, 0.5);
        return;
    }
    
    // Circle at (-100, -100) - GREEN
    float distToNeg100 = length(worldCoord - vec2(-100.0, -100.0));
    if (distToNeg100 < 30.0) {
        finalColor = vec4(0.0, 1.0, 0.0, 0.5);
        return;
    }
    
    // Dot pattern settings
    float dotSpacing = 50.0;  // Spacing in world units
    float dotRadius = 3.0;     // Radius in world units (fixed size)
    
    // Find nearest dot center
    vec2 cellCenter = floor(worldCoord / dotSpacing) * dotSpacing + dotSpacing * 0.5;
    
    // Distance from current point to nearest dot center
    float distToDot = length(worldCoord - cellCenter);
    
    // Create smooth dot (radius in world units, not affected by zoom)
    float worldDotRadius = dotRadius;
    float smoothEdge = 1.0; // Smooth edge width in world units
    float dotMask = smoothstep(worldDotRadius + smoothEdge, worldDotRadius, distToDot);
    
    // Colors
    vec3 backgroundColor = vec3(0.95, 0.95, 0.97);
    vec3 dotColor = vec3(0.7, 0.7, 0.75);
    
    vec3 color = mix(backgroundColor, dotColor, dotMask);
    
    finalColor = vec4(color, 1.0);
}