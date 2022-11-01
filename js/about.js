
// wait for the document to fully load
$(document).ready(function() {

  // hovering on navigation links makes them bold
  $("a.nav-link, a.nav-link dropdown-toggle, a.dropdown-item").hover(set_font_bold, set_font_normal);
  
  // fade text in and out forever 
  setInterval(change_virtue, 2000);

  // card tab listener
  $("li.nav-item").click(animate_card);

  /**
   * Makes the font of an element bold.
   * 
   * @listens onmouseover
   */
  function set_font_bold() {
    $(this).css("font-weight", "bold");
  }

  /**
   * Makes the font of an element normal.
   * 
   * @listens onmouseout
   */
  function set_font_normal() {
    $(this).css("font-weight", "normal");
  }

  // text values for element with id "virtue"
  const virtues = ["courage", "empathy", "curiosity"];

  /**
   * Changes the text of the element with id "virtue".
   * 
   * The text changes sequentially through all values of array "virtues".
   */
  function set_next_virtue_text() {
    $('#virtue').text(virtues[i++]);
  }

  // index for "virtues" array
  var i = 0;

  /**
   * Fades in and out element with id "virtue".
   * 
   * @see setInterval
   * @fires set_next_virtue_text
   */
  function change_virtue() {
    $('#virtue').fadeOut(2000, set_next_virtue_text).fadeIn(2000);
    if (i == 3) i = 0;
  }

  // map "More" tab ids to card ids
  const more_tab_to_card = {
    "#alex_tab_more" : "#alex_card",
    "#orestis_tab_more" : "#orestis_card"
  };

  // map "Info" tab ids to card ids
  const info_tab_to_card = {
    "#alex_tab_info" : "#alex_card",
    "#orestis_tab_info" : "#orestis_card"
  };

  /**
   * Expands or contracts the selected card.
   * 
   * When the "More" ("Info") tab is clicked, the respective card expands (contracts).
   * 
   * @listens onclick
   */
  function animate_card() {
    id = "#" + $(this).attr("id");

    // expand
    for (const [key, value] of Object.entries(more_tab_to_card)) {
      if (id == key) {
        $(value).animate({width: "20em", fontSize: "1.2em"}, 1500);
      }
    }

    // contract (return to original size)
    for (const [key, value] of Object.entries(info_tab_to_card)) {
      if (id == key) {
        $(value).animate({width: "18em", fontSize: "1em"}, 1500);
      }
    }
  }
});
