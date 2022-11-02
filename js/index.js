// must be global; referenced in and out of $(document).ready
var current_year = new Date().getFullYear();

$(document).ready(function () {

    const message_table_empty = document.getElementById("msg_tbl_empty");
    $("#txt_field_year_of_publication").attr({
        min : 1300, // year of first book publication ever
        max : current_year
    });
});

/**
 * @see end of create_row()
 * @listens onchange : select_sort_by
 * @listens onchange : select_order
 */
function sort_table() {
    // change the options in <select> "Order" with respect to what is selected in the <select> "Sort by"
    var select_sort_by = document.getElementById("select_sort_by");
    var select_order = document.getElementById("select_order");

    switch (select_sort_by.options[select_sort_by.selectedIndex].value) {
        case "Book Title":
            select_order.options[0].innerText = "A to Z";
            select_order.options[1].innerText = "Z to A";
            break;
        case "Year of Publication":
            select_order.options[0].innerText = "Increasing";
            select_order.options[1].innerText = "Decreasing";
            break;
    }

    // bubble sort
    var sort_by_title = (select_sort_by.selectedIndex == 0) ? true : false;
    var order_is_increasing = (select_order.selectedIndex == 0) ? true : false;
    var table_books = document.getElementById("tbl_books");

    // see at the end the condition to break the loop
    for (var i = 1, swaps_in_this_iteration = 0; true; i++) {       

        var this_title = table_books.rows[i].cells[1].innerText;
        var next_title = table_books.rows[i + 1].cells[1].innerText;

        var this_year = table_books.rows[i].cells[2].innerText;
        var next_year = table_books.rows[i + 1].cells[2].innerText;     

        if ((sort_by_title && ((order_is_increasing && this_title > next_title) || (!order_is_increasing && this_title < next_title))) ||
            (!sort_by_title && ((order_is_increasing && this_year > next_year) || (!order_is_increasing && this_year < next_year)))) {
            
            // swap titles
            table_books.rows[i].cells[1].innerText = next_title;
            table_books.rows[i + 1].cells[1].innerText = this_title;
            // swap years
            table_books.rows[i].cells[2].innerText = next_year;
            table_books.rows[i + 1].cells[2].innerText = this_year;
            swaps_in_this_iteration++;  
        } 

        // check if all rows have been iterated
        if (i == table_books.rows.length - 2) {
            if (swaps_in_this_iteration == 0) break; // no swaps were performed; table is sorted
            swaps_in_this_iteration = 0; // reset the swap counter
            i = 1; // reset the index
        }
    }
}

function update_visibility() {
    tbl_books.style.visibility = (tbl_books.rows.length > 1) ? "visible" : "hidden";
    msg_tbl_empty.style.visibility = (tbl_books.rows.length > 1) ? "hidden" : "visible";
}

// store titles in a set since each title must be unique
var titles = new Set();

/**
 * 
 * 
 * @listens click : btn_add
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

    var table_books = document.getElementById("tbl_books");
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
    index_cell.className = "class_index";
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
    sort_table();
}

function delete_row() {
    // delete the book title corresponding to the deleted row from the set of titles
    // $(this) refers to the delete button that was clicked
    // the first 'parent' references the cell, and the second the row
    titles.delete($(this).parent().parent().children().eq(1).text());

    // index of row to be deleted
    var index = Number($(this).parent().parent().children().eq(0).text());

    // re-index the rows below the one that was deleted
    var table_books = document.getElementById("tbl_books");
    for (var i = index; i < table_books.rows.length - 1; i++) {
        table_books.rows[i + 1].cells[0].innerText = i;
    }

    // delete row
    $(this).parent().parent().remove();
    update_visibility();
}
