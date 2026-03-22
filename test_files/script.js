const button = document.getElementById("btn_get_dogs");
const table = document.getElementById("table_dogs");


button.addEventListener('click', get);

async function get() {
    const api_url = "http://localhost/try-php/test_files/api.php";

    try {

        const res = await fetch(api_url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!res) {
            throw new Error("Res error");
        }

        const data = await res.json();
        bind_data(data);
        console.log(data);

    } catch (e) {
        console.error(e);
    }
}

function bind_data(obj) {

    obj.data.forEach(el => {
        const table_row = document.createElement("tr");
        const table_data_id = document.createElement("td");
        const table_data_name = document.createElement("td");

        table_data_id.textContent = el.id;
        table_data_name.textContent = el.name;

        table_row.appendChild(table_data_id);
        table_row.appendChild(table_data_name);

        table.appendChild(table_row);
    });

}