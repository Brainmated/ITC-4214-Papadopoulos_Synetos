

// wait for the document to fully load
$(document).ready(function() {

    var original_color;

    // hovering on navigation links makes them bold blue
    $("a.nav-link, a.nav-link dropdown-toggle, a.dropdown-item").hover(highlight, set_normal);

    function highlight() {
      original_color = this.style.color;
      $(this).css("color", "green");
      $(this).css("font-weight", "bold");
    }

    function set_normal() {
      $(this).css("color", original_color);
      $(this).css("font-weight", "normal");
    }
});
