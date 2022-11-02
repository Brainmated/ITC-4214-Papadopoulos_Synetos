$(document).ready(function() {
   
    $("th").hover(function() {
        var index = $(this).index();
        $("th.table-header, td").filter(":nth-child(" + (index+1) + ")").addClass("current-col");
        $("th.table-header").filter(":nth-child(" + (index+1) + ")").css("background-color","#9BCCD1")
    }, function() {
        var index = $(this).index();
        $("th.table-header, td").removeClass("current-col");
        $("th.table-header").filter(":nth-child(" + (index+1) + ")").css("background-color","#F5F5F5")
    });
}); 