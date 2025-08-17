in vec2 vUV;
in vec2 vPosition;  

uniform sampler2D uTexture;

void main() {
    gl_FragColor = vec4(vPosition.x, 0.0, vPosition.y, 1.0);
}