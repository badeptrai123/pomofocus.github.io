var buttons = document.querySelectorAll(".header-clock button");
var body_bg = document.querySelector("body");
var mainClock = document.querySelector(".main-clock");
var Button = document.querySelector('.start button');
var ClassStart = document.querySelector('.start');
var ForwardButton = document.querySelector(".forward ion-icon");

var loginButton = document.querySelector('ul#main-menu li.login');
var settingButton = document.querySelector('ul#main-menu li.setting');

// note
var numberNote = document.querySelector(".note .number");
var titleNote = document.querySelector(".note .title");
var numberFocus = 1;
// login Button
loginButton.onclick = function() {
        window.location = "login.html";
    }
    // =======   customer time ==============
var m = null; // Phút
var s = null; // Giây
var audio = new Audio('audio/audio.mp3');
var timeout = null; // Timeout
var count = 0;
m = parseInt(document.getElementById('m_val').value);
s = parseInt(document.getElementById('s_val').value);

if (m < 10) {
    document.getElementById('m_val').value = "0" + m.toString();
}
if (s < 10) {
    document.getElementById('s_val').value = "0" + s.toString();
}
if (m >= 100) {
    document.querySelector("input.minute").style.width = "200px";
}

// btn Ok
var btnOk = document.querySelector(".bottom .ok");
var pomoSetting, shortSetting, longSetting;
var pomoMinute = shortMinute = longMinute = -1;
var longBreakInterval = 3;
var getLongBreakInterval;
// Settime function
function setTime(minute, second) {
    ForwardButton.style.display = "none";
    if (minute < 10) {
        document.getElementById('m_val').value = "0" + minute.toString();
    } else {
        document.getElementById('m_val').value = minute;
    }
    if (second < 10) {
        document.getElementById('s_val').value = "0" + second.toString();
    } else {
        document.getElementById('s_val').value = second;
    }
    if (minute >= 100) {
        document.querySelector("input.minute").style.width = "200px";
    }
    m = parseInt(document.getElementById('m_val').value);
    s = parseInt(document.getElementById('s_val').value);
    x = 0;
}

// btn Ok Click
btnOk.onclick = function() {

    pomoSetting = document.querySelector("input#pomoSetting");
    shortSetting = document.querySelector("input#shortSetting");
    longSetting = document.querySelector("input#longSetting");
    getLongBreakInterval = document.getElementById("LongBreakInterval");
    pomoMinute = pomoSetting.value;
    shortMinute = shortSetting.value;
    longMinute = longSetting.value;
    longBreakInterval = getLongBreakInterval.value;
    for (var btn of buttons) {
        if (btn.getAttribute('class') == 'active') {
            setTime(pomoMinute, "0");
        } else if (btn.getAttribute('class') == 'activeShort') {
            setTime(shortMinute, "0");
        } else if (btn.getAttribute('class') == 'activeLong') {
            setTime(longMinute, "0");
        }
    }
    timerSetting.style.display = "none";
    document.querySelector("body").classList.remove("bg-black");
}


// function Pomo
function Pomo() {
    body_bg.style.background = "#d95550";
    mainClock.style.background = "#dd6662";
    Button.style.color = "#d95550";
}

// function ShortBreak
function shortBreak() {
    body_bg.style.background = "#4c9195";
    mainClock.style.background = "#5e9ca0";
    Button.style.color = "#4c9195";
}

// function LongBreak
function longBreak() {
    body_bg.style.background = "#457ca3";
    mainClock.style.background = "#5889ac";
    Button.style.color = "#457ca3";
}

// forward times
function Forward() {
    for (var btn of buttons) {
        if (btn.getAttribute('class') == 'active') {

            if (numberFocus % longBreakInterval == 0) {
                btn.classList.remove('active');
                btn.nextElementSibling.nextElementSibling.classList.add('activeLong');
                longBreak();
                if (longMinute != -1) {
                    setTime(longMinute, "0");
                } else {
                    setTime("15", "0");
                }
                titleNote.innerHTML = "Time to break!";
            } else {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.add('activeShort');
                shortBreak();

                if (shortMinute != -1) {
                    setTime(shortMinute, "0");
                } else {
                    setTime("5", "0");
                }
                titleNote.innerHTML = "Time to break!";
            }
            numberFocus++;
            numberNote.innerHTML = numberFocus;
            clearTimeout(timeout);
            break;
        } else if (btn.getAttribute('class') == 'activeShort') {
            btn.classList.remove('activeShort');
            btn.previousElementSibling.classList.add('active');
            Pomo();
            if (pomoMinute != -1) {
                setTime(pomoMinute, "0");
            } else {
                setTime("30", "0");
            }
            titleNote.innerHTML = "Time to focus!";
            clearTimeout(timeout);
            break;
        } else if (btn.getAttribute('class') == 'activeLong') {
            btn.classList.remove('activeLong');
            btn.previousElementSibling.previousElementSibling.classList.add('active');
            Pomo();
            if (pomoMinute != -1) {
                setTime(pomoMinute, "0");
            } else {
                setTime("30", "0");
            }
            titleNote.innerHTML = "Time to focus!";
            clearTimeout(timeout);
            break;
        }
    }
}

// function CheckTime(m, s) {

//     if (m < 10) {
//         document.getElementById('m_val').value = "0" + m.toString();
//     }
//     if (s < 10) {
//         document.getElementById('s_val').value = "0" + s.toString();
//     }
//     if (m >= 100) {
//         document.querySelector("input.minute").style.width = "200px";
//     }
// }


// function Start Time
function start() {
    count++;

    if (count == 1) {
        s--;
    }

    if (s === -1) {
        m -= 1;
        s = 59;
    }


    if (m == -1) {
        clearTimeout(timeout);
        Button.innerHTML = "Start";
        ForwardButton.style.display = "none";
        audio.play();
        setTimeout(function() {
            audio.pause();
        }, 4000)
        Forward();
        return false;
    }

    /*BƯỚC 1: HIỂN THỊ ĐỒNG HỒ*/
    if (m < 10) {
        document.getElementById('m_val').value = "0" + m.toString();
    } else {
        document.getElementById('m_val').value = m.toString();
    }
    if (s < 10) {
        document.getElementById('s_val').value = "0" + s.toString();
    } else {
        document.getElementById('s_val').value = s.toString();
    }

    /*BƯỚC 1: GIẢM PHÚT XUỐNG 1 GIÂY VÀ GỌI LẠI SAU 1 GIÂY */
    timeout = setTimeout(function() {
        s--;
        start();
    }, 1000);
}

// Start Button Click
var x = 0;
ClassStart.onclick = function() {

        var audioClick = new Audio('audio/clickPause.mp3');
        audioClick.play();
        audio.pause();
        x++;
        if (x % 2 == 0) {
            Button.innerHTML = "Start";
            ForwardButton.style.display = "none";
            clearTimeout(timeout);
        } else {
            Button.innerHTML = "Stop";
            ForwardButton.style.display = "block";
            start();
        }
    }
    // function SetTime

// button pomo short long click
buttons.forEach((button) => {
    button.addEventListener("click", function() {
        if (ForwardButton.style.display == "block") {
            if (!confirm('Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)')) {
                return false;
            }
            Forward();
            Button.innerHTML = "Start";
        }
        buttons.forEach((btn) => {
            btn.classList.remove("active");
            btn.classList.remove("activeShort");
            btn.classList.remove("activeLong");
        });
        this.classList.add("active");
        var getClassBtn = this.getAttribute("id");
        if (getClassBtn == "short") {
            x = 0;
            count = 2;
            button.classList.add("activeShort");
            shortBreak();
            if (shortMinute != -1) {
                setTime(shortMinute, "0");
            } else {
                setTime("5", "0");
            }
            titleNote.innerHTML = "Time to break!";
        } else if (getClassBtn == "long") {
            x = 0;
            count = 2;
            button.classList.add("activeLong");
            longBreak();
            if (longMinute != -1) {
                setTime(longMinute, "0");
            } else {
                setTime("15", "0");
            }
            titleNote.innerHTML = "Time to break!";
        } else {
            x = 0;
            count = 2;
            Pomo();
            if (pomoMinute != -1) {
                setTime(pomoMinute, "0");
            } else {
                setTime("30", "0");
            }
            titleNote.innerHTML = "Time to focus!";
        }
    });
});
// Forward button

ForwardButton.onclick = function() {
    if (!confirm('Are you sure you want to finish the round early? (The remaining time will not be counted in the report.)')) {
        return false;
    }
    Forward();
    Button.innerHTML = "Start";
}

// Setting Click
var timerSetting = document.querySelector(".timer-setting");


var btnCloseSetting = document.querySelector("button.close");
settingButton.onclick = function() {
    timerSetting.style.display = "block";
    document.querySelector("body").classList.add("bg-black");

}
btnCloseSetting.onclick = function() {
    document.querySelector("body").classList.remove("bg-black");
    timerSetting.style.display = "none";
    return false;
}