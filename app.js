const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
	console.log('Listening to port 3000');
});

mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true });

const articleSchema = {
	title: String,
	content: String,
};

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', (req, res) => {
	Article.find((err, foundArticles) => {
		res.send(foundArticles);
	});
});
