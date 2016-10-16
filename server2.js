var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var nodemailer = require('nodemailer');
//reference the plugin 

var hbs = require('nodemailer-express-handlebars');

var options = {//the plugin options
     viewEngine: {
         extname: '.hbs',
         layoutsDir: 'views/email/',
         defaultLayout : 'template',
         partialsDir : 'views/email/partials/'
     },
     viewPath: 'views/email/',
     extName: '.hbs'
 };



app.get('/', function(req, res){
    res.render('index', {title: 'uclaProject2' });
});

app.post('/sendEmail', function(req, res, next){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'uclaProject2@gmail.com',
            pass: 'superpassword'
        } 
    });
    //attach the plugin to the nodemailer transporter 
transporter.use('compile', hbs(options));

    var mailOptions = {
        from: '"E-minder" <uclaProject2@gmail.com>',
        to: 'montalvocode@yahoo.com',
        subject: "We've found it!",
        template: 'email_body',
        context: {
            variable1: 'value1',
            variable2: 'value2'
        }
    };


    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.redirect('/');
        }else {
            console.log('Message sent: ' + info.response);
            res.redirect('/');
        }
    });
});


var port = 3000;
app.listen(port);

