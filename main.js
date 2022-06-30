object = [];

model_status = "";

function start(){

    cocossd = ml5.objectDetector("cocossd",modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting objects"

}

function setup(){

    canvas = createCanvas(380,380);

    canvas.center();

    video = createCapture(VIDEO);

    video.size(380,380);

    video.hide();

}

function modelLoaded(){

    console.log("model has been loaded successfully");

    model_status = true;


}
  

function draw(){

    image(video,0,0,380,380);
    

    if (model_status != ""){

        
     cocossd.detect(video, gotResults);

        for(i=0; i < object.length; i++){

            document.getElementById("status").innerHTML = "Status : Object Detected";
            
            document.getElementById("objects").innerHTML = "Number of objects detected : " + object.length;

            object_name = object[i].label;

            object_percentage = floor(object[i].confidence*100);

            object_x = object[i].x;

            object_y = object[i].y;

            object_width = object[i].width;

            object_height = object[i].height;

            r = floor(random(256));

            g = floor(random(256));

            b = floor(random(256));

            fill(r,g,b);

            text(object_name + " " + object_percentage + "%" , object_x , object_y);

            stroke(r,g,b);

            noFill();

            rect(object_x , object_y , object_width , object_height);

        }

    }
   
}

function gotResults(e,r){

    if (e){

       console.error(e) 

    }

    else{

        console.log(r);

        object = r;

    }

}
