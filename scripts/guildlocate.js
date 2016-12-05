var guildname = window.location.search.split("name=")[1];
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=guildStats&command=" + guildname);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

    if (response.error == "Guild not found") {
      document.getElementById("main").innerHTML = "<br><h4 class=\"center-align\">Guild not found!</h4><br>";
      return
    }

    if (typeof response.prefix !== "undefined") {
      document.getElementsByTagName("title")[0].innerHTML = response.name + " Locator - WynnStats";
      document.getElementById("guildname").innerHTML = response.name + " (" + response.prefix + ")";
      document.getElementById("statslink").href = "guild?name=" + response.name;

      for (var player in response.members) {
        if (response.members.hasOwnProperty(player)) {
          p = response.members[player]
          if (typeof p.name !== "undefined") {
            if (document.getElementById(p.name + "row") == null) {
              document.getElementById("players").innerHTML += "<tr id='" + p.name + "row'><th><a class='orange-text' href='../player?name=" + p.name + "'>" + p.name + "</a></th><td id='" + p.name + "status'><span class='red-text'>• </span>Offline</td></tr>"
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
            if (document.getElementById(response[server][player] + "status") !== null) {
              document.getElementById(response[server][player] + "status").innerHTML = "<span class='green-text'>• </span>" + server;
            }
          }
        }
      }
    }
  }
  else if (xhr.readyState == 4 && xhr.status == 429) {
    document.getElementById("main").innerHTML = "<br><h4 class=\"center-align\">WynnCraft API Error!</h4><h5 class=\"center-align\">HTTP 429 - Too Many Requests!<br>Please try again later!</h5>";
  }
}

function toggleHideId(e) {
  if (document.getElementById(e).style.display == "") {
    document.getElementById(e).style.display = "none"
  }
  else {
    document.getElementById(e).style.display = ""
  }
}

function toggleHideClass(e) {
  for (var i in document.getElementsByClassName(e)) {
    if (document.getElementsByClassName(e).hasOwnProperty(i)) {
      j = eval(document.getElementsByClassName(e)[i])
      if (j.style.display == "") {
        j.style.display = "none"
      }
      else {
        j.style.display = ""
      }
    }
  }
}
