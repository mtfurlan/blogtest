import * as fs from 'fs';

export default {
	title: "sczie site",
	url: `https://${fs.readFileSync('./CNAME').toString()}/`,
	language: "en",
	subtitle: "I dunno something",
	author: {
		name: "sczie",
		email: "contact@technicallycompetent.com",
	}
}
