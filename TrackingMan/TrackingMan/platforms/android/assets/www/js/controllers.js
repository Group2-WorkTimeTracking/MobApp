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

.controller('MainCtrl', function ($scope, $http, $stateParams, $state, $ionicPopup, $ionicHistory, Employees) {
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
    $scope.date = d.getDate() + " " + month[d.getMonth()] + ", " + weekday[d.getDay()] + ", "
                  + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    
    //////////////////////////////////////////////////////// Timer count up:
    var timeCount;
    if (document.getElementById('hour').innerHTML >= 00
     && document.getElementById('minute').innerHTML >= 00
     && document.getElementById('second').innerHTML >= 01) {
        timeCount = false;
    } else {
        timeCount = true
    }
    

    if (timeCount == true) {
        $.fn.downCount = function (options, callback) {
            var settings = $.extend({
                date: null,
                offset: null
            }, options);

            // Save container
            var container = this;

            /**
             * Change client's local date to match offset timezone
             * @return {Object} Fixed Date object.
             */
            var currentDate = function () {
                // get client's current date
                var date = new Date();

                // turn date to utc
                var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

                // set new Date object
                var new_date = new Date(utc + (3600000 * settings.offset))

                return new_date;
            };

            /**
             * Main downCount function that calculates everything
             */
            var original_date = currentDate();
            var target_date = new Date('12/31/2020 12:00:00'); // Count up to this date

            function onButtonClick() {
                original_date = currentDate();
            }

            function countdown() {
                var current_date = currentDate(); // get fixed current date

                // difference of dates
                var difference = current_date - original_date;

                if (current_date >= target_date) {
                    // stop timer
                    clearInterval(interval);

                    if (callback && typeof callback === 'function') callback();

                    return;
                }

                // basic math variables
                var _second = 1000,
                    _minute = _second * 60,
                    _hour = _minute * 60;
                _day = _hour * 24;

                // calculate dates
                var hours = Math.floor((difference % _day) / _hour),
                    minutes = Math.floor((difference % _hour) / _minute),
                    seconds = Math.floor((difference % _minute) / _second);
                // days = Math.floor(difference / _day),

                // fix dates so that it will show two digets
                //days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

                // based on the date change the refrence wording
                var ref_hours = (hours === 1) ? 'hour' : 'hours',
                    ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                    ref_seconds = (seconds === 1) ? 'second' : 'seconds';
                // ref_days = (days === 1) ? 'day' : 'days',

                // set to DOM
                // container.find('.days').text(days);
                container.find('.hours').text(hours);
                container.find('.minutes').text(minutes);
                container.find('.seconds').text(seconds);

                // container.find('.days_ref').text(ref_days);
                container.find('.hours_ref').text(ref_hours);
                container.find('.minutes_ref').text(ref_minutes);
                container.find('.seconds_ref').text(ref_seconds);
            };

            // start
            var interval = setInterval(countdown, 1000);
        };

        if (document.getElementById('placeName').value === $scope.placeName) {
            $('.countdown').downCount();
            $scope.status = "At work";
        } else {
            $scope.status = "Out of work";
            $scope.atWork = false;
        }
    }
    
    
    //$(document).ready(function () {
    //    $('.countdown').downCount();
    //});
    ////////////////////////////////////////////////////////////////

    //Toggle setting
    $scope.settings = {
        enableLocation: true
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

    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };

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
