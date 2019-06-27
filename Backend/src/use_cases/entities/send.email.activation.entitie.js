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


/**
 *
 * @type {IsendEmailActivationEntitie}
 *
 */
const sendEmailActivationEntitie = async(userEmail, activationCode, sport, language = 'en') => {
  const linkActivation = `${apiUrl}/user/activation?activation_code=${activationCode}&sport=${sport}`;

  const subject = {
    en: 'Welcom to Sport Scout App',
    es: 'Bienvenido a la aplicación Ojeador Deportivo',
  };
  const html = {
    en: `<p>Start promoting your child or finding young sports promises.<p>
    <p>To confirm the account <a href="${linkActivation}">click here</a><p>`,
    es: `<p>Empiece a promocionar a su hijo o a encontrar jóvenes promesas deportivas.<p>
    <p>Para confirmar la cuenta <a href="${linkActivation}">click aquí</a><p>`,
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
    Console.error(`Error: 'send.email.activation.entitie.js' - ${error.message}`);
  }
  return true;
};


module.exports = {
  sendEmailActivationEntitie,
};
