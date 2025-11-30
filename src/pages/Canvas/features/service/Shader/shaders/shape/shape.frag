precision mediump float;

varying vec2 vUV;
uniform vec2 iResolution; 
uniform vec3 backgroundColor; 

void main() {
    // Convert UV coordinates to pixel position
    vec2 position = iResolution.xy * vUV.xy;
    
    // Create grid with 100 pixel cells
    float gridSize = 20.0;
    vec2 grid = mod(position, gridSize);
    
    // Create grid lines (1 pixel wide)
    float lineWidth = 1.0;
    float gridLine = step(grid.x, lineWidth) + step(grid.y, lineWidth);
    gridLine = clamp(gridLine, 0.0, 1.0);
    
    // Set colors: white background, black grid lines
    vec3 gridColor = vec3(0.0); // black
    vec3 color = mix(backgroundColor, gridColor, gridLine);
    
    gl_FragColor = vec4(color.xyz, 1.0);
} 