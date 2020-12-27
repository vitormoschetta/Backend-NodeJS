'use strict';

const settings = require('../settings')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(settings.sendgridKey)

exports.send = async (to, subject, body) => {
    const msg = {
        to: to, 
        from: 'vitormoschetta@gmail.com', 
        subject: subject,        
        html: body,
      }
      sgMail
        .send(msg)
        .then(() => { 
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
}


