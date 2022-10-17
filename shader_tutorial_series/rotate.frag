#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

uniform float u_time;

const float PI = 3.1415926535897932384626433832795;



float rectShape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}

mat2 rotate(float angle){
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    st -= vec2(0.5);
    st = rotate(u_time) * st;
    st += vec2(0.5);
    vec3 color = vec3(0.0) + vec3(rectShape(st, vec2(0.2, 0.2)));

    gl_FragColor = vec4(color,1.0);
}