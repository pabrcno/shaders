#ifdef GL_ES
precision mediump float;
#endif

void main(){
// colors are represented as vec4 types in GLSL
// r,g,b,o you can create variables that store certain
// color state as vectors and use the accordingly
// in gl_FragColor, gl_FragColor is the color your 
// fragment will be rendered as in the final image.  
  vec3 color = vec3(0.3, 0.5, 0.5);
// a fragment shader is a program that runs on every
// pixel in the image.  gl_FragCoord is a vec4 that
// contains the rgba values of each pixel.
  gl_FragColor = vec4(color, 1.0);   
}