uniform int max_iteration;

varying vec2 coord;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main()
{
    float x0 = coord.x;
    float y0 = coord.y;
    float x = 0.0;
    float y = 0.0;
    float x2 = 0.0;
    float y2 = 0.0;
    int iteration = 0;
    while(x2 + y2 <= 4.0 && iteration < max_iteration)
    {
        y = 2.0 * x * y + y0;
        x = x2 - y2 + x0;
        x2 = x * x;
        y2 = y * y;
        iteration++;
    }
    vec3 col;
    if (iteration == max_iteration)
    {
        col = vec3(0,0,0);
    }
    else
    {
        float val = (float(iteration) / float(max_iteration));
        float h = (mod(pow(val*360.0f, 1.5f),360.0f))/360.0f;
        float s = 1.0f;
        float v = 1.0f;
        vec3 hsv = vec3(h, s, v);
        col = hsv2rgb(hsv);
    }
    gl_FragColor = vec4(col, 1.0);
}