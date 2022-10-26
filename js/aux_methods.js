

// wait for the document to fully load
$(document).ready(function() {

    var original_color;
    var i = 0;
    const virtues = ["courage", "empathy", "curiosity"];

    // hovering on navigation links makes them bold black
    $("a.nav-link, a.nav-link dropdown-toggle, a.dropdown-item").hover(highlight, set_normal);

    function highlight() {
      original_color = this.style.color;
      $(this).css("color", "black");
      $(this).css("font-weight", "bold");
    }

    function set_normal() {
      $(this).css("color", original_color);
      $(this).css("font-weight", "normal");
    }

    // merge the following two and use if-else; reset the card when clicking "Info"
    $("#alex_more").click(function() {
      $("#alex_card").animate({
        // preserve the scale
        width: "100%",
        height: "100%",
        // increase font by 50% of the original
        fontSize: "1.5em",
      }, 1500 );
    });

    $("#orestis_more").click(function() {
      $("#orestis_card").animate({
        // preserve the scale
        width: "100%",
        height: "100%",
        // increase font by 50% of the original
        fontSize: "1.5em",
      }, 1500 );
    });

    function change_virtue() {
      $('#virtue').fadeOut(2000, set_next_virtue_text).fadeIn(2000);
      if (i == 3) i = 0;
    }

    function set_next_virtue_text() {
      $('#virtue').text(virtues[i++]);
    }

    setInterval(change_virtue, 2000);
});
