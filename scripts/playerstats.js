var playername = window.location.search.split("name=")[1];
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=playerStats&command=" + playername);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false)

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    if (response.error == "Player not found") {
      document.getElementById("namerank").innerHTML   = "Player not found!"
      document.getElementById("stats").innerHTML      = ""
      return
    }
    document.getElementById("username").innerHTML     = response.username
    if (response.tag != "") {
      document.getElementById("rank").innerHTML       = response.rank + " (" + response.tag + ")"
    }
    else {
      document.getElementById("rank").innerHTML       = response.rank
    }
    if (response.current_server != "null") {
      document.getElementById("c_server").innerHTML   = "Currently Online: " + response.current_server
    }
    document.getElementById("playtime").innerHTML     = response.playtime + " minutes<br>≈ " + Math.round((response.playtime / 60) * 100) / 100 + " hours"
    document.getElementById("first_join").innerHTML   = response.first_join_friendly
    document.getElementById("last_join").innerHTML    = response.last_join_friendly
    document.getElementById("items_ided").innerHTML   = response.global.items_identified
    document.getElementById("mobs_killed").innerHTML  = response.global.mobs_killed
    document.getElementById("pvp_kills").innerHTML    = response.global.pvp_kills
    document.getElementById("pvp_deaths").innerHTML   = response.global.pvp_deaths
    document.getElementById("chests_found").innerHTML = response.global.chests_found
    document.getElementById("logins").innerHTML       = response.global.logins
    document.getElementById("deaths").innerHTML       = response.global.deaths
    document.getElementById("total_level").innerHTML  = response.global.total_level
  }
}
