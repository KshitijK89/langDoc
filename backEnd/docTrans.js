const axios = require("axios");
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const { promisify } = require('util');
// const { exec,spawn } = require('child_process');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let filePath;

// Define multer storage and upload middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "C:/Users/Kshitij/Desktop/languageTranslator/backEnd/files");
  },
  filename: function (req, file, cb) {
    filePath = `${file.originalname}`;
    cb(null, filePath);
  }
});
const upload = multer({ storage });
// const azdir = String.raw`cd C:\Users\Kshitij\Downloads\azcopy_windows_amd64_10.23.0\azcopy_windows_amd64_10.23.0` 
const fileFPath = 'C:/Users/Kshitij/Desktop/languageTranslator/backEnd/files/aljcskl.txt';
const destinationBlobUrl = 'https://hackaleauge.blob.core.windows.net/inputdocs/?sp=racl&st=2024-02-04T02:29:15Z&se=2024-02-27T10:29:15Z&spr=https&sv=2022-11-02&sr=c&sig=60LB0Dr92q4m3JdnrH2ngfNPf3kH2SIFqf36FCqvJMI%3D';
const azcopyinit =String.raw`.\azcopy`;
const azcopyCommand = `azcopy copy "${fileFPath}" "${destinationBlobUrl}"`;


// Specify the target directory path
const targetDirectory = 'C:/Users/Kshitij/Downloads/azcopy_windows_amd64_10.23.0/azcopy_windows_amd64_10.23.0';

// Check if the target directory exists
if (fs.existsSync(targetDirectory)) {
  // Change the current working directory to the target directory
  process.chdir(targetDirectory);

  // Log the new current working directory
  console.log('Current working directory:', process.cwd());


  // Delay execution by 60 seconds
  setTimeout(() => {
    exec(azcopyinit, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

    exec(azcopyCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      process.exit(0);
    });
  }, 60000); // 60 seconds delay
} else {
  console.error('Target directory does not exist.');
}

// ...


// File upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    

    // Translation API configuration
    const endpoint = 'https://act5.cognitiveservices.azure.com/translator/text/batch/v1.1';
    const route = '/batches';
    const key = '8b09a32703c04f948828a1590dc4f217';
    const src = "https://hackaleauge.blob.core.windows.net/inputdocs";
    const trgt = "https://hackaleauge.blob.core.windows.net/translateddocs";

    // Prepare data for translation API
    const translationData = {
      inputs: [
        {
          source: {
            sourceUrl: src
          },
          targets: [
            {
              targetUrl: trgt,
              language: "kn"
            }
          ]
        }
      ]
    };

    // Make a request to the translation API
    const response = await axios.post(`${endpoint}${route}`, translationData, {
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/json'
      }
    });

    const result = { statusText: response.statusText, statusCode: response.status, headers: response.headers };
    console.log(JSON.stringify(result, null, 2));
    res.send("File uploaded, translated, and API called successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred during translation API call.");
  }
});

// Utility function to promisify a readable stream
function promisifyStream(stream) {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('data', chunk => (data += chunk));
    stream.on('end', () => resolve(data));
    stream.on('error', error => reject(error));
  });
}

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
