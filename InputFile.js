 function openFileExplorer() {
      document.getElementById("fileInput").click();
    }
    
    document.getElementById("fileInput").addEventListener("change", function(event) {
      var file = event.target.files[0];
      var url = URL.createObjectURL(file);
      audio.src = url;
    });
