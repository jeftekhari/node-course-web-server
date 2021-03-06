const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; 

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log')
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenence.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		name: 'Joe',
		likes: [
			'Friends',
			'Boops'
		],
		welcomeMessage: 'Hi welcome to my page! :D',
		pageTitle: 'Home Page'
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		message: 'Portfolio page here',
		pageTitle: 'Projects Page'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'I got a baaad feeling about this..'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});