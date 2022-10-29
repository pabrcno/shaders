#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

uniform vec2 u_mouse; 

uniform float u_time;

void main(){

    vec2 m = u_mouse.xy  / u_resolution.xy;
    const float zoom_brake = 0.1;
    float zoom = pow(5., -min(u_time, 6.5 /zoom_brake) * zoom_brake);
    vec2 uv = (gl_FragCoord.xy - 2. /  u_resolution.xy) / u_resolution.y -.7;
    vec2 c = uv  * zoom * 5. ;
    c+= vec2(-.98315 , .2650 );
    vec2 z = vec2(0.);
    float iter = 0.;


    const float max_iter = 1000. ;

    for(float i = 0.; i < max_iter; i++){
        z= vec2(z.x * z.x - z.y * z.y, 2. * z.x * z.y) + c;
        
        if(length(z) > 2.) break;

        iter++;
    }

    float f = iter/max_iter;
    vec3 color = vec3(f);

    gl_FragColor = vec4(color, 1.);
}