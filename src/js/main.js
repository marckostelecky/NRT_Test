var weatherSearch = {
  setData: function(response) {
    console.log(response);
    var temperature = response.main.temp;
    var weatherDescription = response.weather[0].description;
    var weatherIcon = response.weather[0].icon;
    var fahrenheit = ((temperature-273.15)*1.8)+32;
    var renderTemp = document.querySelector('.temperature');
    var zipInput = document.querySelector('.zip-input');
    fahrenheit = Math.round(fahrenheit);

    renderTemp.innerHTML = fahrenheit + '&deg;' + 'F ' + weatherDescription + '<img src="http://openweathermap.org/img/w/' + weatherIcon + '.png">';
    renderTemp.style.display = 'block';

    renderTemp.classList.remove('has-error');
    zipInput.classList.remove('has-error');

  },
  fetchData: function(zipcode) {
    var xhr = new XMLHttpRequest();
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&&APPID=056242e0358c31b4b1fc4643e1af94eb';
    var self = this;

    xhr.open('GET', url, true);
    xhr.onload = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          self.setData(response);
        } else {
          console.log('invalid');
          var renderTemp = document.querySelector('.temperature');
          var zipInput = document.querySelector('.zip-input');
          zipInput.classList.add('has-error');
          renderTemp.style.display = 'none';
        }
      }
    };
    xhr.send();
  },
  init: function() {
    var form = document.querySelector('.form-weather');
    var self = this;
    form.addEventListener('submit', function(e) {
      var zipcode = document.querySelector('.zip-input').value;

      e.preventDefault();
      self.fetchData(zipcode);
    }, false);
  },
};

var contactSubmit = {
  onSubmit: function(e) {
    e.preventDefault();
    // get values
    var errors = {};
    var firstName = document.querySelector('.first-name');
    var date = document.querySelector('.date-input');
    var email = document.querySelector('.email');

    if(!firstName.value) {
      firstName.classList.add('has-error');
    } else {
      firstName.classList.remove('has-error');
    }

    if(!date.value) {
      date.classList.add('has-error');
    } else {
      date.classList.remove('has-error');
    }

    if(!email.value) {
      email.classList.add('has-error');
    } else {
      email.classList.remove('has-error');
    }

    if(firstName.value && date.value && email.value) {
      var form = document.querySelector('.form-validation');
      form.classList.add('is-submitting');
      setTimeout(function(response) {
        form.innerHTML = 'Thank you!';
      }, 3000);
    }

  },
  init: function() {
    var form = document.querySelector('.form-validation');
    form.addEventListener('submit', this.onSubmit, false);
  }
}

weatherSearch.init();
contactSubmit.init();
