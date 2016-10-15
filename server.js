var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




var nodemailer = require('nodemailer');

var theGift = " e.g. Gramma's 'GIFT'.";



///////////////////NODEMAILER///////////////////////
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

	var mailOptions = {
		from: '"Project2" <uclaProject2@gmail.com>',
		to: 'montalvocode@yahoo.com',
		subject: 'Email test for Project2',
		text: 'You have an update about your desired Gift ' + theGift,
		html: '<p>You have an update about your desired Gift</p>' + theGift
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

