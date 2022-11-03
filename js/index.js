/**
 * This file is auxiliary to the 'index.html' file.
 * 
 * Allows to sort and reset the table, create and delete a row.
 * Animates input validation messages.
 * 
 * @course ITC4214 Internet Programming
 * @instructor Sofoklis Efremidis, Ph.D.
 * @assignment Midterm Coursework
 * @due_date November 4, 2022
 * @team_members Alexandros Synetos Konstadinidis, Orestis Papadopoulos
 * @author Orestis Papadopoulos
 */

// must be global; referenced in and out of $(document).ready
var current_year = new Date().getFullYear();

// store titles in a set since each title must be unique
var titles = new Set();

// called when the page has been loaded
$(document).ready(function () {

    // set the range for the publication year
    $("#txt_field_year_of_publication").attr({
        min : 1300, // year of first book publication ever
        max : current_year
    });
});

/**
 * Deletes all rows from the table, except from the headers.
 * 
 * @see update_visibility()
 * @listens onclick : btn_reset
 * @listens onclick : btn_confirm
 */
function reset_table() {
    var table_books = document.getElementById("tbl_books");
    var size = table_books.rows.length; // this must be declared outside the loop because row count changes

    for (var i = 1; i < size; i++) {
        // delete book titles from the set of titles
        titles.delete(table_books.rows[1].cells[1].innerText);
        table_books.rows[1].remove();
    }
    update_visibility();
}

/**
 * Bubble sorts the table of books according to the criteria specified by the user.
 * 
 * The criteria are the column by which to sort (book title or year of publication)
 * and the order, which can be increasing (A to Z) or decreasing (Z to A).
 * 
 * @see create_row()
 * @listens onclick : btn_add
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

        // to make the condition concise
        var A = sort_by_title, B = order_is_increasing;
        var C = this_title > next_title, D = this_title < next_title;
        var E = this_year > next_year, F = this_year < next_year;

        // this is the condition originally used
        // (A && ((B && C) || (!B && D))) || (!A && ((B && E) || (!B && F)))

        // simplify into multiple OR operations; URL: https://www.dcode.fr/boolean-expressions-calculator
        var do_swap = (A && B && C) || (A && !B && D) || (!A && B && E) || (!A && !B && F);

        // regardless of the sorting criteria, the operation is the same: swap titles and years
        if (do_swap) {
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
            i = 0; // reset the index; make it 0 not 1 (the loop will increment it to one)
        }
    }
}

/**
 * Sets the visibility of the table and of the message that
 * is displayed when the table is empty.
 * 
 * Makes the table visible only if there are entries in it.
 * Makes the message visible when the table is empty.
 * Enables the 'Reset' button when the table is not empty.
 * 
 * @see create_row()
 * @see delete_row()
 * @see reset_table()
 * @listens onclick : btn_add
 * @listens onclick : btn_delete
 */
function update_visibility() {
    const message_table_empty = document.getElementById("msg_tbl_empty");
    var btn_reset = document.getElementById("btn_reset");
    var table_books = document.getElementById("tbl_books");
    var size = table_books.rows.length;

    table_books.style.visibility = (size > 1) ? "visible" : "hidden";
    message_table_empty.style.visibility = (size > 1) ? "hidden" : "visible";
    btn_reset.disabled = (size > 1) ? false : true;
}

/**
 * Creates a new row at the end of the table.
 * 
 * Performs input validation, adds the data passed by
 * the user to the row, and then the table gets sorted.
 * 
 * @see sort_table()
 * @see update_visibility()
 * @listens onclick : btn_add
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
        $("#publication_year_help").text("Range: 1300 to " + current_year + " inclusive.");
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
    sort_table();
}

/**
 * Deletes the row whose 'Delete' button was clicked.
 * 
 * All rows under the one that will be deleted are re-indexed.
 * That is, their index is decremented by one.
 * 
 * @see update_visibility()
 * @listens onclick : 'Delete' button
 */
function delete_row() {
    // delete the book title corresponding to the deleted row from the set of titles
    // $(this) refers to the button, the first 'parent' refers to the cell, and the second to the row
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
