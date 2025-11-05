in vec2 vTextureCoord;
in vec2 vTextureSize;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec3 uBackgroundColor;
uniform vec3 uGridColor;
uniform float uGridSize;
uniform float uLineWidth;
uniform float uOpacity;
uniform float viewportZoom;

void main(void) {
    // Get the original texture alpha (shape mask)
    vec4 texColor = texture(uTexture, vTextureCoord);

    // Convert texture coords to pixel space for grid
    vec2 pixelCoord = vTextureCoord * vTextureSize / viewportZoom;

    // Calculate grid pattern
    float gridSize = uGridSize;
    vec2 gridPos = mod(pixelCoord, gridSize);
    float distToGrid = min(gridPos.x, gridPos.y);
    distToGrid = min(distToGrid, min(gridSize - gridPos.x, gridSize - gridPos.y));

    // Create grid lines with anti-aliasing
    float scaledLineWidth = uLineWidth;
    float aaWidth = 0.5 / viewportZoom;
    float grid = 1.0 - smoothstep(scaledLineWidth - aaWidth, scaledLineWidth + aaWidth, distToGrid);

    // Mix background and grid colors
    vec3 color = mix(uBackgroundColor, uGridColor, grid * uOpacity);

    // Apply shape mask (only show pattern inside the shape)
    finalColor = vec4(color*texColor.a, texColor.a);
}