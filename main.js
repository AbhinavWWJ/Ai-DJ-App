song2="";
song1="";
scoreRightWrist=0;
scoreLeftWrist=0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;
function preload(){
    song1=loadSound("music1.mp3");
    song2=loadSound("pirates.mp3");
}
function setup(){
 canvas=createCanvas(600,500);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 poseNet=ml5.poseNet(video,modelLoaded);
 poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log("Model is loaded");
}
function gotPoses(results){
 if(results.length>0){
     console.log(results);
     scoreRightWrist=results[0].pose.keypoints[10].score;
     scoreLeftWrist=results[0].pose.keypoints[9].score;
     console.log("Score of Right Wrist="+scoreRightWrist+"Score Of Left Wrist="+scoreLeftWrist);
     rightWristX=results[0].pose.rightWrist.x;
     rightWristY=results[0].pose.rightWrist.y;
     leftWristX=results[0].pose.leftWrist.x;
     leftWristY=results[0].pose.leftWrist.y;
     console.log("Right Wrist X="+rightWristX+"Right Wrist Y="+rightWristY);
     console.log("Left Wrist X="+leftWristX+"Left Wrist Y="+leftWristY);
 }
}
function draw(){
    image(video, 0,0, 600,500);
    fill("#fce303");
    stroke("#94fc03");
    if(scoreRightWrist > 0.1){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
      song1.play();
      document.getElementById("songName").innerHTML="song Name- Avengers Theme "
     }
       if(scoreLeftWrist > 0.1){
        circle(leftWristX, leftWristY, 20);
        song1.stop();
      
      song2.play();
      document.getElementById("songName").innerHTML="song Name- Pirates Of Caribian Theme "
       }
    }
