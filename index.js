const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

const app = express();

app.use(bodyParser.json());

app.post('/signin', async (req, res) => {
	try {
		const data = await db
			.select('email', 'hash')
			.from('login')
			.where({ email: req.body.email });

		const isValid = await bcrypt.compareSync(req.body.password, data[0].hash);

		if (isValid) {
			const user = await db('users').where({
				email: req.body.email
			});
			res.send(JSON.stringify(user[0]));
		} else {
			res.status(400);
			res.send('could not login');
		}
	} catch (error) {
		res.status(400);
		res.send('could not sign in');
	}
});

app.post('/register', async (req, res) => {
	try {
		const { email, name, password } = req.body;
		const hash = bcrypt.hashSync(password);

		const user = await db('users')
			.insert({
				email: email,
				name: name,
				joined: new Date()
			})
			.returning('*');
		await db('login').insert({
			hash: hash,
			email: email
		});
		res.send(JSON.stringify(user[0]));
	} catch (error) {
		res.status(400);
		res.send('could not register');
	}
});

app.put('/update', async (req, res) => {
	try {
		const { userId } = req.body;
		const udpatedEntries = await db('users')
			.where({
				id: userId
			})
			.increment('entries', 1)
			.returning('entries');

		await res.send(JSON.stringify(udpatedEntries[0]));
	} catch (error) {
		res.status(400);
		res.send('error occured');
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('app is running on port 5000');
});
