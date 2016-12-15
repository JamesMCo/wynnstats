var playername = window.location.search.split("name=")[1];
var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=playerStats&command=" + playername);
xhr.send();

xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);

    if (response.error == "Player not found") {
      $("#main").html("<br><h4 class=\"center-align\">Player not found!</h4><br>");
      $("#loading_circle").fadeToggle("slow", function(){$("#loading_circle").remove(); $("main").fadeToggle("slow");});
      return
    }

    $("title").html(response.username + " - WynnStats");
    $("#username").html(response.username);
    $("#username1").html(response.username);
    $("#avatar").attr("src", "https://visage.surgeplay.com/bust/350/" + response.username + ".png");

    if (response.tag != "") {
      $("#rank").html(response.rank + " (" + response.tag + ")");
      $("#rank1").html(response.rank + " (" + response.tag + ")");
    }
    else {
      $("#rank").html(response.rank);
      $("#rank1").html(response.rank);
    }

    if (response.guild.name != "None") {
      $("#guildname").html(response.guild.name);
      $("#guildrank").html(response.guild.rank);
      $("#guildlink").attr("href", "guild?name=" + response.guild.name);
      $("#guildname1").html(response.guild.name);
      $("#guildrank1").html(response.guild.rank);
      $("#guildlink1").attr("href", "guild?name=" + response.guild.name);
    }
    else {
      $("#guildinfo").remove();
      $("#guildinfo1").remove();
    }

    if (response.current_server != "null") {
      $("#c_server").html("Currently Online: " + response.current_server);
    }

    $("#playtime").html(response.playtime + " minutes<br>≈ " + Math.round((response.playtime / 60) * 100) / 100 + " hours");
    $("#first_join").html(response.first_join_friendly);
    $("#last_join").html(response.last_join_friendly);
    $("#mobs_killed").html(response.global.mobs_killed);
    $("#pvp_kills").html(response.global.pvp_kills);
    $("#pvp_deaths").html(response.global.pvp_deaths);
    $("#chests_found").html(response.global.chests_found);
    $("#logins").html(response.global.logins);
    $("#deaths").html(response.global.deaths);
    $("#total_level").html(response.global.total_level);

    for (var classname in response.classes) {
      if (response.classes.hasOwnProperty(classname)) {
        c = eval("response.classes." + classname);
        var cur_stat_html = "<div class=\"row\"><div class=\"col s6 offset-s3\"><div class=\"card light-green lighten-5 hoverable\"><div class=\"card-content\"><div id='" + classname + "div'><h2 class='classtitle hoverpointer' onclick='$(\"#" + classname + "stats\").toggle()'>" + classname + "</h2><table id='" + classname + "stats' class='bordered' style='display: none;'><tr><tr><th style='vertical-align: text-top;'>Total Playtime</th><td>" + c.playtime + " minutes<br>≈ " + Math.round((c.playtime / 60) * 100) / 100 + " hours</td></tr><th>Level</th><td>" + c.level + "</td></tr><tr><th>XP</th><td>" + c.xp + "%</td></tr><tr onclick='$(\"." + classname + "skills\").toggle()' class='hoverpointer'><th>Skills</th><td>Click to Expand &#9660;</td></tr>";
        for (var skillname in c.skills) {
          if (c.skills.hasOwnProperty(skillname)) {
            cur_stat_html += "<tr class='" + classname + "skills light-green lighten-4' style='display: none;'><th>" + skillname + "</th><td>" + c.skills[skillname] + "</td></tr>";
          }
        }
        cur_stat_html += "<tr onclick='$(\"." + classname + "dungeons\").toggle()' class='hoverpointer'><th>Dungeons</th><td>" + c.dungeonsAmount + " &#9660;</td></tr>";
        for (var dungeonname in c.dungeons) {
          if (c.dungeons.hasOwnProperty(dungeonname)) {
            cur_stat_html += "<tr class='" + classname + "dungeons light-green lighten-4' style='display: none;'><th></th><td>" + dungeonname + " (" + c.dungeons[dungeonname] + ")</td></tr>";
          }
        }
        cur_stat_html += "<tr onclick='$(\"." + classname + "quests\").toggle()' class='hoverpointer'><th>Quests</th><td>" + c.questsAmount + " &#9660;</td></tr>"
        for (var questname in c.quests) {
          if (c.quests.hasOwnProperty(questname)) {
            cur_stat_html += "<tr class='" + classname + "quests light-green lighten-4' style='display: none;'><th></th><td>" + c.quests[questname] + "</td></tr>";
          }
        }
        $("#classdiv").append(cur_stat_html + "<tr><th>Mobs Killed</th><td>" + c.mobs_killed + "</td></tr><tr><th>PvP Kills</th><td>" + c.pvp_kills + "</td></tr><tr><th>PvP Deaths</th><td>" + c.pvp_deaths + "</td></tr><tr><th>Chests Found</th><td>" + c.chests_found + "</td></tr><tr><th>Logins</th><td>" + c.logins + "</td></tr><tr><th>Deaths</th><td>" + c.deaths + "</td></tr><tr><th>Events Won</th><td>" + c.events_won + "</td></tr></table></div></div></div></div></div></div>");
      }
    }
    $("#loading_circle").fadeToggle("slow", function(){$("#loading_circle").remove(); $("main").fadeToggle("slow");});
  }
  else if (xhr.readyState == 4 && xhr.status == 429) {
    $("#main").html("<br><h4 class=\"center-align\">WynnCraft API Error!</h4><h5 class=\"center-align\">HTTP 429 - Too Many Requests!<br>Please try again later!</h5>");
    $("main").fadeToggle("slow");
    $("#loading_circle").fadeToggle("slow", function(){$("#loading_circle").remove(); $("main").fadeToggle("slow");});
  }
}
