import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';

const sendEmail = (user_name, user_email, html) => {
    console.log("Send Email To:", user_name, user_email);
    let templateParams = {
        to_name: user_name,
        to_email: user_email    
    };

    init("rG7kMCXneuYNChDML");

    emailjs.send('service_fs_email', 'template_asiqgnf', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
        console.log('FAILED...', error);
    });
}

export default sendEmail;