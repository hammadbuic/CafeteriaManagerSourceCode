# CafeteriaManagerSourceCode
This Repository Contains the source code of cafeteria manager client application and backend


-> make our way to branches\n
-> Click on master branch
-> Here you have the source code of ASP.NET Core 3.1
-> Client App Contains the Angular Files
-> Now Download all files
-> For Source Code to run follow these steps
  1) Get Visual Studio 2019
  2) install .NET 3.1 SDK
  3) install MSSQLServer 2020 or any other client you prefer
  4) install node.js and Angular-CLI
  5) Connect MSSQLServer with the Visual Studio
  6) Retrieve connection string and paste it inside appsettings.json file
  7) Now you have to install node packages
  8) Browse src folder under ClientApp
  9) Right Click on it and select open in terminal
  10) Here Type "npm install" to install node packages
  11) after there install you've to change startup.cs file ![image](https://user-images.githubusercontent.com/50557442/137382966-804be295-664c-4aef-a3c2-562919bc9924.png)
 
  12) Uncomment red line and comment out yellow heighlighted lines
  13) Now in the same terminal you install node packages type "npm run ng serve" to serve client app in development mode
  14) To run backend you can use ctrl+F5 or F5(Debugging mode) {make sure to select console not IIS} <----important to run mobile client
  15) with that done! Now you need to enable api request outside of the localhost because android Emulator cannot access this backend
  16) For that, in visual studio click on extensions section and select manage/add extensions in top menu
  17) Search for CONVERYOR by keyuoti and install it with that installed in your visual studio
  18) Press F5 to run application in debugging mode <---- Need to do it for the first time and then you can switch back to Normal build mode
  19) when you debug a window will open with the addresses on which application is hosted on you need to copy the remote URL something like #192.168.10.1:45457
  20) this is required by your mobile client to communicate with the backend.
  
  
  
  ---> First User is "Admin" with password "root"
  --> Only use PNG format for images
