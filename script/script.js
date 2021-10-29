function getLocation() {

    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    else if (Notification.permission === "granted") {
        var notification = new Notification("You will be notified Everytime you head out home! Keep your masks handy!");
    }

    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {

            if (permission === "granted") {
                var notification = new Notification("You will be notified Everytime you head out home! Keep your masks handy!");
            }
        });
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        loc.innerHTML = "Not supported";
    }
}

function showPosition(position) {

    lat = position.coords.latitude;
    long = position.coords.longitude;

    navigator.geolocation.watchPosition(i_position)

    function i_position(values) {
        c_lat = values.coords.latitude;
        c_long = values.coords.longitude;

    diff = Math.abs(c_lat - lat);

    if(((diff) > 0.0005)){
        let maskConfirm = confirm("Did you take your mask?");
        if(maskConfirm){
            maskTrue();
        }
        else {
            console.log(Notification.permission)

            if (!("Notification" in window)) {
                alert("This browser does not support desktop notification");
            }

            else if (Notification.permission === "granted") {
                var notification = new Notification("Take Your mask!");
            }

            else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function (permission) {

                    if (permission === "granted") {
                        var notification = new Notification("Take your Mask!");
                    }
                });
            }
        }
    }
    }
}

function maskTrue() {
    lat = c_lat;
}

//10800000 = 3hrs => reminder for state1
//8640000 = 2.4hr => reminder for state2

function outdoors_t() {
    if(typeof(Storage)!=="undefined"){
        localStorage.state = 1;
    }

    document.getElementById("continue").style.display = "block"
    document.getElementById("message").innerHTML = "You will be reminded to wash your hands every 2 hours and 40 minutes.";
    document.getElementById("message2").innerHTML = "Click ";
    document.getElementById("message3").innerHTML = "to proceed. Skip to cancel.";
}

function outdoors_f() {
    if(typeof(Storage)!=="undefined"){
        localStorage.state = 2;
    }

    document.getElementById("continue").style.display = "block";
    document.getElementById("message").innerHTML = "You will be reminded to wash your hands every 3 hours.";
    document.getElementById("message2").innerHTML = "Click ";
    document.getElementById("message3").innerHTML = "to proceed. Skip to cancel.";
}


function remindMe() {

    if(typeof(Storage)!=="undefined"){                                          // Wake Info from user
        num = document.getElementById("wake_up_time").value;
        localStorage.wake = num.slice(0,2);
    } else {
        document.getElementById("message").innerHTML = "Sorry, your browser does not support Storage.";
    }

    if(typeof(Storage)!=="undefined"){                                          // Wake Info from user
        n = document.getElementById("sleep_time").value;
        localStorage.sleep = n.slice(0,2);
    } else {
        document.getElementById("message2").innerHTML = "Sorry, your browser does not support Storage.";
    }

    localStorage.rem = Number(localStorage.sleep) - Number(localStorage.wake);


    // console.log(localStorage.wake);
    // console.log(localStorage.sleep);
    // console.log(localStorage.state);
    // console.log(localStorage.rem);

    document.getElementById("next").style.display = "inline-block";

}

function washDone() {
    var sound = document.getElementById("sound");
    sound.pause();


    if(Number(localStorage.state) == 1){
        var d = new(Date);
        var h = d.getHours();
        if((h <= localStorage.sleep) && (h >= localStorage.wake)){
        setTimeout(function(){
            sound.play();
        }, 8640000); // reminds after 2.4 hours
        }
        else {
            setTimeout(function(){
                sound.play();
            }, (Number(localStorage.rem)) * 3600000);
        }
    }

    if(Number(localStorage.state) == 2){
        var d = new(Date);
        var h = d.getHours();
        if((h <= localStorage.sleep) && (h >= localStorage.wake)){
        setTimeout(function(){
            sound.play();
        }, 10800000); // reminds after 3 hours
        }
        else {
            setTimeout(function(){
                sound.play();
            }, (Number(localStorage.rem)) * 3600000);
        }
    }

    console.log(localStorage.wake);
    console.log(localStorage.sleep);
    console.log(localStorage.state);
    console.log(localStorage.rem);
}

function snooze() {
    var sound = document.getElementById("sound");
    sound.pause();

    setTimeout(function(){
        sound.play();
    }, 10000);  //Snooze for 24hrs 86400000
}

function off() {
    var sound = document.getElementById("sound");
    sound.pause();
    localStorage.handwashState = 0;
}

function myFunction() {

    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }

    var y = document.getElementById("hero-text");
        if (y.style.display === 'none') {
    y.style.display = 'block';
        } else {
    y.style.display = 'none';
    }
}

function countdowntimer() {

    localStorage.handwashState = 1;

    if(Number(localStorage.state) == 1){
        var sound = document.getElementById("sound");                          //Reminder for state 1
        var d = new(Date);
        var h = d.getHours();
        console.log(h);
        if((h < Number(localStorage.sleep)) && (h >= Number(localStorage.wake))){
        setTimeout(function(){
            sound.play();
        }, 8640000);// reminds after every 2.4 hours
        }
        else {
            setTimeout(function(){
                sound.play();
            }, (Number(localStorage.rem)) * 3600000);
        }

    }

    if(Number(localStorage.state) == 2){
        var sound = document.getElementById("sound");                          //Reminder for state 2
        var d = new(Date);
        var h = d.getHours();
        console.log(h);
        if((h < Number(localStorage.sleep)) && (h >= Number(localStorage.wake))){
        setTimeout(function(){
            sound.play();
        }, 10800000);// reminds after every 3 hours
        }
        else {
            setTimeout(function(){
                sound.play();
            }, (Number(localStorage.rem)) * 3600000);
        }

    }

    if(localStorage.state == 1){

        countdownNumberEl = document.getElementById('countdown-number');
        var seconds = 59;
        var minutes = 39;
        var hours = 2;

        countdownNumberEl.textContent = hours + " : " + minutes + " : " + seconds;

        setInterval(function() {

            seconds = --seconds <= 0 ? 59 : seconds;

            countdownNumberEl.textContent = hours + " : " + minutes + " : " + seconds;

            if(seconds == 1){
                minutes = minutes - 1;
                seconds = 59
            }

            if(minutes < 0){
                hours = hours - 1;
                minutes = 39;
            }

            if(hours < 0){
                hours = hours + 3;
                minutes = 39;
                seconds = 59;
            }
        }, 1000);
    }

    if(localStorage.state == 2){

        countdownNumberEl = document.getElementById('countdown-number');
        var seconds = 59;
        var minutes = 59;
        var hours = 2;

        countdownNumberEl.textContent = hours + " : " + minutes + " : " + seconds;

        setInterval(function() {

            seconds = --seconds <= 0 ? 59 : seconds;

            countdownNumberEl.textContent = hours + " : " + minutes + " : " + seconds;

            if(seconds == 1){
                minutes = minutes - 1;
                seconds = 59
            }

            if(minutes < 0){
                hours = hours - 1;
                minutes = 59;
            }

            if(hours < 0){
                hours = hours + 3;
                minutes = 59;
                seconds = 59;
            }
        }, 1000);

    }

}

function lastline() {
    document.getElementById("stats").style.display = "none";
    console.log(localStorage.handwashState);
    if(localStorage.handwashState == 1){
        document.getElementById("last-text").style.display = "none";
        document.getElementById("stats").style.display = "inline-block";
    }

}

function hidecircles() {
    document.getElementById("small-circle-main").style.display = "none";
    document.getElementById("small-circle1").style.display = "none";
    document.getElementById("small-circle2").style.display = "none";
}

function appearcircles() {
    document.getElementById("small-circle-main").style.display = "inline-block";
    document.getElementById("small-circle1").style.display = "inline-block";
    document.getElementById("small-circle2").style.display = "inline-block";
}
