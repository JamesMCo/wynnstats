var guildname = window.location.search.split("name=")[1];
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=guildStats&command=" + guildname);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

    if (response.error == "Guild not found") {
      $("#main").html("<br><h4 class=\"center-align\">Guild not found!</h4><br>");
      $("#loading_circle").fadeToggle("slow", function(){$("#loading_circle").remove(); $("main").fadeToggle("slow");});
      return
    }

    if (typeof response.prefix !== "undefined") {
      $("title").html(response.name + " Locator - WynnStats");
      $("#guildname").html(response.name + " (" + response.prefix + ")");
      $("#statslink").attr("href", "guild?name=" + response.name);

      for (var player in response.members) {
        if (response.members.hasOwnProperty(player)) {
          p = response.members[player]
          if (typeof p.name !== "undefined") {
            if ($("#" + p.name + "row").length == 0) {
              $("#players").append("<tr id='" + p.name + "row'><th><a class='orange-text' href='player?name=" + p.name + "'>" + p.name + "</a></th><td id='" + p.name + "status'><span class='red-text'>• </span>Offline</td></tr>")
            }
          }
        }
      }
      xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=onlinePlayers");
      xhr.send();
    }
    else {
      for (var server in response) {
        if (server !== "request") {
          for (var player in response[server]) {
            if ($("#" + response[server][player] + "status").length == 1) {
              $("#" + response[server][player] + "status").html("<span class='green-text'>• </span>" + server);
            }
          }
        }
      }
      $("#loading_circle").fadeToggle("slow", function(){$("#loading_circle").remove(); $("main").fadeToggle("slow");});
    }
  }
  else if (xhr.readyState == 4 && xhr.status == 429) {
    $("#main").html("<br><h4 class=\"center-align\">WynnCraft API Error!</h4><h5 class=\"center-align\">HTTP 429 - Too Many Requests!<br>Please try again later!</h5>");
    $("#loading_circle").fadeToggle("slow", function(){$("#loading_circle").remove(); $("main").fadeToggle("slow");});
  }
}
