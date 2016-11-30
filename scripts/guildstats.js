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

    document.getElementsByTagName("title")[0].innerHTML = response.name + " - WynnStats";
    document.getElementById("guildname").innerHTML = response.name + " (" + response.prefix + ")";

    document.getElementById("created").innerHTML = response.createdFriendly;
    document.getElementById("level").innerHTML = response.level;
    document.getElementById("xp").innerHTML = response.xp + "%";
    document.getElementById("territories").innerHTML = response.territories;

    for (var player in response.members) {
      if (response.members.hasOwnProperty(player)) {
        p = response.members[player]
        if (typeof p.name !== "undefined") {
          if (document.getElementById(p.name + "stats") == null) {
            document.getElementById("memberdiv").innerHTML += "<div class=\"row\"><div class=\"col s6 offset-s3\"><div class=\"card light-green lighten-5 hoverable\"><div class=\"card-content\"><div id='" + p.name + "div'><div class='hoverpointer' onclick='toggleHideId(\"" + p.name + "stats\")'><img src='https://visage.surgeplay.com/face/100/" + p.name + ".png' class='circle deep-purple lighten-4 center-align hide-on-med-and-down')'/><h2 class='classtitle right'>" + p.name + "</h2></div><table class='bordered'><tbody id='" + p.name + "stats' style='display: none;'><tr><th>Rank</th><td class='classtitle'>" + p.rank.toLowerCase() + "</td></tr><th>XP Contributed</th><td>" + p.contributed + "</td></tr><tr><th>Joined</th><td>" + p.joinedFriendly + "</td></tr><tr><th colspan='2' style='text-align: center;'><a class='orange-text' href='player?name=" + p.name + "' target='_self'>View Player Stats</a></th></tr></tbody></table></div></div></div></div></div>"
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
