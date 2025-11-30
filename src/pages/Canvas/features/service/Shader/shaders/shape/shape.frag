precision mediump float;

varying vec2 vUV;
uniform vec2 iResolution;
uniform vec3 backgroundColor;
uniform float patternId;

vec3 simpleGridPattern(vec2 worldCoord) {
    vec2 position = iResolution.xy * vUV.xy;

    float gridSize = 20.0;
    vec2 grid = mod(position, gridSize);

    float lineWidth = 1.0;
    float gridLine = step(grid.x, lineWidth) + step(grid.y, lineWidth);
    gridLine = clamp(gridLine, 0.0, 1.0);

    vec3 gridColor = vec3(0.0); 
    vec3 color = mix(backgroundColor, gridColor, gridLine);

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