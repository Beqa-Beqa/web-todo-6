// Generate subarrays for search purposes.
// If multiple words, split them by whitespace and return subarrays of each,
// summed up in one array.
export const genSubStrings = (str: string) => {
  const subStringsArray: string[][] = [];
  const splitWordsArray = str.split(" ");

  // Helper function precicely for this purpose. It will return substrings of one word.
  function helper(word: string) {
    const resultArray: string[] = [];
  
    for(let index = 1; index <= word.length; index++) {
      // We get the part of string from 0 to current index and transform to lower case.
      const subString = word.slice(0, index).toLowerCase();
      resultArray.push(subString);
    }
  
    return resultArray;
  }

  for(let oneWord of splitWordsArray) {
    // Substringarray will consist of substring arrays of total amount of words in "str".
    subStringsArray.push(helper(oneWord));
  }

  if(splitWordsArray.length > 1) {
    // After splitting all the words seperately, then we split first word + letters of second word (if exists) + letters of third word (if exists) and so on ...
    for(let index = str.indexOf(splitWordsArray[1][0]); index < str.length; index++) {
      // Start from index of first letter of second word.
      const subString = str.slice(0, index + 1);
      subStringsArray.push([subString.toLowerCase().trim()]);
    }
  }

  // We flatten and return substringarray so we will avoid nested arrays.
  return Array.from(new Set(subStringsArray.flat()));
}


// <---------------------------------------------------------------------------------------------------------->


// Combine two ids together. If one is bigger in length than another it will come first
// in concatenation, if they are equal in length then they will be sorted alphabetically
// and the first alphabet will come first.
export const combineIds = (id1: string, id2: string) => {
  if(id1.length > id2.length) {
    var combinedId = id1 + id2;
  } else if (id2.length > id1.length) {
    var combinedId = id2 + id1;
  } else {
    const sortedArray = [id1, id2].sort();
    var combinedId = sortedArray[0] + sortedArray[1];
  }

  return combinedId;
}


// <---------------------------------------------------------------------------------------------------------->


// Filter username for any whitespace, duplication, uppercase.
export const filterUsername = (str: string) => {
  // Transform to lowercase.
  const lowerCase = str.toLowerCase();
  // Trim any whitespaces.
  const trimmed = lowerCase.trim();
  // Split it without duplicate whitespaces, (OR WORD, I HOPE IT WON'T CAUSE A BUG).
  const splitted = Array.from(new Set(trimmed.split(" ")));
  // Join back together
  const joined = splitted.join(" ");

  return joined;
}


// <---------------------------------------------------------------------------------------------------------->


// Download image.
export const imageDownload = async (dwUrl: string, name: string) => {
  // Fetch image url and convert the response into a blob (binary large object).
  fetch(dwUrl).then(response => response.blob()).then(blob => {
    // window.URL.createObjectURL() is a method that creates a URL representing the Blob object passed to it.
    const url = window.URL.createObjectURL(new Blob([blob], {type: "image/jpeg"}));
    // Create anchor element (that is used for downloading data).
    const link = document.createElement("a");
    // Set it's url accordingly.
    link.href = url;
    // Set download attribute (which indicates that browser should proceed download, name is the name of downloaded file (name it whatever you want)).
    link.setAttribute("download", name);
    // Simulate click on the anchor tag.
    link.click();
  }).catch((err) => console.error(err));
}