const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

 const sendWelcomeEmail = (email, name) => {
     sgMail.send({
         to: email,
         from: 'stahlschmidt@gmail.com',
         subject: 'Thanks for joining in!',
         text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
         //html: '' its possible to create email with html tags. 
     })
 }

 const sendFarwellEmail = (email, name) => {
     sgMail.send({
         to: email,
         from: 'stahlschmidt@gmail.com',
         subject: 'Farwell',
         text: `We understand that decision, ${name}. Thanks for your patience.`
     })
 }

 module.exports = {
     sendWelcomeEmail,
     sendFarwellEmail
 }