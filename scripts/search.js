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

function autocomplete() {
  $("#acdd")[0].innerHTML = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.wynncraft.com/public_api.php?action=statsSearch&search=" + $("#searchbox")[0].value)
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);
  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.players != undefined) {
        var i = 0
        if (response.players.length != 0) {
          $("#acdd")[0].innerHTML += "<li class='collection-item disabled'>Players</li><li class='divider'></li>"
          for (var playername in response.players) {
            if (response.players.hasOwnProperty(playername)) {
              $("#acdd")[0].innerHTML += "<li class=\"collection-item avatar\" onclick=\"clickplayer('" + response.players[playername] + "');\"><img src='https://visage.surgeplay.com/face/100/" + response.players[playername] + ".png' class='circle deep-purple lighten-4'><span class='orange-text'>" + response.players[playername] + "</span></li>";
              i += 1;
              if (i == 10) {
                break;
              }
            }
          }
        }
      }
      if (response.guilds != undefined) {
        var i = 0
        if (response.guilds.length != 0) {
          $("#acdd")[0].innerHTML += "<li class='collection-item disabled'>Guilds</li><li class='divider'></li>"
          for (var guildname in response.guilds) {
            if (response.guilds.hasOwnProperty(guildname)) {
              $("#acdd")[0].innerHTML += "<li class=\"collection-item\" onclick=\"clickguild('" + response.guilds[guildname] + "');\"><span class='orange-text'>" + response.guilds[guildname] + "</span></li>";
              i += 1;
              if (i == 10) {
                break;
              }
            }
          }
        }
      }
    }
    $(".dropdown-button").dropdown(
      {
        constrain_width: false,
        hover: false,
        gutter: 2,
        belowOrigin: true,
        alignment: "right"
      }
    );
    $(".dropdown-button").dropdown("open");
  }
}

function clickplayer(name) {
  $("#searchbox")[0].value = name;
  $("#searchbox")[0].focus();
  $(".dropdown-button").dropdown("close");
  $("#radp").click();
}

function clickguild(name) {
  $("#searchbox")[0].value = name;
  $("#searchbox")[0].focus();
  $(".dropdown-button").dropdown("close");
  $("#radg").click();
}
