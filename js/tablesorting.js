$(document).ready(function(){

    var sortOrder = 1; // flag to toggle the sorting order
    function getVal(elm, colIndex){
        var td = $(elm).children('td').eq(colIndex).text();
        if(typeof td !== "undefined"){
            var v = td.toUpperCase();
            if($.isNumeric(v)){
                v = parseInt(v,10);
            }
            return v;
        }
    }
    
    $(document).on('click', '.sortable', function(){
        var self = $(this);
        var colIndex = self.prevAll().length;
        var o = (sortOrder == 1) ? 'asc' : 'desc'; // you can use for css to show sort direction
        sortOrder *= -1; // toggle the sorting order
        
        $('.sortable').removeClass('asc').removeClass('desc');
        self.addClass(o);
    
        var tbody = self.closest("myTable").find("tbody");
        var tr = tbody.children("tr"); //.get();
    
        tr.sort(function(a, b) {
            var A = getVal(a, colIndex);
            var B = getVal(b, colIndex);
    
            if(A < B) {
                return -1*sortOrder;
            }
            if(A > B) {
                return 1*sortOrder;
            }
            return 0;
        });
    
        $.each(tr, function(index, row) {
            //console.dir(row)
            tbody.append(row);
        });
    
    });
    
});