#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;


float circle(vec2 uv, vec2 pos, float radius, float blur){
    float d = length(uv - pos); // remap to position
    float color = smoothstep(radius+blur, radius-blur, d); 
    return color;
}

void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    

    uv -= .5; 
    uv.x *= u_resolution.x / u_resolution.y; 

    vec2 left_eye_pos = vec2(0.4, 0.1);
    float shape = circle(uv, left_eye_pos, .2, 0.001); // right eye
    
    vec2 right_eye_pos = vec2(-0.4, 0.1); 
    // if we want to add multiple circles, we can just add them together
    // to the shape variable.
    shape+= circle(uv, right_eye_pos, .2, 0.001); // left eye
    // if we want to create a circle inside another circle, we can subtract
    // the inner circle from the outer circle. Giving the inner circle a
    // position that is inside the outer circle.
    shape-= circle(uv, left_eye_pos, .1, 0.001);// left eye pupil
    shape-= circle(uv, right_eye_pos, .1, 0.001);// right eye pupil
    // in order to colorize the shape, we can use the shape variable as a
    // mask and multiply it with a color.
    
    //for the mouth, we can use the same circle function, but we need to
    // to substract a circle on top of the mouth, to create a smile.
    shape+= circle(uv, vec2(0.0, -0.2), .1, 0.001); // mouth
    shape-= circle(uv, vec2(0.0, -0.), .2, 0.001); // mouth smile

    vec3 color = vec3(1., 0.2, 0.1) * shape;

    gl_FragColor = vec4(color, 1.0);
}