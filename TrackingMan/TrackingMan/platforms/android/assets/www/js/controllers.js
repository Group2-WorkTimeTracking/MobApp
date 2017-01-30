angular.module('starter.controllers', [])

.controller('SignCtrl', function ($scope, $state, $ionicPopup, Employees) {

    $scope.user = {
        fname: "",
        lname: ""
    };

    $scope.employees = Employees.all();

    $scope.showAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: "Wrong input!",
            template: "Please, fill in your name and id number.",
            okText: "OK",
            okType: "button-positive"
        });
    };
    $scope.showNameAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: "Wrong name!",
            template: "No such name found in the database.",
            okText: "Try again",
            okType: "button-positive"
        });
    };
    $scope.showIDAlert = function () {
        var alertPopup = $ionicPopup.alert({
            title: "Wrong id!",
            template: "No such id found in the database.",
            okText: "Try again",
            okType: "button-positive"
        });
    };

    $scope.signin = function () {
        if (document.getElementById('fname').value === "" &&
            document.getElementById('id').value === "") {
            $scope.showAlert();
        }
        else if (document.getElementById('fname').value === "") {
            $scope.showNameAlert();
        }
        else if (document.getElementById('id').value === "") {
            $scope.showIDAlert();
        }
        else {
            $state.go('main', {
                userfname: $scope.user.fname,
                userlname: $scope.user.lname
            });
        }
    }
})

.controller('MainCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, Employees) {

    //$scope.uuid = device.uuid;
    $scope.uuid = "0";

    //$scope.employees = Employees.get($stateParams.emplId);
    $scope.userfname = $stateParams.userfname;
    $scope.userlname = $stateParams.userlname;

    $http.get("https://worktime-tracking.herokuapp.com/location").then(function (response) {
        $scope.data = response.data;
    });

    //$scope.data = {
    //    location: "",
    //    worktime: "",
    //    none: size
    //};

    //if ($scope.userfname == $scope.employees.fname) {
    //    $scope.userface = $scope.employees.face;
    //};


    //$scope.doRefresh = function () {
    //    $http.get("https://messaging-app-extra.herokuapp.com/messages").then(function (response) {
    //        $scope.data = response.data;
    //    });
    //    $scope.$broadcast('scroll.refreshComplete');
    //}



    //$scope.send = function () {
    //    $scope.showAlert = function () {
    //        var alertPopup = $ionicPopup.alert({
    //            title: "Not a proper message!",
    //            template: "You cannot send nothing.",
    //            okText: "Alright, alright..",
    //            okType: "button-positive"
    //        });
    //    };

    //    if (document.getElementById('text').value === "") {
    //        $scope.showAlert();
    //    }
    //    else {

    //Getting date and time
    //var d = new Date();
    //var weekday = new Array(7);
    //weekday[0] = "Sunday";
    //weekday[1] = "Monday";
    //weekday[2] = "Tuesday";
    //weekday[3] = "Wednesday";
    //weekday[4] = "Thursday";
    //weekday[5] = "Friday";
    //weekday[6] = "Saturday";
    //$scope.time = weekday[d.getDay()] + ", " + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

    //var dataWithPost = {
    //    username: $stateParams.username,
    //    message: $scope.message.data,
    //    date: $scope.time,
    //    uuid: $scope.uuid
    //};

    //$http.post("https://worktime-tracking.herokuapp.com/location", dataWithPost).then(function (response) {
    //    $scope.data = response.data;
    //});

    //$scope.data = {
    //    location: "",
    //    worktime: "",
    //    none: ""
    //};

    //$http.get("https://worktime-tracking.herokuapp.com/location").then(function (response) {
    //    $scope.data = response.data;
    //});

    //}
    //} 
})

.controller('DashCtrl', function ($scope) { })

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
