object = [];

model_status = "";

alarm = "";


function start() {

    cocossd = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Status : Detecting objects"

}

function setup() {

    canvas = createCanvas(380, 380);

    canvas.center();

    video = createCapture(VIDEO);

    video.size(380, 380);

    video.hide();

}

function modelLoaded() {

    console.log("model has been loaded successfully");

    model_status = true;


}


function draw() {

    image(video, 0, 0, 380, 380);


    if (model_status != "") {


        cocossd.detect(video, gotResults);

        for (i = 0; i < object.length; i++) {


            document.getElementById("objects").innerHTML = "Number of objects detected : " + object.length;

            object_name = object[i].label;

            if (object_name == "person") {

                document.getElementById("status").innerHTML = "Status : Baby found";

                if (alarm.isPlaying()) {

                    alarm.stop();

                }

            } else {

                alarm.play();

                alarm.setVolume(1);

                alarm.rate(2);

            }

        }

        if (object.length <= 0) {

            document.getElementById("status").innerHTML = "Baby not found";

            alarm.play();

            alarm.setVolume(1);

            alarm.rate(2);

        }

    }

}





function gotResults(e, r) {

    if (e) {

        console.error(e)

    } else {

        console.log(r);

        object = r;

    }

}