var guildname = window.location.search.split("name=")[1];
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=guildStats&command=" + guildname);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

    if (response.error == "Guild not found") {
      document.getElementsByClassName("main")[0].innerHTML = "<h1>WynnStats</h1><h1>Guild not found!</h1><br><br><h3>Find Another Guild's Stats</h3><form action='guild' method='get'><input type='text' name='name' placeholder='Guild Name (Case Sensitive)'><input type='submit'></form><br><br>";
      return
    }

    document.getElementsByTagName("title")[0].innerHTML = response.name + " - WynnStats";
    document.getElementById("guildname").innerHTML = response.name + " (" + response.prefix + ")";

    document.getElementById("created").innerHTML = response.createdFriendly;
    document.getElementById("level").innerHTML = response.level;
    document.getElementById("xp").innerHTML = response.xp;
    document.getElementById("territories").innerHTML = response.territories;

    for (var player in response.members) {
      if (response.members.hasOwnProperty(player)) {
        p = response.members[player]
        if (typeof p.name !== "undefined") {
          if (document.getElementById(p.name + "stats") == null) {
            document.getElementById("memberdiv").innerHTML += "<div id='" + p.name + "div'><h2 class='classtitle hoverpointer' onclick='toggleHideId(\"" + p.name + "stats\")'>" + p.name + "</h2><table id='" + p.name + "stats' style='display: none;'><tr><th>Rank</th><td class='classtitle'>" + p.rank.toLowerCase() + "</td></tr><th>XP Contributed</th><td>" + p.contributed + "</td></tr><tr><th>Joined</th><td>" + p.joinedFriendly + "</td></tr><tr class='hoverpointer' onclick='window.open(\"player?name=" + p.name + "\", \"_self\")'><th colspan='2' style='text-align: center;'>View Player Stats</th></tr></table></div>"
          }
        }
      }
    }
    document.getElementById("memberdiv").innerHTML += "<br><br><h3>Find Another Guild's Stats</h3><form action='guild' method='get'><input type='text' name='name' placeholder='Guild Name (Case Sensitive)'><input type='submit'></form><br><br>"
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
