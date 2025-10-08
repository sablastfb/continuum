uniform vec2 resolution;
uniform vec2 cursor;
varying vec2 vPosition;

void main(void) {
    // Grid properties (adjust these as needed)
    float gridSize = 0.2;          // Size of each square
    float gridLineWidth = 0.01;    // Thickness of grid lines
    vec4 gridColor = vec4(0.3, 0.3, 0.3, 1.0);    // Grid line color
    vec4 backgroundColor = vec4(0.1, 0.1, 0.1, 1.0); // Background color
    
    // Convert from NDC (-1 to 1) to grid coordinates (0 to gridSize)
    vec2 gridCoord = (vPosition + 1.0) / gridSize;
    
    // Get fractional part to detect grid lines
    vec2 gridFraction = fract(gridCoord);
    
    // Create grid lines (both horizontal and vertical)
    float gridLines = 0.0;
    
    // Horizontal lines
    if (gridFraction.y < gridLineWidth || gridFraction.y > (1.0 - gridLineWidth)) {
        gridLines = 1.0;
    }
    
    // Vertical lines  
    if (gridFraction.x < gridLineWidth || gridFraction.x > (1.0 - gridLineWidth)) {
        gridLines = 1.0;
    }
    
    // Base color with grid
    vec4 baseColor = mix(backgroundColor, gridColor, gridLines);
    
    // Add cursor circle on top
    vec2 cursorNDC = (cursor / resolution) * 2.0 - 1.0;
    float dist = distance(vPosition, cursorNDC);
    
    float circleRadius = 0.05;
    float circleThickness = 0.01;
    
    float circle = smoothstep(circleRadius + circleThickness, circleRadius, dist) - 
                   smoothstep(circleRadius - circleThickness, circleRadius, dist);
    
    vec4 circleColor = vec4(1.0, 1.0, 1.0, 1.0);
    
    // Combine grid and cursor
    gl_FragColor = mix(baseColor, circleColor, circle);
}