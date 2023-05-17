const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


let transporter = nodemailer.createTransport({
    service : 'gmail',
    host: 'smtp.gmail.com',
    port: 487,
    secure: false,
    auth:{
        user : 'riteshk229@gmail.com',
        password: 'almosthuman'
    }
});

let renderTemplate = (data,reletivePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer',reletivePath),
        data,
        function(Template,err){
            if(err){
                console.log('error in rendering template');
                return ;
            }
            
            mailHTML = Template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate: renderTemplate
}