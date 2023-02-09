//code learned from tutorial:https://www.youtube.com/watch?v=o3MF_JmQxYg&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=8

const scoreTally = document.getElementById('scoreTally');
const mostRecentScore = localStorage.getItem('mostRecentScore');
scoreTally.innerText = mostRecentScore;