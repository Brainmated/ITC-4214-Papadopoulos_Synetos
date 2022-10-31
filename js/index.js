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
  
  var blankRow = "<tr><td></td></tr>";
  $("#myTable tbody").append(blankRow); //will add an ampty row every time the page reloads
  $("#add").click(function(){
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