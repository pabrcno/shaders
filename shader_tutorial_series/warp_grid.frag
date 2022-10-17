#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    color += sin(st.x * cos(u_time/30.0) * 60.0) + sin(st.y * cos(u_time/15.0) * 10.0);
    color += cos(st.y * sin(u_time/30.0) * 60.0) + cos(st.x * sin(u_time/15.0) * 10.0);
    // color *= sin(u_time/2.0) * 0.5;
    
    gl_FragColor = vec4(color,1.0);   
}