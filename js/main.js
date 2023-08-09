/*======== Window Load Function ========*/
window.addEventListener("load", function () {
  /*======== Preloader ========*/
  var loader = document.querySelector(".loader");
  var loading = document.querySelector(".loading");
  loader.style.display = "none";
  setTimeout(function () {
    loading.style.display = "none";
  }, 1000);

  /*======== Isotope Portfolio Setup ========*/
  var portfolioItems = document.querySelector(".portfolio-items");
  if (portfolioItems) {
    var elements = document.querySelector(".portfolio-items");
    var filters = document.querySelectorAll(".portfolio-filter ul li");
    var iso = new Isotope(elements);

    filters.forEach(function (filter) {
      filter.addEventListener("click", function () {
        filters.forEach(function (f) {
          f.classList.remove("active");
        });
        this.classList.add("active");
        var selector = this.getAttribute("data-filter");
        iso.arrange({ filter: selector });
      });
    });
  }

  /*======== Blogs Masonry Setup ========*/
  var blogsMasonry = document.querySelector(".blogs-masonry");
  if (blogsMasonry) {
    var macy = Macy({
      container: ".blogs-masonry",
      trueOrder: true,
      waitForImages: false,
      margin: 0,
      columns: 3,
      breakAt: {
        980: 2,
        575: 1,
      },
    });

    setTimeout(function () {
      macy.reInit();
    }, 10);
  }
});

/*======== Document Ready Function ========*/
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /*======== SimpleBar Setup ========*/
  var ptPages = document.querySelectorAll(".pt-page");
  ptPages.forEach(function (page) {
    var id = "#" + page.getAttribute("id");
    new SimpleBar(document.querySelector(id));
  });

  document.addEventListener("mouseup", function (e) {
    var headerContainer = document.querySelector(".header-main");

    if (!headerContainer.contains(e.target) && !e.target.closest(".toggle")) {
      document.querySelector(".header-content").classList.remove("on");
    }
  });

  /*======== Fitty Setup ========*/
  fitty(".header-name", {
    multiLine: false,
    maxSize: 20,
    minSize: 10,
  });

  /*======== Active Current Link ========*/
  var navMenuLinks = document.querySelectorAll(".nav-menu a");
  navMenuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (document.querySelector(".header-content.on")) {
        document.querySelector(".header-content").classList.remove("on");
      }
    });
  });

  /*======== Mobile Toggle Click Setup ========*/
  var headerToggle = document.querySelector(".toggle");
  headerToggle.addEventListener("click", function () {
    document.querySelector(".header-content").classList.toggle("on");
  });

  /*======== Clients OwlCarousel Setup ========*/
  var clientsCarousel = document.querySelector(".clients .owl-carousel");
  if (clientsCarousel) {
    var owl = new OwlCarousel(clientsCarousel, {
      loop: true,
      margin: 30,
      autoplay: true,
      smartSpeed: 500,
      responsiveClass: true,
      autoplayHoverPause: true,
      dots: false,
      responsive: {
        0: {
          items: 2,
        },
        500: {
          items: 3,
        },
        700: {
          items: 4,
        },
        1000: {
          items: 6,
        },
      },
    });
  }

  /*======== Testimonials OwlCarousel Setup ========*/
  var testimonialsCarousel = document.querySelector(
    ".testimonials .owl-carousel"
  );
  if (testimonialsCarousel) {
    var owl = new OwlCarousel(testimonialsCarousel, {
      loop: true,
      margin: 30,
      autoplay: true,
      smartSpeed: 500,
      responsiveClass: true,
      dots: false,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
        },
        800: {
          items: 1,
        },
        1000: {
          items: 2,
        },
      },
    });
  }

  /*======== Skills Progress Animation ========*/
  var skills = document.querySelector(".skills");
  if (skills) {
    var progressBars = document.querySelectorAll(".progress .progress-bar");
    var el = new SimpleBar(
      document.querySelector("#resume .simplebar-content-wrapper")
    ).getScrollElement();

    function animateProgress() {
      progressBars.forEach(function (progressBar) {
        var bottom_object = progressBar.offsetTop + progressBar.offsetHeight;
        var bottom_window = window.scrollY + window.innerHeight;
        var progressWidth =
          progressBar.getAttribute("data-progress-value") + "%";
        if (bottom_window > bottom_object) {
          progressBar.style.width = progressWidth;
          var progressValue = progressBar.querySelector(".progress-value");
          var countNum = parseInt(progressWidth, 10);
          var step = function () {
            progressValue.textContent = Math.floor(this.countNum) + "%";
          };
          var complete = function () {
            progressValue.textContent = this.countNum + "%";
          };
          $({ countNum: 0 }).animate(
            { countNum: countNum },
            {
              duration: 2000,
              easing: "swing",
              step: step,
              complete: complete,
            }
          );
        }
      });
    }

    el.addEventListener("scroll", function () {
      animateProgress();
    });

    if (document.querySelector("#resume").classList.contains("page-active")) {
      animateProgress();
    }

    var resumeLink = document.querySelector('a[href="#resume"]');
    if (resumeLink) {
      resumeLink.addEventListener("click", function () {
        animateProgress();
      });
    }
  }

  /*======== Portfolio Image Link Setup ========*/
  var imageLinks = document.querySelectorAll(".portfolio-items .image-link");
  imageLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var gallery = new MagnificPopup(this, {
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    });
  });

  /*======== Portfolio Video Link Setup ========*/
  var videoLinks = document.querySelectorAll(".portfolio-items .video-link");
  videoLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var gallery = new MagnificPopup(this, {
        type: "iframe",
        gallery: {
          enabled: true,
        },
      });
    });
  });

  /*======== Portfolio Ajax Link Setup ========*/
  var ajaxLinks = document.querySelectorAll(".portfolio-items .ajax-link");
  var ajaxContainer = document.querySelector(".ajax-portfolio-popup");
  if (ajaxLinks.length > 0 && ajaxContainer) {
    ajaxLinks.forEach(function (ajaxLink) {
      ajaxLink.addEventListener("click", function (e) {
        e.preventDefault();
        var link = this.getAttribute("href");
        if (link === "#") {
          return;
        }
        var contentWrap = ajaxContainer.querySelector(
          ".content-wrap .popup-content"
        );
        contentWrap.innerHTML = "";
        ajaxContainer.classList.add("on");
        var xhr = new XMLHttpRequest();
        xhr.open("GET", link, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              contentWrap.innerHTML = xhr.responseText;
            } else {
              contentWrap.innerHTML =
                '<h1 class="text-center">Something went wrong! Retry or refresh the page.</h1>';
            }
            ajaxContainer.querySelector(".ajax-loader").style.display = "none";
          }
        };
        xhr.send();
      });
    });

    var popupClose = ajaxContainer.querySelector(".popup-close");
    popupClose.addEventListener("click", function () {
      ajaxContainer.classList.remove("on");
    });
  }

  /*======== Portfolio Tilt Setup ========*/
  var portfolioItems = document.querySelectorAll("#portfolio .item figure");
  portfolioItems.forEach(function (item) {
    var tilt = new Tilt(item, {
      maxTilt: 3,
      glare: true,
      maxGlare: 0.6,
      reverse: true,
    });
  });

  /*======== Contact Form Setup ========*/
  contactFormSetup();
});

/*********** Function Ajax Portfolio Setup **********/
function ajaxPortfolioSetup(ajaxLinks, ajaxContainer) {
  ajaxLinks.forEach(function (ajaxLink) {
    ajaxLink.addEventListener("click", function (e) {
      var link = this.getAttribute("href");
      if (link === "#") {
        e.preventDefault();
        return;
      }
      var contentWrap = ajaxContainer.querySelector(
        ".content-wrap .popup-content"
      );
      contentWrap.innerHTML = "";
      ajaxContainer.classList.add("on");
      var xhr = new XMLHttpRequest();
      xhr.open("GET", link, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            contentWrap.innerHTML = xhr.responseText;
          } else {
            contentWrap.innerHTML =
              '<h1 class="text-center">Something went wrong! Retry or refresh the page.</h1>';
          }
          ajaxContainer.querySelector(".ajax-loader").style.display = "none";
        }
      };
      xhr.send();
      e.preventDefault();
    });
  });

  var popupClose = ajaxContainer.querySelector(".popup-close");
  popupClose.addEventListener("click", function () {
    ajaxContainer.classList.remove("on");
  });
}

/********** Function Contact Form Setup **********/
function contactFormSetup() {
  var inputFields = document.querySelectorAll(".input__field");

  inputFields.forEach(function (input) {
    if (input.value) {
      input.parentNode.classList.add("input--filled");
    } else {
      input.parentNode.classList.remove("input--filled");
    }

    input.addEventListener("keyup", function () {
      if (input.value) {
        input.parentNode.classList.add("input--filled");
      } else {
        input.parentNode.classList.remove("input--filled");
      }
    });
  });

  var contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.querySelector("#cf-name").value;
      var email = document.querySelector("#cf-email").value;
      var message = document.querySelector("#cf-message").value;
      var messageBox = document.querySelector("#contact-form .message");
      var required = 0;

      var cfInputs = document.querySelectorAll(".cf-validate");
      cfInputs.forEach(function (input) {
        if (!input.value) {
          input.classList.add("cf-error");
          required += 1;
        } else {
          if (input.classList.contains("cf-error")) {
            input.classList.remove("cf-error");
            if (required > 0) {
              required -= 1;
            }
          }
        }
      });

      if (required === 0) {
        var data = {
          cf_name: name,
          cf_email: email,
          cf_message: message,
        };
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "mail.php", true);
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.onload = function () {
          var response = JSON.parse(xhr.responseText);
          showAlertBox(response.status, response.message);
          if (response.status === 200) {
            inputFields.forEach(function (input) {
              input.value = "";
            });
          }
        };
        xhr.onerror = function () {
          showAlertBox(
            xhr.status,
            "Something went wrong! Retry or refresh the page."
          );
        };
        xhr.send("data=" + JSON.stringify(data));
      }
    });
  }
}

/********** Function Show Alert Box **********/
function showAlertBox(response, message) {
  var alertBox = document.createElement("div");
  var alContainer = document.querySelector("#contact-form .alert-container");
  alertBox.className = "alert";
  alertBox.textContent = message;

  if (response == 200) {
    alertBox.classList.add("alert-success");
  } else {
    alertBox.classList.add("alert-danger");
  }

  alContainer.innerHTML = "";
  alContainer.appendChild(alertBox);
  alContainer.style.display = "block";

  setTimeout(function () {
    alContainer.style.display = "none";
  }, 4000);
}
