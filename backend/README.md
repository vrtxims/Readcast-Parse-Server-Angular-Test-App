# parse-server-app-test
Lightwight ParseServer Implementation for Testing App

### What is this?
An easy way to deploy mongodb and parse-server for testing purposes.
This is setup with the intention for testing the instance of parse server, would work with any of the Parse sdks.


### What do I need for this to work?
You'll need to have ```npm``` installed.
If you don't already have npm installed you can <a href="http://blog.npmjs.org/post/85484771375/how-to-install-npm">get started here</a>.


### How to Get Started.
You can clone down this project and run ```npm install``` to set everything up. Npm installations are done locally to keep things nice and tidy.

```bash
# start the server
npm start

...

# stop the server
npm stop
```

You can run the server directly from the project directory, in case you want to get direct output directly to the console rather than just the logs.

### Open Dashboard.
You can test the instance by going to the dashboard http://localhost:1337/dashboard where you can see the TestApp and create new classes.