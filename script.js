function ouvrirPage(url) {
    window.open(url, '_blank');
  }

  function ouvrirlaVideo(videoURL) {
    var videoContainer = document.querySelector('.icone-youtube .video-container');
    var videoFrame = videoContainer.querySelector('.video-frame');
    var closeButton = videoContainer.querySelector('.close-button');

    videoFrame.src = videoURL;
    videoContainer.style.display = 'block';
    closeButton.style.display = 'block';
  }

  function fermerlaVideo() {
    var videoContainer = document.querySelector('.icone-youtube .video-container');
    var videoFrame = videoContainer.querySelector('.video-frame');
    var closeButton = videoContainer.querySelector('.close-button');

    videoFrame.src = '';
    videoContainer.style.display = 'none';
    closeButton.style.display = 'none';
  }

  function ouvrirVideo(videoPath) {
    var videoContainer = document.querySelector('.icone-video .video-container');
    var videoFrame = videoContainer.querySelector('.video-frame');
    var closeButton = videoContainer.querySelector('.close-button');

    videoFrame.src = videoPath;
    videoContainer.style.display = 'block';
    closeButton.style.display = 'block';
  }

  function fermerVideo() {
    var videoContainer = document.querySelector('.icone-video .video-container');
    var videoFrame = videoContainer.querySelector('.video-frame');
    var closeButton = videoContainer.querySelector('.close-button');

    videoFrame.src = 'assets/video.mp4';
    videoContainer.style.display = 'none';
    closeButton.style.display = 'none';
  }

  function FermermaVideo() {
    var videoContainer = document.querySelector('.icone-video .video-container');
    var videoFrame = videoContainer.querySelector('.video-frame');
    var closeButton = videoContainer.querySelector('.close-button');

    videoFrame.src = 'assets/mars.mp4';
    videoContainer.style.display = 'none';
    closeButton.style.display = 'none';
  }

  function ouvrirdriftVideo(videoPath) {
    var videoContainer = document.querySelector('.icone-drift .video-container');
    var videoFrame = videoContainer.querySelector('.video-frame');
    var closeButton = videoContainer.querySelector('.close-button');

    videoFrame.src = videoPath;
    videoContainer.style.display = 'block';
    closeButton.style.display = 'block';
  }

  function fermerdriftVideo() {
    var videoContainer = document.querySelector('.icone-drift .video-container');
    var videoFrame = videoContainer.querySelector('.video-frame');
    var closeButton = videoContainer.querySelector('.close-button');

videoFrame.src = '';
videoContainer.style.display = 'none';
closeButton.style.display = 'none';
}

  function playMusic(musicPath) {
    var musicContainer = document.querySelector('.icone-music .music-container');
    var audioPlayer = musicContainer.querySelector('audio');
    var pauseButton = musicContainer.querySelector('.pause-button');

    audioPlayer.src = musicPath;
    audioPlayer.play();
    musicContainer.style.display = 'block';
    pauseButton.style.display = 'block';
  }

  function pauseMusic() {
    var musicContainer = document.querySelector('.icone-music .music-container');
    var audioPlayer = musicContainer.querySelector('audio');
    var pauseButton = musicContainer.querySelector('.pause-button');

    audioPlayer.pause();
    musicContainer.style.display = 'none';
    pauseButton.style.display = 'none';
  }

  function playSound(soundPath) {
    var audio = new Audio(soundPath);
    audio.play();
  }

  function updateClock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    document.querySelector('.heure').textContent = time;

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = date.toLocaleDateString(undefined, options);
    document.querySelector('.date').textContent = formattedDate;
  }

  function updateClock() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    document.querySelector('.heure').textContent = time;

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = date.toLocaleDateString(undefined, options);
    document.querySelector('.date').textContent = formattedDate;
  }

  updateClock();
  setInterval(updateClock, 1000);

  window.addEventListener('resize', function() {
    var container = document.getElementById('pc-container');
    container.style.height = window.innerHeight + 'px';
  });

  var dragItem = null;
  var offsetX = 0;
  var offsetY = 0;
  var initialX = 0;
  var initialY = 0;
  var gridSize = 50;

  function startDrag(event) {
    var icon = event.target.classList.contains('icone-video') ? event.target : event.target.parentNode;
    dragItem = icon;
    offsetX = event.clientX - icon.getBoundingClientRect().left;
    offsetY = event.clientY - icon.getBoundingClientRect().top;
    initialX = icon.getBoundingClientRect().left;
    initialY = icon.getBoundingClientRect().top;
  }

  document.addEventListener('mousemove', function(e) {
    if (dragItem !== null) {
      e.preventDefault();
      var x = e.clientX - offsetX;
      var y = e.clientY - offsetY;
      var snappedX = Math.round(x / gridSize) * gridSize;
      var snappedY = Math.round(y / gridSize) * gridSize;
      dragItem.style.transform = 'translate(' + snappedX + 'px, ' + snappedY + 'px)';
    }
  });

  document.addEventListener('mouseup', function() {
    dragItem = null;
  });

  var imageIsFalling = false;
  var imageX = 0;
  var imageY = 0;
  var imageSpeedY = 0;
  var groundHeight = window.innerHeight - 40; // Adjust the ground height as desired

  function startFalling() {
    var imageContainer = document.querySelector('.image-container');
    var displayedImage = imageContainer.querySelector('#displayed-image');

    imageContainer.style.display = 'block';
    imageX = (window.innerWidth - displayedImage.clientWidth) / 2;
    imageY = (window.innerHeight - displayedImage.clientHeight) / 2;
    imageSpeedY = 0;
    imageIsFalling = true;
    setTimeout(stopFalling, 5000); // Adjust the falling duration as desired
  }

  function stopFalling() {
    imageIsFalling = false;
  }

  function updateImagePosition() {
    if (imageIsFalling) {
      imageY += imageSpeedY;
      imageSpeedY += 0.5; // Adjust the falling speed as desired

      var imageContainer = document.querySelector('.image-container');
      var displayedImage = imageContainer.querySelector('#displayed-image');

      displayedImage.style.transform = 'translate(' + imageX + 'px, ' + imageY + 'px)';

      if (imageY + displayedImage.clientHeight >= groundHeight) {
        imageY = groundHeight - displayedImage.clientHeight;
        imageSpeedY = 0;
      }
    }
  }

  function handleKeyDown(event) {
    if (imageIsFalling) {
      switch (event.key) {
        case 'ArrowLeft':
          moveImage('left');
          break;
        case 'ArrowRight':
          moveImage('right');
          break;
      }
    }
  }

  function handleKeyUp(event) {
    if (imageIsFalling) {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          stopImage();
          break;
      }
    }
  }

  function handleCollision() {
    if (imageIsFalling && imageY + displayedImage.clientHeight >= groundHeight) {
      stopImage();
    }
  }

  function moveImage(direction) {
    if (imageIsFalling) {
      switch (direction) {
        case 'left':
          imageSpeedX = -5; // Adjust the horizontal movement speed as desired
          break;
        case 'right':
          imageSpeedX = 5; // Adjust the horizontal movement speed as desired
          break;
      }
    }
  }

  function stopImage() {
    if (imageIsFalling) {
      imageSpeedX = 0;
    }
  }

  function openFakeDiscord() {
    var fakeDiscordContainer = document.querySelector('.fake-discord-container');
    fakeDiscordContainer.style.display = 'block';
  }

  function closeFakeDiscord() {
    var fakeDiscordContainer = document.querySelector('.fake-discord-container');
    fakeDiscordContainer.style.display = 'none';
  }

  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
  setInterval(updateImagePosition, 1000 / 60); // Adjust the update interval as desired
  setInterval(handleCollision, 100); // Adjust the collision detection interval as desired
