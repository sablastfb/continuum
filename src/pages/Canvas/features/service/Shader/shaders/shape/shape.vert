attribute vec2 aPosition;
attribute vec2 aUV;

uniform mat3 uProjectionMatrix;
uniform mat3 uWorldTransformMatrix;
uniform mat3 uTransformMatrix;

varying vec2 vUV;
varying vec2 vWorldPosition; // Add this

void main() {
    mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
    gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
    vUV = aUV;
    
    // Calculate world position
    vec3 worldPos = uWorldTransformMatrix * uTransformMatrix * vec3(aPosition, 1.0);
    vWorldPosition = worldPos.xy; // Add this
}