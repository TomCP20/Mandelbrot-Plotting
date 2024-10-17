uniform vec2 size;
uniform vec2 offset;
uniform float bottom;
uniform float top;

varying vec2 coord;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  //vec2 size = vec2(right-left, top-bottom);
  //vec2 offset = vec2(left, bottom);
  coord = ((projectedPosition.xy+1.0f)/2.0f)*size+offset;
}
