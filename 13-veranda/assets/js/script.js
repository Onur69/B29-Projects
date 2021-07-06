document.addEventListener("scroll", function (e) {
  if (document.documentElement.scrollTop > 10) {
    document.getElementById("main-navbar").classList.add("navbar-scroll");
    document
      .querySelector("#main-navbar img")
      .setAttribute("src", "assets/img/logo-grup.png");
  } else {
    document.getElementById("main-navbar").classList.remove("navbar-scroll");
    document
      .querySelector("#main-navbar img")
      .setAttribute("src", "assets/img/logo-grup-siyah.png");
  }
});

// Tab pills içindeki dropdown menüde bir eleman seçildikten sonra başka bir eleman seçildiğinde
// Önceki eleman halen aktif kalıyor. Bunu düzeltmek için yazdım
const dropdowns = document.querySelectorAll(".nav-pills .dropdown-menu");

dropdowns.forEach(function (dropdown) {
  dropdown.addEventListener("click", function (e) {
    for (var i = 0; i < this.children.length; i++) {
      if (this.children[i].querySelector("button") != e.target) {
        this.children[i].querySelector("button").classList.remove("active");
      }
    }
    this.parentElement.querySelector("button").classList.add("active");
  });
});

document.querySelector("#contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var form = this;

  if (!CheckValidity(form)) return;

  var el = document.getElementById("contactFormResult");
  if (el.classList.contains("show")) el.classList.remove("show");

  var name = document.querySelector('#contactForm [name="name"]');
  var email = document.querySelector('#contactForm [name="email"]');
  var project = document.querySelector('#contactForm [name="project"]');
  var phone = document.querySelector('#contactForm [name="phone"]');
  var message = document.querySelector('#contactForm [name="message"]');
  var form_fieldset = document.querySelector("#contactForm fieldset");
  var spinner = document.querySelector("#contactForm .spinner");
  var formResult = document.getElementById("contactFormResult");

  spinner.classList.toggle("d-none");
  form_fieldset.toggleAttribute("disabled");

  var data = {
    name: name.value,
    email: email.value,
    project: project.value,
    phone: phone.value,
    message: message.value,
  };

  window.setTimeout(function () {
    SendForm("server/send-email.php", data).then(function (response) {
      console.log(response);
      formResult.querySelector(".message").innerText = response.msg;

      form_fieldset.toggleAttribute("disabled");
      spinner.classList.toggle("d-none");

      if (response.success) {
        formResult.classList.add("alert-success");
        form.classList.replace("was-validated", "needs-validation");
        name.value = "";
        project.value = "";
        email.value = "";
        phone.value = "";
        message.value = "";
      } else {
        formResult.classList.add("alert-danger");
      }
      formResult.classList.remove("d-none");
      formResult.classList.add("d-block");
    });
  }, 1000);
});

document
  .querySelector("#btnGalleryVilla")
  .addEventListener("click", function () {
    var triggerEl = document.querySelector(
      '#galery-tab button[id="pills-galeri-dis-mekan-villa-tab"]'
    );
    console.log(triggerEl);
    var tab = new bootstrap.Tab(triggerEl);

    tab.show();
  });

function CheckValidity(form) {
  form.classList.add("was-validated");
  return form.checkValidity();
}

async function SendForm(action, data) {
  const url = "https://yunusoglugrup.com/" + action;

  var formData = new FormData();
  for (var item in data) {
    formData.append(item, data[item]);
  }

  return await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
