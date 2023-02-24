import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

    const categoryID = params.slug
    const response = await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/forums/categories/${categoryID}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            credentials: 'same-origin',
            'Content-Type': 'application/json'
        }
    }).catch((err) => {
        throw error(500, `${err}`)
    });

    if (!response.ok || response.status != 200) {
        throw error(404, 'Not Found!')
    };
    const data = await response.json();
    console.log(data)
    return data
}