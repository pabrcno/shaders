#ifdef GL_ES
precision mediump float;
#endif
// an uniform is a bridge between the vertex shader and the fragment shader.
// it contains the state of a certain variable.
// shader viewers contain certain uniform variables that can be accessed
// some are mouse position, time, resolution, etc.
uniform vec2 u_resolution;


float circleshape(vec2 position, float radius){
    //step(edge: Specifies the location of the edge of the step function,x : Specify the value to be used to generate the step function.)
    //step generates a step function by comparing x to edge.
    //For element i of the return value, 0.0 is returned if x[i] < edge[i], and 1.0 is returned otherwise.
    return step(radius, length(position - vec2(0.5)));
}

void main(){
    // gl_FragCoord is a special variable that contains the coordinate system
    // of a fragment shader it contains multiple dimension,
    // in this case we will access just the x and y and save it in a vec2.
    vec2 position = gl_FragCoord.xy / u_resolution;
    


    float circle = circleshape(position,0.1);
    // we assign the color of the fragment to take 
    // the value of the circle variable.
    // the fragment then is just colored on the circle coordinates.
    vec3 color = vec3(circle);

    gl_FragColor = vec4(color, 1.0);


}