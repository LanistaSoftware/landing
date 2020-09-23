var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    formState: false,
    errors: [],
    form: {
      name: null,
      phone: null,
      email: null,
      message: null
    }
  },
  methods: {
    sendForm () {
      this.checkForm()
      if(this.errors.length === 0) {
        console.log(this.form)
      }
    },
    checkForm () {
      this.errors= [];
      if(!this.form.name) {
        this.errors.push("Lütfen ad soyad giriniz.")
      }
      if(!this.form.email) {
        this.errors.push('Email adresinizi giriniz.')
      } else if (!this.validEmail(this.form.email)) {
        this.errors.push('Email bilginizi yanlış girdiniz. isim@adress.com formatında girmelisiniz')
      } if (!this.form.phone) {
        this.errors.push('Telefon numaranızı giriniz..')
      } else if(!this.validPhone(this.form.phone)){
        this.errors.push('Telefon numarası başında 0 olmadan 10 hane olmalıdır.')
      }


      setInterval(() => {
        this.errors = []
      }, 5000);
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone (phone) {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      return phone.match(phoneno) === null ? false : true
    }
    
  }

})