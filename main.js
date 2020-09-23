// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBo8LgG0W7xxiQAzmoUwZE6GmNMBEOGY5A",
  authDomain: "lanista-47890.firebaseapp.com",
  databaseURL: "https://lanista-47890.firebaseio.com",
  projectId: "lanista-47890",
  storageBucket: "lanista-47890.appspot.com",
  messagingSenderId: "902638341312",
  appId: "1:902638341312:web:598a34d075e76889c5f125",
  measurementId: "G-WWB9CZS24S",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    formState: false,
    errors: [],
    sendMessage: [],
    form: {
      name: null,
      phone: null,
      email: null,
      message: null
    }
  },
  methods: {
    sendForm() {
      this.checkForm()
      if (this.errors.length === 0) {
        const sendForm = (form) => {
          var db = firebase.firestore()
          db.collection('messages').doc().set(form).then((res) => {
            this.sendMessage.push('Formunuz başarıyla kaydedildi.')
            form.name=null
            form.phone=null
            form.email=null
            form.message=null
            
            setTimeout(() => {
              this.sendMessage = []
              this.formState = !this.formState
            }, 5000);
          }).catch((err) => {
            console.log(err)
          })
        }
        sendForm(this.form)
      }
    },
    checkForm() {
      this.errors = [];
      if (!this.form.name) {
        this.errors.push("Lütfen ad soyad giriniz.")
      }
      if (!this.form.email) {
        this.errors.push('Email adresinizi giriniz.')
      } else if (!this.validEmail(this.form.email)) {
        this.errors.push('Email bilginizi yanlış girdiniz. isim@adress.com formatında girmelisiniz')
      }
      if (!this.form.phone) {
        this.errors.push('Telefon numaranızı giriniz..')
      } else if (!this.validPhone(this.form.phone)) {
        this.errors.push('Telefon numarası başında 0 olmadan 10 hane olmalıdır.')
      }


      setTimeout(() => {
        this.errors = []
      }, 5000);
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPhone(phone) {
      var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      return phone.match(phoneno) === null ? false : true
    }

  }

})