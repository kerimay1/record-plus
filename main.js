let streams = [];

function startCapture(displayMediaOptions) {
  navigator.mediaDevices
    .getDisplayMedia(displayMediaOptions)
    .then(function (stream) {
      streams.push(stream);
      var video = document.getElementById("screen");
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
}

function startCamera(displayMediaOptions) {
  navigator.mediaDevices
    .getUserMedia(displayMediaOptions)
    .then(function (stream) {
      streams.push(stream);
      var video = document.getElementById("camera");
      video.srcObject = stream;
      video.onloadedmetadata = function (e) {
        video.play();
      };
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
}

document.getElementById("start").onclick = () => {
  startCapture({ video: { width: 400, height: 200 } });
  startCamera({ video: { width: 400, height: 200 } });
};

document.getElementById("stop").onclick = () => {
  streams.map((stream) => {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  });
  document.getElementById("screen").srcObject = null;
  document.getElementById("camera").srcObject = null;
};
