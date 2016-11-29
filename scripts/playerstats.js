var playername = window.location.search.split("name=")[1];
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=playerStats&command=" + playername);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

    if (response.error == "Player not found") {
      document.getElementById("main").innerHTML = "<br><h4 class=\"center-align\">Player not found!</h4><br>";
      return
    }

    document.getElementsByTagName("title")[0].innerHTML = response.username + " - WynnStats";
    document.getElementById("username").innerHTML = response.username;
    document.getElementById("username1").innerHTML = response.username;
    document.getElementById("avatar").src = "https://visage.surgeplay.com/bust/350/" + response.username + ".png"

    if (response.tag != "") {
      document.getElementById("rank").innerHTML = response.rank + " (" + response.tag + ")";
      document.getElementById("rank1").innerHTML = response.rank + " (" + response.tag + ")";
    }
    else {
      document.getElementById("rank").innerHTML = response.rank;
      document.getElementById("rank1").innerHTML = response.rank;
    }

    if (response.guild.name != "None") {
      document.getElementById("guildname").innerHTML = response.guild.name;
      document.getElementById("guildrank").innerHTML = response.guild.rank;
      document.getElementById("guildlink").href = "guild?name=" + response.guild.name
      document.getElementById("guildname1").innerHTML = response.guild.name;
      document.getElementById("guildrank1").innerHTML = response.guild.rank;
      document.getElementById("guildlink1").href = "guild?name=" + response.guild.name
    }
    else {
      document.getElementById("guildinfo").innerHTML = "";
      document.getElementById("guildinfo1").innerHTML = "";
    }

    if (response.current_server != "null") {
      document.getElementById("c_server").innerHTML = "Currently Online: " + response.current_server;
    }

    document.getElementById("playtime").innerHTML = response.playtime + " minutes<br>≈ " + Math.round((response.playtime / 60) * 100) / 100 + " hours";
    document.getElementById("first_join").innerHTML = response.first_join_friendly;
    document.getElementById("last_join").innerHTML = response.last_join_friendly;
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
        var cur_stat_html = "<div class=\"row\"><div class=\"col s6 offset-s3\"><div class=\"card light-green lighten-5 hoverable\"><div class=\"card-content\"><div id='" + classname + "div'><h2 class='classtitle hoverpointer' onclick='toggleHideId(\"" + classname + "stats\")'>" + classname + "</h2><table id='" + classname + "stats' class='bordered' style='display: none;'><tr><tr><th style='vertical-align: text-top;'>Total Playtime</th><td>" + c.playtime + " minutes<br>≈ " + Math.round((c.playtime / 60) * 100) / 100 + " hours</td></tr><th>Level</th><td>" + c.level + "</td></tr><tr><th>XP</th><td>" + c.xp + "%</td></tr><tr onclick='toggleHideClass(\"" + classname + "skills\")' class='hoverpointer'><th>Skills</th><td>Click to Expand &#9660;</td></tr>"
        for (var skillname in c.skills) {
          if (c.skills.hasOwnProperty(skillname)) {
            cur_stat_html += "<tr class='" + classname + "skills light-green lighten-4' style='display: none;'><th>" + skillname + "</th><td>" + c.skills[skillname] + "</td></tr>"
          }
        }
        cur_stat_html += "<tr onclick='toggleHideClass(\"" + classname + "dungeons\")' class='hoverpointer'><th>Dungeons</th><td>" + c.dungeonsAmount + " &#9660;</td></tr>"
        for (var dungeonname in c.dungeons) {
          if (c.dungeons.hasOwnProperty(dungeonname)) {
            cur_stat_html += "<tr class='" + classname + "dungeons light-green lighten-4' style='display: none;'><th></th><td>" + dungeonname + " (" + c.dungeons[dungeonname] + ")</td></tr>"
          }
        }
        cur_stat_html += "<tr onclick='toggleHideClass(\"" + classname + "quests\")' class='hoverpointer'><th>Quests</th><td>" + c.questsAmount + " &#9660;</td></tr>"
        for (var questname in c.quests) {
          if (c.quests.hasOwnProperty(questname)) {
            cur_stat_html += "<tr class='" + classname + "quests light-green lighten-4' style='display: none;'><th></th><td>" + c.quests[questname] + "</td></tr>"
          }
        }
        document.getElementById("classdiv").innerHTML += cur_stat_html + "<tr><th>Mobs Killed</th><td>" + c.mobs_killed + "</td></tr><tr><th>PvP Kills</th><td>" + c.pvp_kills + "</td></tr><tr><th>PvP Deaths</th><td>" + c.pvp_deaths + "</td></tr><tr><th>Chests Found</th><td>" + c.chests_found + "</td></tr><tr><th>Logins</th><td>" + c.logins + "</td></tr><tr><th>Deaths</th><td>" + c.deaths + "</td></tr><tr><th>Events Won</th><td>" + c.events_won + "</td></tr></table></div></div></div></div></div></div>"
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
