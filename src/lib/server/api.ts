import { Elysia, error, t } from 'elysia';
import { db } from './db';
import { userDetails, users } from './db/schema';
import jwt from '@elysiajs/jwt';
import { Avatar } from 'bits-ui';

const loginSchema = t.Object({
	email: t.String(),
	password: t.String()
});

const registerSchema = t.Object({
	email: t.String(),
	password: t.String()
});

export const auth = new Elysia().group('/auth', (auth) => {
	return auth
		.use(
			jwt({
				name: 'jwt',
				secret: 'mysecret'
			})
		)
		.post(
			'/login',
			async ({ body, jwt }) => {

				const { email, password } = body;

				const current = await db.query.users.findFirst({
					where: (users, { eq }) => eq(users.email, email)
				});

				if (!current) {
					return error(401, 'Invalid email or password');
				}

				const valid = await Bun.password.verify(password, current.passhash);

				let details = await db.query.userDetails.findFirst({
					where: (userDetails, { eq }) => eq(userDetails.userId, current.id)
				});

				if (!details) {
					await db.insert(userDetails).values({
						userId: current.id
					})
				}

				if (!valid) {
					return error(401, 'Invalid email or password');
				}

				const token = await jwt.sign({ id: current.id });

				return { token };
			},
			{ body: loginSchema }
		)
		.post(
			'/register',
			async ({ body }) => {
				const { email, password } = body;

				// hash password
				const passhash = await Bun.password.hash(password, {
					algorithm: 'bcrypt',
					cost: 4
				});

				const result = await db
					.insert(users)
					.values({
						email,
						passhash
					})
					.returning();



				if (result.length === 0) {
					return error(500, 'Failed to register user');
				}

				const details = await db.insert(userDetails).values({
					userId: result[0].id
				})

				return { id: result[0].id };
			},
			{ body: registerSchema }
		);
});

export const app = new Elysia({ prefix: '/api' }).use(auth);

export type App = typeof app;
