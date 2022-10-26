$(document).ready(function() {

    // orestis start
    const current_year = new Date().getFullYear();

    // set the max year of publication to be the current date
    $("#txt_field_year_of_publication").attr({
        max: get_current_year
    });

    function get_current_year() {
        return current_year;
    }

    // orestis end
    
    var blankRow = "<tr><td>Nothing to display</td></tr>";
    $("#myTable tbody").append(blankRow); //will add an ampty row every time the page reloads
    $("#regbtn").click(function(){
        var btitle = $("#bookTitle").val().trim();
        var byear = $("#bookYear").val().trim();

        if(btitle!="" && byear!=""){
            if($("#myTable tbody").children().children().length==1){
                $("#myTable tbody").html("");
            }
            var addRow = "<tr><td>"+btitle+"</td><td>"+byear+"</td><td><button class='rembtn' onclick='remove(this)'>Delete Row</button></td></tr>";

            $("#myTable tbody").append(addRow);
            $("#btitle").val("");
            $("#byear").val("");

            //rembtn function to remove the row and its contents
            
        }
        else{
            alert("Error: Please provide input for all fields")
        }
    });
});

function remove(elem){
    $(elem).parent().parent().remove();

    if($("#myTable tbody").children().children().length==0){
        var blankRow = "<tr><td>Nothing to display</td></tr>";
        $("#myTable tbody").append(blankRow);
    }
}
function sortTable(s) {
var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
table = document.getElementById("myTable");
switching = true;
// Set the sorting direction to ascending:
dir = "asc";
/* Make a loop that will continue until
no switching has been done: */
while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
    // Start by saying there should be no switching:
    shouldSwitch = false;
    /* Get the two elements you want to compare,
    one from current row and one from the next: */
    x = rows[i].getElementsByTagName("td")[n];
    y = rows[i + 1].getElementsByTagName("td")[n];
    /* Check if the two rows should switch place,
    based on the direction, asc or desc: */
    if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
        }
    } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
        }
    }
    }
    if (shouldSwitch) {
    /* If a switch has been marked, make the switch
    and mark that a switch has been done: */
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
    // Each time a switch is done, increase this count by 1:
    switchcount ++;
    } 
    else{
    /* If no switching has been done AND the direction is "asc",
    set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
            }
        }
    }
}