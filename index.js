$(document).ready(function(){

    $("#register").click(function(){

   
    /*
    $("#register").on("click",function(){
      
      var title=$("#bookTitle").val();
      var author=$("#author").val();
      
      var data=<tr><td>+title+</td>+
                      <td>+author</td></tr>;
      $("#myTable").append(data);
      
    });*/

        $("#tbody").append("<tr></tr>");
        $("tr").append("<td></td>");

        var l = $("bookTitle").length;

        $("#myTable") .empty();
        for(var i = 0; i<l; i+=1){
            $("td").append($("#bookTitle").val());
        } 

        $("#tbody").append("<tr></tr>");
        $("tr").append("<td></td>");

        var la = $("author").length;

        $("#myTable") .empty();
        for (var x = 0; x<la; x+=1){
            $("td").append($("#author").val());
        }
        
        /*$("#tbody").append("<tr></tr>");
        $("tr").append("<td></td>");
        $("td").append($("#bookTitle").val());*/
    });
    $("#myTable").on("click", "#remove", function(){
        var inRow = this.parentNode.parentNode.rowIndex;
        document.getElementById("myTable").deleteRow(inRow);
    });
    /*
    function removal(r){
        $(r).parents.("tr").remove();
    }
    */
});