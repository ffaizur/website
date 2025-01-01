const form = document.querySelector("form"),
statusTxt = form.querySelector(".buttonArea span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusTxt.style.color = "#000";
  statusTxt.style.display = "block";
  statusTxt.innerText = "Sending your message...";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("Email and message field is required!") != -1 || response.indexOf("Enter a valid email address!") != -1 || response.indexOf("Sorry, failed to send your message!") != -1){
        statusTxt.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}






const hireMeBtn = document.getElementById("hireMeBtn");
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("closeBtn");
    
    // Show the overlay when "Hire Me" is clicked
    hireMeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        overlay.classList.add("show");
    });
    
    // Hide the overlay when close button is clicked
    closeBtn.addEventListener("click", function () {
        overlay.classList.remove("show");
    });
    
    // Hide the overlay when clicking outside the form
    window.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.classList.remove("show");
        }
    });