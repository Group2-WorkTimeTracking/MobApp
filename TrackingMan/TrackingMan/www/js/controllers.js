angular.module('starter.controllers', [])

.controller('SignCtrl', function ($scope, $stateParams, $state, $ionicPopup, Employees) {

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
    //Refresh
    $scope.doRefresh = function () {
        $http.get("https://worktime-tracking.herokuapp.com/location").then(function (response) {
            $scope.data = response.data;
        });
        $scope.$broadcast('scroll.refreshComplete');
    }

    //$scope.uuid = device.uuid;
    $scope.uuid = "0";

    //$scope.employees = Employees.get($stateParams.emplId);
    $scope.userfname = $stateParams.userfname;
    $scope.userlname = $stateParams.userlname;

    //Get data from Heroku server
    $http.get("https://worktime-tracking.herokuapp.com/location").then(function (response) {
        $scope.data = response.data;
    });

    if (document.getElementById('placeName').value === $scope.placeName) {
        $scope.status = "On work";
    } else {
        $scope.status = "Out of work";
    }

    //Set up todays date in good format
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var month = new Array(12);
    month[0] = 'Jan'; month[6] = 'Jul';
    month[1] = 'Feb'; month[7] = 'Aug';
    month[2] = 'Mar'; month[8] = 'Sep';
    month[3] = 'Apr'; month[9] = 'Oct';
    month[4] = 'May'; month[10] = 'Nov';
    month[5] = 'Jun'; month[11] = 'Dec';
    $scope.date = d.getDate() + " " + month[d.getMonth()] + ", " + weekday[d.getDay()] + ", " + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    // Timer count up:
    $scope.upTime = function (countTo) {
        now = new Date();
        difference = (now - countTo);

        hours = Math.floor((difference % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
        mins = Math.floor(((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
        secs = Math.floor((((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);
        document.getElementById('hours').firstChild.nodeValue = hours;
        document.getElementById('minutes').firstChild.nodeValue = mins;
        document.getElementById('seconds').firstChild.nodeValue = secs;

        clearTimeout(setT);
        var setT = setTimeout(function () { upTime(countTo); }, 1000);        
    }
    $scope.upTime('jan,30,2017,00:00:00');


    //Toggle setting
    $scope.settings = {
        enableFriends: true
    };

    //Note adding setting 
    $scope.showPopup = function () {
        $scope.data = {};

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                }
            ]
        });
    }

    //$scope.data = {
    //    location: "",
    //    worktime: "",
    //    none: size
    //};

    //if ($scope.userfname == $scope.employees.fname) {
    //    $scope.userface = $scope.employees.face;
    //};


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
