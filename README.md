# Carver

![A custom Carver logo](https://github.com/mahimabhayana/mahimabhayana.github.io/blob/master/images/Carver.png?raw=true)
 
Carver is an MVP for a auto classifieds platform built using React, ant-design, and Express. It uses the Marketcheck API to search through car listings in cities all over North America. As of writing this README, Marketcheck is unable to provide results in Canada but can find results within a 10 mile radius of any US city provided.

### Running the app
The repository consists of two folders: the client and the server, both of which must be launched in separate terminals. Although the project was supposed to be a frontend exercise, the Express backend is just my answer to some CORS issues I was experiencing with the Marketcheck API.

To launch the frontend:
cd client && npm install
npm start

Likewise, for the backend
cd server && npm install
npm start
