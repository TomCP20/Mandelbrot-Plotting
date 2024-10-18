uniform vec2 size;
uniform vec2 offset;

varying vec2 coord;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  coord = ((projectedPosition.xy + 1.0) / 2.0) * size + offset;
}
