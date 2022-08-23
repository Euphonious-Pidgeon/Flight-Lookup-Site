# Flight-Lookup-Site

# Website images:

Sign in:

<img width="1575" alt="signIn" src="https://user-images.githubusercontent.com/74836936/186216331-f9035c18-83ed-478e-a8fb-bd6140e18ac3.png">

Sign up:

<img width="1576" alt="signUp" src="https://user-images.githubusercontent.com/74836936/186216631-b69c801f-59e9-460a-8353-a1f3b9a3fb37.png">

Seach parameters:

<img width="1573" alt="searchParam" src="https://user-images.githubusercontent.com/74836936/186216721-06f60b26-6b1c-4744-b5bb-102dd8476046.png">

Search results:

<img width="1278" alt="searchResults" src="https://user-images.githubusercontent.com/74836936/186216767-34ef8ac9-12ee-499c-bedb-c08a4b50a04d.png">

Profile page:

<img width="1278" alt="profileSave" src="https://user-images.githubusercontent.com/74836936/186216851-bae9a61f-296b-4372-8468-3acc2bda40b2.png">

# Will require API token and secret key from https://developers.amadeus.com/ to run the site.

# Installation requirements:

Python Versions 3.10 or newer. 

Python download: https://www.python.org/downloads/  

React.JS Versions 18.2 or newer. 

Node.js download: https://nodejs.org/en/

React.js is installed through Node.JS with “npm install react” 

Amadeus Developer API for Python

Installed along when “pip install” of the requirements is run.

A Python virtual environment can be used within the system main directory ./upandaway to isolate system dependencies from the global Python space.

Instructions for setting up a virtual environment can be found here: https://docs.python.org/3/tutorial/venv.html

The Python dependencies should be installed from the ./upandaway  directory. The Python required libraries are found in the requirements.txt file. 

They can be downloaded and installed by running the Python command $ pip install -r requirements.txt.

The React.Js dependencies can be installed by running the command $ npm install in the ./upandaway/frontend directory.

Installed modules can be verified by running the command $ npm list. The following modules should be listed. 

├── @testing-library/jest-dom@5.16.4

├── @testing-library/react@13.3.0

├── @testing-library/user-event@13.5.0

├── axios@0.27.2

├── nan@2.16.0 extraneous

├── react-dom@18.2.0

├── react-router-dom@6.3.0

├── react-scripts@2.1.3

├── react@18.2.0

└── web-vitals@2.1.4

If they are not listed, they can be installed independently using the command 

$ npm install <module name> 

After installing the required modules for Python and ReactJS, the servers can be started. This system utilizes Python Flask for the backend framework and 

Node.js as the Javascript runtime environment. 

To start Flask, navigate to ./upandaway/backend and enter the command $ flask run.

To start Node.js, navigate to ./upandaway/frontend and enter the command $ npm start.

The Flask development environment is hosted on localhost:5000 and the Node.js server is hosted on localhost:3000 by default. 

To access the web application, navigate to localhost:3000.  The Flask address on localhost:5000 is used internally by the system.
