// function returns an array of 4 digit hex strings representing each spell
function buf2hex24(buffer) {
  // buffer is an Uint16Array buffer

  //console.log(new Uint16Array(buffer));
  let hex = Array.prototype.map.call(new Uint16Array(buffer), (x) => {
    return x.toString(16).padStart(4, "0");
  });
  // console.log("hex: ", hex);
  // join into a string
  let str = hex.join("");
  // 0 padding
  while (str.length % 4 !== 0) {
    str += "0";
  }
  // split in groups of 16
  hex = str.match(/.{1,4}/g);

  return hex;
}

// encode a spell book into a unicode string
export function encodeSpellBook(book) {
  book = Array.from(book);
  let buff = new Uint16Array(book).buffer;
  // console.log("buf: ", buff);
  let buf16 = buf2hex24(buff);
  // onsole.log("16: ", buf16);
  let unicode = buf16.map((item) => String.fromCharCode("0x" + item));
  //console.log("to string: ", unicode);
  return unicode.join("");
}

// decode the unicode spell containing a spell book
export function decodeSpellBook(str) {
  // encoded str to char string arr
  let arr = str.split("").map((_, index) => {
    return str.charCodeAt(index).toString(16).padStart(3, "0");
  });
  // remove padding
  if (arr[arr.length - 1].length !== 3) {
    arr.pop();
  }
  // convert to int
  arr = arr.map((num) => parseInt(num, 16));
  // console.log(arr);
  return arr;
}

// saving the state of spell books to local storage after each update
export const saveToLocalStorage = (bookName, spellBook) => {
  if (spellBook.size === 0) {
    localStorage.removeItem(bookName);
  } else {
    let enc = encodeSpellBook(spellBook);
    localStorage.setItem(bookName, enc);
  }
};
