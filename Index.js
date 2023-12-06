var timerInterval;
    var targetTime;
    var audio = new Audio('https://github.com/OLDYTWEBSITE/Timer.github.io/raw/main/Alert.mp3');
    audio.loop = true;
    var volumeSlider = document.getElementById("volume");
    var volumeDisplay = document.getElementById("volumeDisplay");
    var muteCheckbox = document.getElementById("mute");
    
    function startTimer() {
      var hoursInput = document.getElementById("hours");
      var minutesInput = document.getElementById("minutes");
      var ampmInput = document.getElementById("ampm");
      
      var currentHours = new Date().getHours();
      var currentMinutes = new Date().getMinutes();
      var currentSeconds = new Date().getSeconds();
      
      var targetHours = parseInt(hoursInput.value);
      var targetMinutes = parseInt(minutesInput.value);
      
      // Adjust target hours based on AM/PM selection
      if (ampmInput.value === "pm" && targetHours !== 12) {
        targetHours += 12;
      } else if (ampmInput.value === "am" && targetHours === 12) {
        targetHours = 0;
      }
      
      // Set target time based on user input
      targetTime = new Date();
      targetTime.setHours(targetHours, targetMinutes, 0, 0);
      
      // Add 1 day if target time is before current time
      if (targetTime <= new Date()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      
      timerInterval = setInterval(updateTimer, 1000);
    }
    
    function stopTimer() {
      clearInterval(timerInterval);
    }
    
    function resetTimer() {
      clearInterval(timerInterval);
      document.getElementById("timer").textContent = "00:00:00";
    }
    
    function updateTimer() {
      var currentTime = new Date();
      var timeDifference = targetTime.getTime() - currentTime.getTime();
    
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        document.getElementById("timer").textContent = "Time's up!";
        playSound();
        return;
      }
    
      var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
      // Add leading zeros if necessary
      hours = hours.toString().padStart(2, '0');
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
    
      // Display the timer
      document.getElementById("timer").textContent = hours + ":" + minutes + ":" + seconds;
    }
    
    function playSound() {
      if (!muteCheckbox.checked) {
        audio.play();
      }
    }
    
   function toggleMute() {
           var timerText = document.getElementById("timer").textContent;
      if (muteCheckbox.checked) {
        audio.pause();
      } else {
        if (timerText === "00:00:00") {
          audio.play();
        }
      return;
      }
    }
    
    function changeVolume(event) {
      var volume = event.target.value;
      audio.volume = volume / 100;
      volumeDisplay.textContent = volume + "%";
    }
