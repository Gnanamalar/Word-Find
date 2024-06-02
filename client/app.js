// const wordSearchForm = document.getElementById('word-search-form');
// const copyBtn = document.getElementById('copy-btn');
// const wordAppBody = document.querySelector('.word-app-body');
// const wordListContainer = document.getElementById('word-list');
// const loadingSpinner = document.getElementById('spinner');
// let wordNotFound = true;

// const getInputWord = () => {
//     wordSearchForm.addEventListener('submit', (event) => {
//         event.preventDefault();
//         let searchWord = wordSearchForm.search_word.value;
//         fetchSynWords(searchWord);
//         wordAppBody.style.display = "none";
//     });
// }

// getInputWord();

// const fetchSynWords = async(searchWord) => {
//     let url = `https://api.datamuse.com/words?rel_syn=${searchWord}`;
//     try{
//         loadingSpinner.style.display = "flex";
//         let response = await fetch(url);
//         let fetchedData = await response.json();
//         loadingSpinner.style.display = "none";
//         renderWords(fetchedData);
//     } catch(error){
//         console.log(error);
//     }
// }

// const renderWords = (wordsArr) => {
//     let htmlCode;
//     if(wordsArr.length > 0){
//         wordNotFound = false;
//         htmlCode = wordsArr.map(word => {
//             return `<span class = "word-item"> ${word.word} </span>`;
//         });
//         wordListContainer.innerHTML = htmlCode.join("");
//     } else {
//         wordNotFound = true;
//         htmlCode = "No search results found!";
//         wordListContainer.innerHTML = htmlCode;
//     }
//     wordAppBody.style.display = "block";
// }

// const copyWordList = () => {
//     if(!wordNotFound){
//         let words = (wordListContainer.textContent).split(" ");
//         // removing the empty string element from the array
//         let filteredWords = words.filter(word => word.length !== 0);
//         // console.log(filteredWords);
//         let wordToCopy = filteredWords.join(", ");
//         navigator.clipboard.writeText(wordToCopy);
//     } else {
//         console.log("Nothing to copy");
//     }
// }

// copyBtn.addEventListener('click', copyWordList);




const wordSearchForm = document.getElementById('word-search-form');
const copyBtn = document.getElementById('copy-btn');
const wordAppBody = document.querySelector('.word-app-body');
const wordListContainer = document.getElementById('word-list');
const loadingSpinner = document.getElementById('spinner');
let wordNotFound = true;

const getInputWord = () => {
    wordSearchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let searchWord = wordSearchForm.search_word.value;
        fetchWords(searchWord);
        wordAppBody.style.display = "none";
    });
}

getInputWord();

const fetchWords = async(searchWord) => {
    let synonymsUrl = `https://api.datamuse.com/words?rel_syn=${searchWord}`;
    let antonymsUrl = `https://api.datamuse.com/words?rel_ant=${searchWord}`;

    try {
        loadingSpinner.style.display = "flex";

        let [synonymsResponse, antonymsResponse] = await Promise.all([
            fetch(synonymsUrl),
            fetch(antonymsUrl)
        ]);

        let synonymsData = await synonymsResponse.json();
        let antonymsData = await antonymsResponse.json();

        loadingSpinner.style.display = "none";
        renderWords(synonymsData, antonymsData);
    } catch (error) {
        console.log(error);
    }
}

const renderWords = (synonymsArr, antonymsArr) => {
    let htmlCode = '';

    if (synonymsArr.length > 0) {
        wordNotFound = false;
        htmlCode += '<h3>Synonyms</h3>';
        htmlCode += synonymsArr.map(word => {
            return `<span class="word-item"> ${word.word} </span>`;
        }).join("");
    }

    if (antonymsArr.length > 0) {
        wordNotFound = false;
        htmlCode += '<h3>Antonyms</h3>';
        htmlCode += antonymsArr.map(word => {
            return `<span class="word-item"> ${word.word} </span>`;
        }).join("");
    }

    if (synonymsArr.length === 0 && antonymsArr.length === 0) {
        wordNotFound = true;
        htmlCode = "No search results found!";
    }

    wordListContainer.innerHTML = htmlCode;
    wordAppBody.style.display = "block";
}

const copyWordList = () => {
    if (!wordNotFound) {
        let words = (wordListContainer.textContent).split(" ");
        let filteredWords = words.filter(word => word.length !== 0);
        let wordToCopy = filteredWords.join(", ");
        navigator.clipboard.writeText(wordToCopy);
    } else {
        console.log("Nothing to copy");
    }
}

copyBtn.addEventListener('click', copyWordList);
