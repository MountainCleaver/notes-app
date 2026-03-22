const btn_add_note = document.getElementById("btn-add-note");

const modal = document.getElementById("modal-add-note");
const modal_title = document.getElementById("input-note-title");
const modal_content = document.getElementById("input-note-content");
const btn_modal_cancel = document.getElementById("btn-modal-cancel");
const btn_modal_submit = document.getElementById("btn-modal-submit");

const titles = document.getElementById("notes-list-items");

const note_title = document.getElementById("note-title");
const note_date = document.getElementById("note-date");
const note_content = document.getElementById("note-content");

const note_actions = document.getElementById("note-actions");

let first_load = true

get_notes();

async function get_notes() {
    const notes_url = "http://localhost/try-php/apis/notes_titles.php";
    try {
        const res = await fetch(notes_url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();

        console.log(data);
        if (!data.result) {
            throw new Error("Did not fetch data");
        }

        bind_notes(data);

        if (first_load) {
            bind_content(data.data[0]);
            first_load = false;
        }
    } catch (e) {
        console.error(e);
    }
}

async function get_content(id) {
    const content_url = `http://localhost/try-php/apis/notes_content.php?note_id=${id}`;

    try {
        const res = await fetch(content_url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        console.log(data);

        if (!data.result) {
            throw new Error("Did not fetch content");
        }

        bind_content(data.data);

    } catch (e) {
        console.error(e);
    }

}

async function insert_note(new_note) {
    const insert_url = "http://localhost/try-php/apis/add_note.php";

    try {
        const res = await fetch(insert_url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_note)
        });
        const data = await res.json();
        console.log(data);
        bind_new_note(data);
    } catch (e) {
        console.error(e);
    }

}

function bind_content(content_json) {
    note_title.textContent = "";
    note_date.textContent = "";
    note_content.textContent = "";
    note_actions.innerHTML = "";

    if (!content_json) {
        note_title.textContent = "There are no notes";
        note_actions.style.display = "none";
        return
    }

    note_actions.style.display = "flex";

    const edit_btn = document.createElement("button");
    edit_btn.id = `edit-${content_json.id}`;
    edit_btn.textContent = "Edit";
    note_actions.appendChild(edit_btn);

    const delete_btn = document.createElement("button");
    delete_btn.id = `delete-${content_json.id}`;
    delete_btn.textContent = "Delete";
    note_actions.appendChild(delete_btn);

    note_title.textContent = content_json.title;
    note_date.textContent = content_json.date;
    note_content.textContent = content_json.content;
}


function bind_notes(notes_json) {

    if (notes_json.data.length == 0) {
        const empty_title = document.createElement("h6");
        empty_title.textContent = "You have no notes.";
        titles.appendChild(empty_title);
    }

    notes_json.data.forEach(note => {
        const title_item = document.createElement("li");
        const title = document.createElement("h6");
        title.id = `note-${note.id}`;
        title.textContent = note.title;
        title_item.appendChild(title);
        titles.appendChild(title_item);
    });

}

function bind_new_note(new_note_json) {
    if (!new_note_json.data) {
        alert("something went wrong with binding new note");
    }

    const title_item = document.createElement("li");
    const title = document.createElement("h6");
    title.id = `note-${new_note_json.data.id}`;
    title.textContent = new_note_json.data.title;
    title_item.appendChild(title);
    titles.prepend(title_item );
    bind_content(new_note_json.data);
}


titles.addEventListener("click", e => {
    const li = e.target.closest("li");
    if (!li) return;

    const noteId = li.querySelector("h6").id.split("-")[1];
    console.log(`Pressed on Note ${noteId}`);
    get_content(noteId)
});

btn_add_note.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = "flex";
});

btn_modal_cancel.addEventListener('click', e => {
    e.preventDefault;
    console.log("clear inputs");
    modal_title.value = "";
    modal_content.value = "";
    modal.style.display = "none";
});

btn_modal_submit.addEventListener("click", e => {
    e.preventDefault();
    console.log("submit new note");
    console.log(modal_title.value);
    modal.style.display = "none";

    const new_note = {
        "title": modal_title.value,
        "content": modal_content.value
    }

    insert_note(new_note);
});



/* 


TODO: DELETE AND UPDATE

*/