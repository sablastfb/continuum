in vec2 vTextureCoord;
in vec2 vPosition;
out vec4 finalColor;

uniform vec2 resolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform sampler2D uTexture;

void main(void) {
    // Get screen pixel coordinates
    vec2 screenCoord = vTextureCoord * resolution;
    
    // Fix aspect ratio - normalize coordinates
    float aspect = resolution.x / resolution.y;
    vec2 normalizedCoord = screenCoord;
    normalizedCoord.x /= aspect;
    
    // Convert to world coordinates
    vec2 worldCoord = viewportPosition + (normalizedCoord / viewportZoom);
    
    // DEBUG: Draw circles at specific world positions
    float debugCircle = 0.0;
    
    // Circle at world origin (0, 0) - RED
    float distToOrigin = length(worldCoord - vec2(0.0, 0.0));
    if (distToOrigin < 50.0 / viewportZoom) {
        finalColor = vec4(1.0, 0.0, 0.0, 0.5);
        return;
    }
    
    // Circle at (100, 100) - BLUE
    float distTo100 = length(worldCoord - vec2(100.0, 100.0));
    if (distTo100 < 30.0 / viewportZoom) {
        finalColor = vec4(0.0, 0.0, 1.0, 0.5);
        return;
    }
    
    // Circle at (-100, -100) - GREEN
    float distToNeg100 = length(worldCoord - vec2(-100.0, -100.0));
    if (distToNeg100 < 30.0 / viewportZoom) {
        finalColor = vec4(0.0, 1.0, 0.0, 0.5);
        return;
    }
    
    // Dot pattern settings
    float dotSpacing = 50.0;
    float dotRadius = 3.0;
    float worldDotRadius = dotRadius / viewportZoom;
    
    // Find nearest dot center
    vec2 cellCenter = floor(worldCoord / dotSpacing) * dotSpacing + dotSpacing * 0.5;
    
    // Distance from current point to nearest dot center
    float distToDot = length(worldCoord - cellCenter);
    
    // Create smooth dot
    float dotMask = smoothstep(worldDotRadius + 1.0/viewportZoom, worldDotRadius, distToDot);
    
    // Colors
    vec3 backgroundColor = vec3(0.95, 0.95, 0.97);
    vec3 dotColor = vec3(0.7, 0.7, 0.75);
    
    vec3 color = mix(backgroundColor, dotColor, dotMask);
    
    finalColor = vec4(color, 1.0);
}