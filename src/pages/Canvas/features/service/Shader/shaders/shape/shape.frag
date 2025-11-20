precision mediump float;

varying vec2 vUV;
uniform vec2 iResolution; 

void main() {
    // Convert UV coordinates to pixel position
    vec2 position = iResolution.xy * vUV.xy;
    
    // Create grid with 100 pixel cells
    float gridSize = 20.0;
    vec2 grid = mod(position, gridSize);
    
    // Create grid lines (2 pixels wide)
    float lineWidth = 1.0;
    float gridLine = step(grid.x, lineWidth) + step(grid.y, lineWidth);
    gridLine = clamp(gridLine, 0.0, 1.0);
    
    // Set colors: white background, black grid lines
    vec3 color = mix(vec3(0.0), vec3(0.2), gridLine);
    
    gl_FragColor = vec4(color, 1.0);
}