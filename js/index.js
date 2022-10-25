$document.ready(function(){

    var blankRow = "<tr><td>Nothing to display</td></tr>";
    $("#myTable tbody").append(blankRow); //will add an ampty row every time the page reloads
    $("#regbtn").click(function(){
        var btitle = $("#bookTitle").val().trim();
        var byear = $("#bookYear").val().trim();

        if(btitle!="" && byear!=""){
            if($("#myTable tbody").children().childrent().length==1){
                $("#myTable tbody").html("");
            }
            var addRow = "<tr><td>"+btitle+"</td><td>"+byear+"</td><td><button class='rembtn'>Delete Row</button></td></tr>";

            $("#myTable tbody").append(addRow);
            $("#btitle").val("");
            $("#byear").val("");

            $("rembtn").click(function(){
                $(this).parent().parent().remove();

                if($("#myTable tbody").children().childrent().length==0){
                    $("#myTable tbody").append(blankRow);
                }
            });
        }
        else{
            alert("Error: Please provide inpute for all fields")
        }
    });
});