'use strict';

// Imports modules npm. ============================================================================
const sendgridMail = require('@sendgrid/mail');
// Local imports: config ===========================================================================
const { languageOptions } = require('../../config/config.api');
const { Console } = require('../../config/config.winston');
// Declared environment variables ==================================================================
const {
  API_KEY_SENDGRID: apiKeySendgrid,
  URL: apiUrl,
} = process.env;

sendgridMail.setApiKey(apiKeySendgrid);


const sendConfirmChangePasswordEntitie = async(userEmail, uuid, sport, language = 'en') => {
  const linkActivation = `${apiUrl}/user/password?confirm_code=${uuid}&sport=${sport}`;
  const subject = {
    en: 'Sport Scout - Confirm password change',
    es: 'Ojeador Deportivo - Confirmar cambio de contraseña',
  };
  const html = {
    en: `<p>A new password has been requested for the Sports Scout App.<p>
    <p>To confirm the new password <a href="${linkActivation}">click here</a><p>`,
    es: `<p>Se ha solicitado una nueva contraseña para la aplicación Ojeador deportivo.<p>
    <p>Para confirmar la nueva contraseña <a href="${linkActivation}">click aquí</a><p>`,
  };
  const msg = {
    to: userEmail,
    from: {
      email: 'sportscout@gmail.com',
      name: 'Sport Scout App',
    },
    subject: subject[(languageOptions.indexOf(language) === -1) ? 'en' : language],
    html: html[(languageOptions.indexOf(language) === -1) ? 'en' : language],
  };


  try {
    await sendgridMail.send(msg);
  } catch (error) {
    Console.error(`Error: 'send.confirm.change.password.entitie.js' - ${error.message}`);
  }
  return true;
};

module.exports = {
  sendConfirmChangePasswordEntitie,
};
