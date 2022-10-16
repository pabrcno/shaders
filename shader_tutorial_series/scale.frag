#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

mat2 scale(vec2 s) {
    return mat2(s.x, 0, 0, s.y);
}

float circleShape(vec2 position, float radius){
    return step(radius, length(position - vec2(0.5)));
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord -= 0.5;
    coord = scale(vec2(sin(u_time)+ 4.0) ) * coord;
    coord += 0.5;
    float circle = circleShape(coord, 0.5);
    vec3 color = vec3(circle);

    gl_FragColor = vec4(color, 1.0);

}