# DT Toolkit — Server
This code was developed as part of the master’s thesis by [@isabelle-galleberg](https://github.com/isabelle-galleberg) and [@evateis](https://github.com/evateis).

This repository contains the **backend application**, built using [Node.js](https://nodejs.org/en) and [Express](https://expressjs.com/).

## 💡 Project Overview
**DT Toolkit** is a digital toolkit developed to support a Design Thinking (DT) workshop focused on educating K–12 students about phishing scams. It provides interactive, structured activities that guide students through the stages of the Design Thinking process. The toolkit is intended for use by educators or facilitators leading workshops and aims to promote critical thinking, creativity, and cybersecurity awareness among young learners.

## 💻 Project setup
Follow the steps below to set up and run the backend application locally.

### 1. Clone the repository
<div class="copy-box">
  <pre><code>git clone https://github.com/isabelle-galleberg/dt-toolkit-server.git</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('git clone https://github.com/isabelle-galleberg/dt-toolkit-server.git')"></button>
</div>

### 2. Install Dependencies 
Navigate to the project folder and install dependencies:

<div class="copy-box">
  <pre><code>npm install</code></pre>
  <button class="copy-btn" onclick="navigator.clipboard.writeText('npm install')"></button>
</div>


### 3. Create Environment File
Create a `.env` file in the root directory and add the following:

<pre lang="markdown">
PORT=5000
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret_key  
OPENAI_API_KEY=your_openai_api_key  
</pre>


- `PORT`: Port the server will run on
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for signing JWT tokens
- `OPENAI_API_KEY`: Your OpenAI API key for making requests to OpenAI's services<br><br>


### 4. Run the Server
<pre lang="markdown">npm start</pre>

The API will be available at [http://localhost:5000/api](http://localhost:5000/api).
