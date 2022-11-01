// must be global; referenced in and out of $(document).ready
var current_year = new Date().getFullYear();

$(document).ready(function () {

    const message_table_empty = document.getElementById("msg_tbl_empty");
    $("#txt_field_year_of_publication").attr({
        min : 1300, // year of first book publication ever
        max : current_year
    });
});

function update_visibility() {
    tbl_books.style.visibility = (tbl_books.rows.length > 1) ? "visible" : "hidden";
    msg_tbl_empty.style.visibility = (tbl_books.rows.length > 1) ? "hidden" : "visible";
}

// store titles in a set since each title must be unique
var titles = new Set();

/**
 * 
 * 
 * @listens click:btn_add
 */
function create_row() {

    // if the user does not see the help message and clicks "Add" again, flash the text to draw attention
    if ($("#book_title_help").text() != "") {
        $("#book_title_help").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }

    if ($("#publication_year_help").text() != "") {
        $("#publication_year_help").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    }

    // reset the help texts
    $("#book_title_help").text("");
    $("#publication_year_help").text("");

    const table_books = document.getElementById("tbl_books");
    var year = document.getElementById("txt_field_year_of_publication");
    var title = document.getElementById("txt_field_book_title");

    // start of input validation; hints are shown under the respective textbox

    // validate book title; do not allow duplicate titles since you do not have enough attributes to differentiate
    if (titles.has(title.value)) {
        $("#book_title_help").text("Book with title \"" + title.value + "\" already exists in the table.");
        return;
    }

    // do not accept titles with no letters
    var regex_any_letter = /[a-zA-Z]/g;
    if (!regex_any_letter.test(title.value)) {
        $("#book_title_help").text("Book titles must have letters.");
        return;
    }

    // do not accept titles starting with space(s)
    var regex_start_with_space = /^\s/;
    if (regex_start_with_space.test(title.value)) {
        $("#book_title_help").text("Book titles cannot start with space(s).");
        return;
    }

    // do not accept titles ending with space(s)
    var regex_end_with_space = /\s$/;
    if (regex_end_with_space.test(title.value)) {
        $("#book_title_help").text("Book titles cannot end with space(s).");
        return;
    }

    // validate publication year
    if (year.value < 1300 || year.value > current_year) {
        $("#publication_year_help").text("Year of publication range: 1300 to " + current_year + " inclusive.");
        return;
    }

    // end of input validation
    
    titles.add(title.value);
    var row = table_books.insertRow();
    row.style = "vertical-align : middle;"; // I do not know how to reference the row in css
    var index_cell = row.insertCell(0);
    var title_cell = row.insertCell(1);
    var year_cell = row.insertCell(2);
    var btn_delete_cell = row.insertCell(3);

    index_cell.innerText = table_books.rows.length - 1; // header row counts as row
    title_cell.innerText = title.value;
    year_cell.innerText = year.value;

    // create a delete button
    const btn_delete = document.createElement("button");
    btn_delete.innerText = "Delete";
    btn_delete.type = "button"
    btn_delete.className = "btn btn-danger mb-2";
    btn_delete.onclick = delete_row; // no parentheses!!!
    btn_delete_cell.append(btn_delete);
    update_visibility();
}

/**
 * 
 */
function delete_row() {
    // the first 'parent' references the cell, and the second the row
    // delete the book title corresponding to the deleted row from the set of titles 
    titles.delete($(this).parent().parent().children().eq(1).text());

    // update the indices of the elements after the deleted row
    // index of row to be deleted
    var index = Number($(this).parent().parent().children().eq(0).text());



    // remove row
    $(this).parent().parent().remove();
    update_visibility();
}
