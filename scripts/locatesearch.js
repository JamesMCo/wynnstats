function gotoLocateURL() {
  if ($("#locatebox").data().chips.length !== 0) {
    if ($("#lradp")[0].checked == true) {
      var concat = $("#locatebox").data().chips[0].tag;
      for (name in $("#locatebox").data().chips) {
        if (concat !== $("#locatebox").data().chips[name].tag) {
          concat += "&" + $("#locatebox").data().chips[name].tag
        }
      }
      location.href = "./playerlocate?names=" + concat;
    }
    else {
      location.href = "./guildlocate?name=" + $("#locatebox").data().chips[0].tag;
    }
  }
  else if ($("#" + $("#locatebox").children()[$("#locatebox").children().length - 1].id).val().length !== 0) {
    if ($("#lradp")[0].checked == true) {
      location.href = "./playerlocate?names=" + $("#" + $("#locatebox").children()[$("#locatebox").children().length - 1].id).val();
    }
    else {
      location.href = "./guildlocate?name=" + $("#" + $("#locatebox").children()[$("#locatebox").children().length - 1].id).val();
    }
  }
  else {
    $("#locatebox").focus();
    $("#locatebox").addClass("invalid");
  }
}
