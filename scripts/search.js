function gotoStatsURL() {
  if ($("#searchbox")[0].value !== "") {
    if ($("#radp")[0].checked == true) {
      location.href = "./player?name=" + $("#searchbox")[0].value;
    }
    else {
      location.href = "./guild?name=" + $("#searchbox")[0].value;
    }
  }
  else {
    $("#searchbox").focus();
    $("#searchbox").addClass("invalid");
  }
}

function searchkeypress(event) {
  $("#searchbox").removeClass("invalid")
  if (event != null) {
    if (event.keyCode == 13) {
      $("#searchbtn").click();
    }
  }
}
