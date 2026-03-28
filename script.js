const btn_add_note = document.getElementById("btn-add-note");

const modal = document.getElementById("modal-add-note");
const modal_title = document.getElementById("input-note-title");
const modal_content = document.getElementById("input-note-content");
const btn_modal_cancel = document.getElementById("btn-modal-cancel");
const btn_modal_submit = document.getElementById("btn-modal-submit");
const btn_modal_confirm = document.getElementById("btn-modal-confirm");

const titles = document.getElementById("notes-list-items");

const note_title = document.getElementById("note-title");
const note_date = document.getElementById("note-date");
const note_content = document.getElementById("note-content");

const note_actions = document.getElementById("note-actions");

let first_load = true

let current_note = null;

get_notes();

async function get_notes() { //gets all notes
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

        bind_notes(data); //displays all notes

        if (first_load) {
            bind_content(data.data[0]); //open first note on first load
            first_load = false;
        }
    } catch (e) {
        console.error(e);
    }
}

async function get_content(id) { //get contents of a selected note
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

        bind_content(data.data); //display selected note into main window

    } catch (e) {
        console.error(e);
    }

}

async function insert_note(new_note) { //add note
    const insert_url = "http://localhost/try-php/apis/add_note.php";

    try {
        const res = await fetch(insert_url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_note)
        });
        const data = await res.json();
        console.log(data);
        bind_new_note(data); //display new note on top of titles list
    } catch (e) {
        console.error(e);
    }

}

async function edit_note(editted_note) { //edit note
    const edit_url = "http://localhost/try-php/apis/edit_note.php";

    try {
        const res = await fetch(edit_url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editted_note)
        });
        const data = await res.json();
        console.log(data);

        modal.style.display = "none";

        bind_new_note(data, true); //put note on top, true is for editted note

        modal_title.textContent = "";
        modal_content.textContent = "";

    } catch (e) {
        console.error(e);
    }
}

async function delete_note(id) {
    const delete_url = "http://localhost/try-php/apis/delete_note.php";

    try {
        const res = await fetch(delete_url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id": id
            })
        });
        const data = await res.json();

        console.log(data.data.top_row);
        remove_note_from_list(id, data.data.top_row);

    } catch (e) {
        console.error(e);
    }
}


function bind_content(content_json) { //put note into the main content and put action buttons

    note_title.textContent = "";
    note_date.textContent = "";
    note_content.textContent = "";
    note_actions.innerHTML = "";

    if (content_json == null) {
        note_title.textContent = "There are no notes";
        note_actions.style.display = "none";
        return
    }

    current_note = content_json;

    note_actions.style.display = "flex";

    const edit_btn = document.createElement("button");
    edit_btn.id = `edit-${content_json.id}`;
    edit_btn.className = "btn btn-secondary";
    edit_btn.textContent = "Edit";
    note_actions.appendChild(edit_btn);

    const delete_btn = document.createElement("button");
    delete_btn.id = `delete-${content_json.id}`;
    delete_btn.className = "btn btn-danger";
    delete_btn.textContent = "Delete";
    note_actions.appendChild(delete_btn);

    note_title.textContent = content_json.title;
    note_date.textContent = content_json.date;
    note_content.textContent = content_json.content;
}


function bind_notes(notes_json) { //put notes in the list

    titles.innerHTML = "";

    if (notes_json.data.length == 0) {
        const empty_title = document.createElement("h6");
        empty_title.id = "empty-message";
        empty_title.textContent = "You have no notes.";
        titles.appendChild(empty_title);
        current_note = null;
        bind_content(null);
    }

    notes_json.data.forEach(note => {
        const title_item = document.createElement("li");
        title_item.id = `list-${note.id}`;
        const title = document.createElement("h6");
        title.id = `note-${note.id}`;
        title.textContent = note.title;
        const date = document.createElement("p");
        date.classList.add("date");
        date.textContent = note.date;
        title_item.appendChild(title);
        title_item.appendChild(date);
        titles.appendChild(title_item);
    });

}

function remove_note_from_list(id, new_content = null) {
    const li = document.getElementById(`list-${id}`);

    if (!li) return;

    const isCurrent = current_note && current_note.id == id;
    li.remove();

    if (titles.children.length === 0) {
        const empty_title = document.createElement("h6");
        empty_title.id = "empty-message";
        empty_title.textContent = "You have no notes.";
        titles.appendChild(empty_title);
        bind_content(null);
        return;
    }

    if (isCurrent) {
        if (new_content != null) {
            bind_content(new_content);
        } else {
            bind_content(null);
        }
    }
}

function bind_new_note(new_note_json, from_an_edit = false) { //put new note on top
    if (!new_note_json.data) {
        alert("something went wrong with binding new note");
    }

    const emptyMsg = document.getElementById("empty-message");
    if (emptyMsg) {
        emptyMsg.remove();
    }

    if (from_an_edit) { //remove edited note
        remove_note_from_list(new_note_json.data.id);
    }

    const title_item = document.createElement("li");
    title_item.id = `list-${new_note_json.data.id}`;
    const title = document.createElement("h6");
    title.id = `note-${new_note_json.data.id}`;
    title.textContent = new_note_json.data.title;
    const date = document.createElement("p");
    date.classList.add("date");
    date.textContent = new_note_json.data.date;

    title_item.appendChild(title);
    title_item.appendChild(date);

    titles.prepend(title_item);
    bind_content(new_note_json.data);
}

function edit_populate_modal() {
    modal_title.value = "";
    modal_content.value = "";

    modal_title.value = current_note.title;
    modal_content.value = current_note.content;

    btn_modal_confirm.style.display = "inline-block";
    btn_modal_submit.style.display = "none";
    modal.style.display = "flex";
}

titles.addEventListener("click", e => { //event list for selecting note
    const li = e.target.closest("li");
    if (!li) return;

    const noteId = li.querySelector("h6").id.split("-")[1];
    console.log(`Pressed on Note ${noteId}`);
    get_content(noteId)
});

btn_add_note.addEventListener('click', e => { //event for add note
    e.preventDefault();
    btn_modal_confirm.style.display = "none";
    btn_modal_submit.style.display = "inline-block";
    modal.style.display = "flex";
});

btn_modal_cancel.addEventListener('click', e => { //cancel and reset adding of modal
    e.preventDefault();
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

    modal_title.value = "";
    modal_content.value = "";
});

btn_modal_confirm.addEventListener("click", e => {
    e.preventDefault();
    const edited_note = {
        'id': current_note.id,
        'title': modal_title.value,
        'content': modal_content.value
    };
    edit_note(edited_note);

    modal_title.value = "";
    modal_content.value = "";
});

note_actions.addEventListener("click", e => {
    const btn = e.target.closest("button");

    if (!btn) {
        return;
    }

    if (btn.id.startsWith("edit-")) {
        const id = btn.id.split("-")[1];
        console.log("Edit note ", id);
        edit_populate_modal();
    }

    if (btn.id.startsWith("delete-")) {
        const id = btn.id.split("-")[1];
        console.log("Delete note ", id);
        delete_note(id);
    }

});