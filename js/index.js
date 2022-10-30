$(document).ready(function(){
    
    var blankRow = "<tr><td>Nothing to display</td></tr>";
    $("#myTable tbody").append(blankRow); //will add an ampty row every time the page reloads
    $("#btn btn-primary mb-2").click(function(){
        var btitle = $("#txt_field_book_title").val().trim();
        var byear = $("#txt_field_year_of_publication").val().trim();

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
