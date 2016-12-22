var players = window.location.search.split("names=")[1].split("&").sort();
var xhr = new XMLHttpRequest();

$("title").html("Player Locator - WynnStats");

for (var player in players) {
  p = players[player]
  if ($("#" + p + "row").length == 0) {
    $("#players").append("<tr id='" + p + "row'><th><a class='orange-text' href='player?name=" + p + "'>" + p + "</a></th><td id='" + p + "status'><span class='red-text'>• </span>Offline</td></tr>")
  }
}
xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=onlinePlayers");
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

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
  else if (xhr.readyState == 4 && xhr.status == 429) {
    $("#main").html("<br><h4 class=\"center-align\">WynnCraft API Error!</h4><h5 class=\"center-align\">HTTP 429 - Too Many Requests!<br>Please try again later!</h5>");
    $("#loading_circle").fadeToggle("slow", function(){$("#loading_circle").remove(); $("main").fadeToggle("slow");});
  }
}
