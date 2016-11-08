var playername = window.location.search.split("name=")[1];
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=playerStats&command=" + playername);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

    if (response.error == "Player not found") {
      document.getElementsByClassName("main")[0].innerHTML = "<h1>WynnStats</h1><h1>Player not found!</h1>";
      return
    }

    document.getElementsByTagName("title")[0].innerHTML = response.username + " - WynnStats";
    document.getElementById("username").innerHTML = response.username;

    if (response.tag != "") {
      document.getElementById("rank").innerHTML = response.rank + " (" + response.tag + ")";
    }
    else {
      document.getElementById("rank").innerHTML = response.rank;
    }

    if (response.current_server != "null") {
      document.getElementById("c_server").innerHTML = "Currently Online: " + response.current_server;
    }

    document.getElementById("playtime").innerHTML = response.playtime + " minutes<br>≈ " + Math.round((response.playtime / 60) * 100) / 100 + " hours";
    document.getElementById("first_join").innerHTML = response.first_join_friendly;
    document.getElementById("last_join").innerHTML = response.last_join_friendly;
    document.getElementById("items_ided").innerHTML = response.global.items_identified;
    document.getElementById("mobs_killed").innerHTML = response.global.mobs_killed;
    document.getElementById("pvp_kills").innerHTML = response.global.pvp_kills;
    document.getElementById("pvp_deaths").innerHTML = response.global.pvp_deaths;
    document.getElementById("chests_found").innerHTML = response.global.chests_found;
    document.getElementById("logins").innerHTML = response.global.logins;
    document.getElementById("deaths").innerHTML = response.global.deaths;
    document.getElementById("total_level").innerHTML = response.global.total_level;

    for (var classname in response.classes) {
      if (response.classes.hasOwnProperty(classname)) {
        c = eval("response.classes." + classname)
         var cur_stat_html = "<div id='" + classname + "div'><h2 class='classtitle hoverpointer' onclick='toggleHideId(\"" + classname + "stats\")'>" + classname + "</h2><table id='" + classname + "stats' style='display: none;'><tr><th>Level</th><td>" + c.level + "</td></tr><tr><th>XP</th><td>" + c.xp + "%</td></tr><tr onclick='toggleHideClass(\"" + classname + "dungeons\")' class='hoverpointer'><th>Dungeons</th><td>" + c.dungeonsAmount + "</td></tr>"
        for (var dungeonname in c.dungeons) {
          if (c.dungeons.hasOwnProperty(dungeonname)) {
            cur_stat_html += "<tr class='" + classname + "dungeons' style='display: none;'><th></th><td>" + dungeonname + " (" + c.dungeons[dungeonname] + ")</td></tr>"
          }
        }
        cur_stat_html += "<tr onclick='toggleHideClass(\"" + classname + "quests\")' class='hoverpointer'><th>Quests</th><td>" + c.questsAmount + "</td></tr>"
        for (var questname in c.quests) {
          if (c.quests.hasOwnProperty(questname)) {
            cur_stat_html += "<tr class='" + classname + "quests' style='display: none;'><th></th><td>" + c.quests[questname] + "</td></tr>"
          }
        }
        document.getElementById("classdiv").innerHTML += cur_stat_html + "</table></div>"
      }
    }
    document.getElementById("classdiv").innerHTML += "<br><br><h3>Find another Player's Stats</h3><form action='player' method='get'><input type='text' name='name' placeholder='Username (Case Sensitive)'><input type='submit'></form><br><br>"
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
