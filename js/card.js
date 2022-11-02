const image = document.querySelector(".image");
const username = document.querySelector(".username");
const numberRepos = document.querySelector(".numberRepos");
const numberGists = document.querySelector(".numberGists");
const numberFollowers = document.querySelector(".numberFollowers");
const bio = document.querySelector(".bio");
const loader = document.querySelector(".loader");

const url = "https://api.github.com/users/agustinamestre";
const getGitHubData = async () => {
  const data = await fetch(url).then((res) =>
    res
      .json()
      .then((data) => (obj = data))
      .catch((err) => console.log(err))
  );
  return data;
};

const set = async () => {
  const data = await getGitHubData();

  image.src = data.avatar_url;
  username.innerHTML = data.name;
  numberRepos.innerText = data.public_repos;
  numberFollowers.innerText = data.followers;
  numberGists.innerText = data.public_gists;
  bio.innerText = data.bio;

  loader.style.visibility = "hidden";
};

set();
