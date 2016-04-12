# minify-js-files-in-a-directory
It uses uglifyjs for minification and recursilvely saves it to the destination folder.

One can use it in the command propmt by typing node minify.js D:\bijli\Mysites\tatapower D:\destination (the 1st patch is soucre directory and second one is destination directory).
Users need to be careful while minifying the angular projects as it breakes the code.

It should be app.controller("DispCtrl",["$scope","$http","$location",function($scope, $http, $location)  rather than 
app.controller('DispCtrl', function($scope, $http, $location) .



