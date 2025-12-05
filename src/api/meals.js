const BASE = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals';

export async function fetchMeals() {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error('Failed to load meals');
    return res.json();
}
