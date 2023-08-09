document.addEventListener("DOMContentLoaded", function () {
  var themeOptions = document.querySelector(".theme-options");
  themeOptions.classList.add("active");

  var toggleBtn = document.querySelector(".theme-options .toggle-btn");
  toggleBtn.addEventListener("click", function () {
    themeOptions.classList.toggle("active");
  });

  var animTypeSelect = document.getElementById("anim-type");
  animTypeSelect.addEventListener("change", function () {
    var html = document.documentElement;
    var animNum = parseInt(animTypeSelect.value, 10);
    if (animNum >= 0 && animNum <= 36) {
      if (animNum === 0) {
        html.setAttribute("data-random-animation", "true");
      } else {
        html.setAttribute("data-animation", animNum.toString());
        html.setAttribute("data-random-animation", "false");
      }
    }
  });

  var themeColorLinks = document.querySelectorAll(".theme-color li a");
  themeColorLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var styleLink = link.getAttribute("href");
      document.querySelector("link.site-color").setAttribute("href", styleLink);
      e.preventDefault();
    });
  });
});

window.addEventListener("load", function () {
  var options = [];
  for (var i = 1; i < 37; i++) {
    options.push('<option value="' + i + '">' + i + "</option>");
  }

  setTimeout(function () {
    var themeOptions = document.querySelector(".theme-options");
    themeOptions.classList.remove("active");
  }, 3000);

  var animTypeSelect = document.getElementById("anim-type");
  animTypeSelect.innerHTML = options.join("");
});
