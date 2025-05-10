async function latest_release(repo_name) {
  const response = await fetch(`https://api.github.com/repos/qlibs/${repo_name}/releases/latest`);
  const data = await response.json();
  return data.tag_name;
}

window.onload = function () {
  (async function update() {
    const response = await $.get('https://api.github.com/users/qlibs/repos');

    if (!Array.isArray(response) || !response.length) {
      return;
    }

    const filtered = response
      .filter(repo => {
        const name = repo.name.toLowerCase();
        return !(name.includes("github") || name.includes("qlibs"));
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const repo of filtered) {
      const repo_name = repo.name;
      const repo_description = repo.description || "";
      const repo_stars = repo.stargazers_count;
      const repo_forks = repo.forks;
      const repo_url = repo.html_url;
      const repo_release = await latest_release(repo_name).catch(() => "-");

      $("#repo-box").append(
        `<a href="${repo_url}">
          <div class='repo-item'>
            <h1 class='title'>${repo_name}</h1>
            <p class='description'>${repo_description}</p>
            <div class='star'><span class='img' uk-icon='star'></span> ${repo_stars}</div>
            <div class='fork'><span class='img' uk-icon='git-fork'></span> ${repo_release || '-'}</div>
          </div>
        </a>`
      );
    }
  })();
};
