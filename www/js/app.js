// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic','ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
        
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      //if(sms){console.log("Works");}
      
  });
})

.controller('homeCtrl',function($scope){
$scope.sayHi1 = function(){
console.log("bloody hard");
}

}) 

.controller('SmsCtrl',function($scope,$ionicPopup,$cordovaSms){
    $scope.sms = {
    number: '9494988000',
    message: 'This is some dummy text'
  };
 
  document.addEventListener("deviceready", function() {
 
    var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: '' // send SMS with the native android SMS messaging
          //intent: '' // send SMS without open any other app
          //intent: 'INTENT' // send SMS inside a default SMS app
      }
    };
      $scope.msg = "";
 
    $scope.sendSMS = function(command) {
      $scope.msg = command;
      console.log($scope.msg);
      $cordovaSms
        .send('9494988000', $scope.msg , options)
        .then(function() {
         console.log('Success');
          // Success! SMS was sent
        }, function(error) {
          console.log('Error');
          // An error occurred
        });
    }

  });
})

.controller('PopupCtrl',function($scope, $ionicPopup, $ionicLoading) {

    $scope.appliance = {
        value0: false,
        value1: false,
        value2: false,
        value3: false,
        value4: false
    };
    
    $scope.btStatus = 0;
    
    $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
     title: 'Alert for Blutooth!',
     template: 'OK ani ardham'
   });
    alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
        
        
        
    $scope.showList= function(){
        $ionicLoading.show({
      template: '<p>Connecting...</p><ion-spinner></ion-spinner>'
    });
    };
    
     $scope.toggleChange = function(){
         
         //if($scope.blue===0){
         //$scope.showConfirm();
            // $scope.showList();
         //}
         
         if(String(arguments[0])==="0"){
            $scope.btStatus = 1;
             
             if($scope.appliance.value0){
                 
             $scope.showConfirm();
             }
             else{
                 document.getElementById('v').style.display = "none";
                 bluetoothSerial.disconnect();
                 $scope.btStatus=0;
             }
             
         }
         else if(String(arguments[0])==="1" && $scope.btStatus===1){
             if($scope.appliance.value1)
                bluetoothSerial.write('2');
             else
                 bluetoothSerial.write('1');
         console.log("Shit works"+ $scope.appliance.value1);
         }
         else if(String(arguments[0])==="2" && $scope.btStatus===1){
            if($scope.appliance.value2)
                bluetoothSerial.write('4');
             else
                 bluetoothSerial.write('3');
             console.log("Shit works"+ $scope.appliance.value2);
         }
         else if(String(arguments[0])==="3"  && $scope.btStatus===1){
             if($scope.appliance.value3)
                bluetoothSerial.write('6');
             else
                 bluetoothSerial.write('5');
         console.log("Shit works"+ $scope.appliance.value3);
         } 
         else if(String(arguments[0])==="4" && $scope.btStatus===1){
             if($scope.appliance.value2)
                bluetoothSerial.write('8');
             else
                 bluetoothSerial.write('7');
         console.log("Shit works"+ $scope.appliance.value4 );
         }
         
         
     };
    
   
 $scope.showConfirm = function() {
     $scope.showList();
   var confirmPopup = $ionicPopup.confirm({
     title: 'Bluetooth',
     template: 'Connect to prototype?'
   });

   confirmPopup.then(function(res) {
       
     if(res){    
     bluetoothSerial.enable(
        function() {
           bluetoothSerial.connectInsecure('30:14:10:15:14:28',
                                           function(){document.getElementById('v').style.display = "block"; $ionicLoading.hide();},
                                           function(){});
            
        },
        function() {
            console.log("The user did *not* enable Bluetooth");
        }
    ); 
     }
   });
 };
    
})
.controller('SettingCtrl',function($scope){
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller:'homeCtrl'
    })
  .state('blue', {
      url: '/blue',
      templateUrl: 'templates/blue.html',
      controller:'PopupCtrl'
      
    })
  .state('sms', {
      url: '/sms',
      templateUrl: 'templates/sms.html',
      controller: 'SmsCtrl'
    })
  .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html',
      controller: 'SettingCtrl'
    });
  $urlRouterProvider.otherwise('/home');
    
});


