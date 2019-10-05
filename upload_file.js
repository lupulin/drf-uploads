const fs = require('fs');
const http = require('http');


function encodeMultipartFormData(delimeter, crlf, formData) {
      let encodedFormData = '';

      Object.keys(formData).forEach(function (paramName) {
        encodedFormData += delimeter + crlf + 'Content-Disposition: form-data; name="' + paramName + '"' +
          crlf + crlf + formData[paramName];
      });

      return encodedFormData;
}


function writeBinaryPostData(req, postData, filepath) {
    const data = fs.readFileSync(filepath);

    var crlf = "\r\n",
        boundaryKey = Math.random().toString(16),
        boundary = `--${boundaryKey}`,
        delimeter = `${crlf}--${boundary}`,
        headers = [
          'Content-Disposition: form-data; name="file"; filename="test.pdf"' + crlf,
          'Content-Type: application/pdf' + crlf,
        ],
        closeDelimeter = `${delimeter}--`,
        multipartBody;

    const encodedPostData = encodeMultipartFormData(delimeter, crlf, postData);
    const formData = encodedPostData + delimeter + crlf + headers.join('') + crlf;

    multipartBody = Buffer.concat([
      new Buffer(formData),
      data,
      new Buffer(closeDelimeter)]
    );

    req.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
    req.setHeader('Content-Length', multipartBody.length);

    req.write(multipartBody);
}


const uploadFile = function(fileBuffer) {

  const postData = {
    'description': 'This is my pdf file uploaded via Node.js'
  };

  const options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: '/file/upload/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('Response is complete.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  writeBinaryPostData(req, postData, filename);

  req.end();
};


const filename = 'sample.pdf';
uploadFile(filename);
