in vec2 vTextureCoord;
in vec2 vObjectCoord; // NOW this is 0-1 across entire object!

uniform sampler2D uTexture;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform float uTime;

void main(void) {
    // vObjectCoord is now stable across the entire geometry
    vec2 coord = vObjectCoord;
    
    // Apply wave based on object-space coordinates
    float wave = sin(coord.x * uWaveFrequency + uTime) * uWaveAmplitude;
    vec2 distortedCoord = vTextureCoord + vec2(0.0, wave * 0.01);
    
    vec4 color = texture(uTexture, distortedCoord);
    gl_FragColor = vec4(coord, 0.0,1.0);
    
    // Or for testing:
    // gl_FragColor = vec4(coord.xy, 0.0, 1.0);
}