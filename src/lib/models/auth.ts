import { t } from 'elysia';

export const loginType = t.Object({
	email: t.String(),
	password: t.String()
});
