const axios = require('axios');

document.getElementById('uploadButton').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select a file to upload.');
    return;
  }

  try {
    // Read the file content
    const fileContent = await readFileContent(file);

    // Split the file content into chunks of 15000 characters
    const chunks = chunkString(fileContent, 15000);

    // Upload each chunk to the OpenAI API
    for (const chunk of chunks) {
      await uploadChunkToOpenAI(chunk);
    }

    alert('File upload complete!');
  } catch (error) {
    console.error('Error during file upload:', error);
    alert('An error occurred during file upload.');
  }
});

function readFileContent(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

function chunkString(str, chunkSize) {
  const chunks = [];
  let index = 0;
  while (index < str.length) {
    chunks.push(str.slice(index, index + chunkSize));
    index += chunkSize;
  }
  return chunks;
}

async function uploadChunkToOpenAI(chunk) {
  const apiKey = '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'; // Replace with your actual OpenAI API key
  const apiUrl = 'https://api.openai.com/v1/files'; // Replace with the appropriate API endpoint

  try {
    const response = await axios.post(apiUrl, {
      data: chunk,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'text/plain',
      },
    });

    // Handle the response from the OpenAI API as needed
    console.log('File chunk uploaded:', response.data);
  } catch (error) {
    console.error('Error during file chunk upload:', error.response.data);
    throw error;
  }
}
