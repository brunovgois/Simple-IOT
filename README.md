## How to run
### Arduino JSON Server
You need to edit Servidor.ino on Arduino IDE and change the values of:
1. mac[]: MAC addres, need to be unique in your local network
2. ip[]: Assign a valid and unused IP to the Arduino Server
3. gateway[]: Replace by the gateway of your local network
4. subnet[]:  Replace by the  subnet mask of your network

 after that, simply compile and run the code.
 
 ### React Native App
 Follow the instructions of your specific OS to install all the dependencies of React Native:
 https://reactnative.dev/docs/environment-setup
 
 After that, you can install the local dependencies using `npm install` on the App folder.
 
 to start the app, run `npx react-native run-android` or 
 `npx react-native run-ios`
 
 ### Materials Used
* Arduino Leonardo
* RJ45 Ethernet cable 
* Arduino w5100 Ethernet Shield 
* 1 Led
* 1 Resistor(120 Ohmn)
* LM35 Temperature sensor
* 5 jumper cables

 
<p float="left">
<image src="https://user-images.githubusercontent.com/17735245/123706352-8ec85e00-d83e-11eb-88cc-5f6163b75c10.png" width="320">
<image src="https://user-images.githubusercontent.com/17735245/123706415-a4d61e80-d83e-11eb-835c-aa6cdad72a70.png" width="320">
 </p> 
