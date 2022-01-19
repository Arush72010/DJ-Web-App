Beliver_song="";
Thunder_song="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
Beliver_status = "";
Thunder_status = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function preload(){
    Beliver_song = loadSound("Beliver_mp3.mp3");
    Thunder_song = loadSound("Thunder_mp3.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    Beliver_status = Beliver_song.isPlaying();

    Thunder_status = Thunder_song.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        Beliver_song.stop();
        if(Thunder_status == false){
            Thunder_song.play();
            document.getElementById("song").innerHTML ="Thunder"
        }
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        Thunder_song.stop();
        if(Beliver_status == false){
            Beliver_song.play();
            document.getElementById("song").innerHTML ="Beliver"
        }
    }
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist+" scoreRightWrist = "+scoreRightWrist);
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}