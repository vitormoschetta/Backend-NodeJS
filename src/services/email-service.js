'use strict';

const config = require('../config')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(config.sendgridKey)

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



