#ifdef GL_ES
precision mediump float;
#endif


// What a shader is:
// A program that takes inputs and outputs a pixel color
// pixels are called fragments.

// An uniform is a value that is the same for all the vertices
// it is passed to the shader by the GPU.
// some are mouse position, time, resolution.
uniform vec2 u_resolution;
// glsl is a language that runs on the GPU and is optimized to run on it.
// using multiple pipelines to run the shader in parallel, and give each
// fragmet (pixel) an unique characteristic based on its position and
// the shader code.

void main(){
    // gl_FragCoord is a vector that contains the coordinates of the fragment,
    // we divide it by the uniform u_resolution to get a value between 0 and 1
    // AKA normalized coordinates.
    // uv is a common name for normalized coordinates. It comes from algebra 
    // where u and v are used to represent 2D coordinates.
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    
    // glsl provides a lot of functions to manipulate vectors and colors.
    // here we use length to get the distance of uv vector from the origin.

    uv -= .5; // center the coordinates. Now uv goes from -0.5 to 0.5
    // we need to correct the aspect ratio of the screen. To avoid stretching.
    uv.x *= u_resolution.x / u_resolution.y; // correct aspect ratio

    float d = length(uv);
    // This technology basic premise is to transform vectors 
    // that can represent anything (position, time, distance, etc)
    // make algebraic transformations on their vectorial space
    // and finally output a color based on the caracteristics of the vectors.
    
    float color = d; // in this case we use the distance of each fragment from the origin
    // to output a color. The closer to the origin, the darker the color. (0 -> 1)


    float radius = .3; // radius of the circle
    
    // if the distance is less than the radius, color is whithe, else it is black.
    // if(d< radius) color= 1.; else color= .0;
    // and like this we can create a white circle.
    // but there are discontinuities in the edges of the circle.
    // this means there are some fragments that go from black to white too fast.
    // so it creates a jagged edge.  (aliasing) (staircase effect)

    // to avoid this we can use smoothstep. It interpolates between 0 and 1
    // interpolation is a way to get a value between 2 values. smoothstep uses
    // a sigmoid function to do it. It is a function that goes from 0 to 1 and
    // then back to 0. It is a common way to interpolate values.
    // smothstep takes 3 parameters, lower bound, upper bound and the value to interpolate.
    // substracting a small value from the radius makes the edge of the circle
    // a little bit more blurry the bigger the value is the flatter the gradient of the S is.
    color = smoothstep(radius-.001, radius+.001, d);

    // gl_FragColor is the output of the shader, it is a vec4 (4 floats)
    // that represents the color of the fragment.
    gl_FragColor = vec4(vec3(color), 1.0);
}