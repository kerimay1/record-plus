let streams = [];

function startCapture() {
  const { desktopCapturer } = require("electron");
  desktopCapturer
    .getSources({ types: ["window", "screen"] })
    .then(async (sources) => {
      const source = sources[0];
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: source.id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720,
            },
          },
        });
        var video = document.getElementById("screen");
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      } catch (e) {
        console.log(e);
      }
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
  startCapture();
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
