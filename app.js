const express = require('express');
const app = express();
const port = 3000;

const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
	try {
		await axios.get("https://www.rottentomatoes.com/top/bestofrt/?year=2019")
			.then(html => {
				let ulList = [];
				const $ = cheerio.load(html.data);
				const $bodyList = $(".table").find("td");

				$bodyList.each(function (i, elem) {
					ulList[i] = {
						title: $(this).find('a').text().trim(),
						url: $(this).find('a').attr('href'),
					};
				});

				const data = ulList.filter(n => n.title);
				return data;
			})
	} catch (error) {
		console.error(error);
	}
};

app.get('/', (req, res) => {
	res.send('hello express')

})

app.listen(port, () => console.log(`Listening on port ${port}!`))