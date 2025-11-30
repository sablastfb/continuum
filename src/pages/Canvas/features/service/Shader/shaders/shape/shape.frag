precision mediump float;

varying vec2 vUV;
uniform vec2 iResolution;
uniform vec3 backgroundColor;
uniform float patternId;
uniform float viewportZoom;

const float minZoomForGrid = 0.5;

vec3 simpleGridPattern(vec2 worldCoord) {
    float gridSize = 20.0;
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

void main() {
    vec2 position = iResolution.xy * vUV.xy;
    vec3 color;
    if(patternId < 0.5) {
        color = backgroundColor;
    } else if(patternId < 1.5) {
        color = simpleGridPattern(position);
    } 

    gl_FragColor = vec4(color, 1.0);
}