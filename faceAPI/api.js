const faceapi = require("face-api.js");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const Student=require("../models/Student")
const Course=require("../models/Course")
const newFace=require("../models/newFace")


faceapi.env.monkeyPatch({ Canvas, Image });


async function run()
{
  await LoadModels()
}
run()

async function LoadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models");

  console.log("loaded");
}

async function getDes(images) {
  try {
    const descriptions = [];
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
    }
    return descriptions;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

async function matchFace(faces, image) {
  let f=[];
  for (i = 0; i < faces.length; i++) {
        for (j = 0; j < faces[i].descriptions.length; j++) {
        faces[i].descriptions[j] = new Float32Array(
            Object.values(faces[i].descriptions[j])
        );
        }
        f.push ( new faceapi.LabeledFaceDescriptors(faces[i].label, faces[i].descriptions))
  }
  const faceMatcher = new faceapi.FaceMatcher(f, 0.6);
  const img = await canvas.loadImage(image);
//   let temp = faceapi.createCanvasFromMedia(img);
//   const displaySize = { width: img.width, height: img.height };
//   faceapi.matchDimensions(temp, displaySize);

  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
//   const resizedDetections = faceapi.resizeResults(detections, displaySize);
//   const results = resizedDetections.map((d) =>
//     faceMatcher.findBestMatch(d.descriptor)
//   );
  const results = detections.map((d) =>{
    let r=faceMatcher.findBestMatch(d.descriptor)
    newFace.addFace(r,d.descriptor)
    return r
  }
  );
  return results;
}

module.exports = { faceapi,matchFace, getDes, LoadModels };
