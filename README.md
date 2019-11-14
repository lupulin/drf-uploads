# DRF Uploads

1. Install Pipenv (make sure it's running Python 3.7)
2. `pipenv sync`
3. `pipenv shell`
4. `cd drfuploads`
5. `python manage.py makemigrations`
6. `python manage.py migrate`
7. `python manage.py runserver`

For more information how it works, go to http://chrisbartos.com


### Uploading examples

Ensure your server is set up and running on localhost.

#### Python

    python upload_file.py

#### Node.js

Tested on Node 10.

    node upload_file.js

#### Curl

    sh upload_file.sh
