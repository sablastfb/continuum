in vec2 vTextureCoord;
    
    uniform sampler2D uTexture;
    uniform float uWaveAmplitude;
    uniform float uWaveFrequency;
    uniform float uTime;
    
    void main(void) {
        vec2 coord = vTextureCoord;
        
        // Create wave effect
        
        gl_FragColor =vec4(vTextureCoord.xy,0.0,1.0);
    }