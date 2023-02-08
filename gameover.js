const scoreTally = document.getElementById('scoreTally');
const mostRecentScore = localStorage.getItem('mostRecentScore');
scoreTally.innerText = mostRecentScore;