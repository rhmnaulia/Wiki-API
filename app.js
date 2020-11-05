const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
	.connect('mongodb://localhost:27017/wikiDB', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB Connected!'))
	.catch((err) => {
		console.log(err);
	});

const articleSchema = {
	title: String,
	content: String,
};

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', (req, res) => {
	Article.find((err, foundArticles) => {
		if (err) {
			res.send(err);
		} else {
			res.send(foundArticles);
		}
	});
});

app.post('/articles', (req, res) => {
	console.log(req.body.title);
	console.log(req.body.content);

	const newArticle = new Article({
		title: req.body.title,
		content: req.body.content,
	});

	newArticle.save((err) => {
		if (err) {
			res.send(err);
		} else {
			res.send('Succesfully added new article.');
		}
	});
});

app.listen(3000, () => {
	console.log('Listening to port 3000');
});
