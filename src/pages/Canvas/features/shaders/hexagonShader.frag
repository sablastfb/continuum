in vec2 vTextureCoord;
in vec2 vPosition;
out vec4 finalColor;

uniform vec2 iResolution;
uniform vec2 viewportPosition;
uniform float viewportZoom;
uniform sampler2D uTexture;
uniform vec2 shapeOffset;
uniform vec3 backgroundColor;

// Hexagonal grid constants
const float HEX_SIZE = 50.0;
const float HEX_HEIGHT = HEX_SIZE * 1.732050808; // sqrt(3)
const float HEX_WIDTH = HEX_SIZE * 1.5;

// Convert world position to hexagonal grid coordinates
vec2 worldToHex(vec2 worldPos) {
    float q = (worldPos.x * 2.0/3.0) / HEX_SIZE;
    float r = (-worldPos.x / 3.0 + worldPos.y * 1.732050808/3.0) / HEX_SIZE;
    return vec2(q, r);
}

// Round to nearest hexagon
vec3 hexRound(vec2 hex) {
    float q = hex.x;
    float r = hex.y;
    float s = -q - r;
    
    float rq = floor(q);
    float rr = floor(r);
    float rs = floor(s);
    
    float dq = abs(rq - q);
    float dr = abs(rr - r);
    float ds = abs(rs - s);
    
    if (dq > dr && dq > ds) {
        rq = -rr - rs;
    } else if (dr > ds) {
        rr = -rq - rs;
    }
    
    return vec3(rq, rr, rs);
}

// Convert hex coordinates back to world position (center of hex)
vec2 hexToWorld(vec3 hex) {
    float x = HEX_SIZE * (3.0/2.0 * hex.x);
    float y = HEX_SIZE * (1.732050808/2.0 * hex.x + 1.732050808 * hex.y);
    return vec2(x, y);
}

// Distance from point to hexagon edge
float hexDistance(vec2 p) {
    p = abs(p);
    float c = dot(p, normalize(vec2(1.0, 1.732050808)));
    c = max(c, p.x);
    return c;
}

void main(void) {
    // Get screen pixel coordinates and flip Y axis
    vec2 screenCoord = gl_FragCoord.xy;
    screenCoord.y = iResolution.y - screenCoord.y;
    
    // Convert to world coordinates
    vec2 worldCoord = viewportPosition + (screenCoord / viewportZoom) - shapeOffset;
    
    // Find the hexagon we're in
    vec2 hexCoord = worldToHex(worldCoord);
    vec3 hexRounded = hexRound(hexCoord);
    vec2 hexCenter = hexToWorld(hexRounded);
    
    // Distance from hex center
    vec2 localPos = worldCoord - hexCenter;
    float distToEdge = hexDistance(localPos);
    
    // Line width based on zoom
    float lineWidth = 1.0 / viewportZoom;
    float aaWidth = 0.5 / viewportZoom;
    
    // Hexagon outline
    float hexOutline = 1.0 - smoothstep(HEX_SIZE - lineWidth - aaWidth, 
                                        HEX_SIZE - lineWidth + aaWidth, 
                                        distToEdge);
    
    // Add subtle glow
    float glowWidth = lineWidth * 2.5;
    float glow = 1.0 - smoothstep(HEX_SIZE - lineWidth, 
                                   HEX_SIZE - lineWidth + glowWidth, 
                                   distToEdge);
    glow = glow * glow * 0.25;
    hexOutline = hexOutline + glow;
    
    // Calculate axes
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
    vec3 bgColor = backgroundColor;
    vec3 hexColor = vec3(0.18, 0.18, 0.19);
    vec3 xAxisColor = vec3(0.6, 0.25, 0.25);  // Red
    vec3 yAxisColor = vec3(0.25, 0.6, 0.25);  // Green
    
    // Combine everything
    vec3 color = bgColor;
    color = mix(color, hexColor, hexOutline * 0.7);
    color = mix(color, xAxisColor, xAxis * 0.8);
    color = mix(color, yAxisColor, yAxis * 0.8);
    
    // Subtle vignette
    vec2 uv = screenCoord / iResolution;
    vec2 center = uv - 0.5;
    float vignette = 1.0 - dot(center, center) * 0.15;
    color *= vignette;
    
    finalColor = vec4(color, 1.0);
}