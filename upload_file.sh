#!/usr/bin/env bash

# Upload via curl
curl --form description='This is my pdf file uploaded via curl' --form file=@sample.pdf --trace upload.log http://127.0.0.1:8000/file/upload/
