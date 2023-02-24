import { env } from '$env/dynamic/public';

const request = async (method, headers, body) => {
	await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}`);
};
