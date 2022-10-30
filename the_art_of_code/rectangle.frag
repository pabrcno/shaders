#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float Band(float t, float start, float end, float blur){
    float step1 = smoothstep(start - blur, start + blur, t);
    float step2 = smoothstep(end + blur, end - blur, t);

    return step1 * step2;
}


float Rect(vec2 uv,float top,float right,float bottom, float left, float blur){
    float x = Band(uv.x, left, right, blur);
    float y = Band(uv.y, bottom, top, blur);

    return x * y;
}


void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    uv -= .5; 
    uv.x *= u_resolution.x / u_resolution.y; 

    float rect = Rect(uv,.3, .2, -.3, -.2, 0.001);
    
    vec3 color = vec3(0.1, 0.5 , 0.5) * rect;

    gl_FragColor = vec4(color, 1.0) ;
}