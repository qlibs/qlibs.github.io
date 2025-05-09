// -------------------------------------------
//   Author: Seyon Rajagopal
//   Copyright (c) 2022 Seyon Rajagopal
// -------------------------------------------

async function latest_release(repo_name) {
  const response = await fetch(`https://api.github.com/repos/qlibs/${repo_name}/releases/latest`);
  const data = await response.json();
  return data.tag_name;
}

window.onload = function () {
  var request = $.get('https://api.github.com/users/qlibs/repos', function () { })
    .done(function () {
        request = request.responseJSON;
        if (!Array.isArray(request) || !request.length) {
            $("#repo-box").append("<div class='error-box'><h1 class='error-msg'> Sorry the GitHub username entered has no repos or does't exist </h1></div>");
        }
        else {
          for (i = 0; i < request.length; i++) {
            const repo_name = request[i].name;
            if (repo_name.includes("github.io")) continue;
            if (repo_name.includes("qlibs")) continue;
            if (repo_name.includes(".github")) continue;
            const repo_url = request[i].html_url;
            const repo_description = request[i].description;
            const repo_stars = request[i].stargazers_count;
            const repo_forks = request[i].forks;
            latest_release(repo_name).then(repo_release => {
              $("#repo-box").append("<a href='" + repo_url + "'><div class='repo-item'><h1 class='title'>" +
                  "" +
                  repo_name + "</h1> <div style='color:darkgray'> (" + repo_release + ") </div><p class='description'>" +
                  repo_description +
                  "<div class='star'><span class='img' uk-icon='star' class='uk-icon'></span>" +
                  repo_stars + "</div><div class='fork'><span class='img' uk-icon='git-fork' class='uk-icon'></span>" +
                  repo_forks + "</div></div></div>" +
                  "</p>"
                );
            })
          }
        }
    });
}
