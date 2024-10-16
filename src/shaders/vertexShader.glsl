varying vec2 coord;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  float x = (((projectedPosition.x+1.0f)/2.0f)*2.47f)-2.0f;
  float y = (((projectedPosition.y+1.0f)/2.0f)*2.24f)-1.12f;
  coord = vec2(x, y);
}
