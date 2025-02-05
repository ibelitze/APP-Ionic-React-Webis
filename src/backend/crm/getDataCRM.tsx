
export default async function GetAllCRM() {

    const headers = {
        accept: 'application/json',
        "Content-Type": 'application/json',
    };

    const response = await fetch('http://localhost:8000/crm/getdata', {
        method: "GET",
        headers,
    });

    if (response) {
        const json = await response.json();
        return json;
    }

    return false;
}