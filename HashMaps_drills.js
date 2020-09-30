const HashMap = require('./hashmaps');

function main() {
    let lotr = new HashMap();
    lotr.MAX_LOAD_RATIO = .5
    lotr.SIZE_RATIO = 3
    lotr.set('Hobbit', 'Bilbo');
    lotr.set('Hobbit', 'Frodo');
    lotr.set('Wizard', 'Gandalf');
    lotr.set('Human', 'Aragorn');
    lotr.set('Elf', 'Legolas');
    lotr.set('Maiar', 'The Necromancer');
    lotr.set('Maiar', 'Sauron');
    lotr.set('RingBearer', 'Gollum');
    lotr.set('LadyOfLight', 'Galadriel');
    lotr.set('HalfElven', 'Arwen');
    lotr.set('Ent', 'Treebeard');
    console.log('Maiar key:', lotr.get('Maiar'))
    console.log('Hobbit key:', lotr.get('Hobbit'))
    console.log(lotr);
};

main();

//Print your hash map and notice the length and items that are hashed in your hash map. Have you hashed all the items you were asked to?
//No, we did not receive one of the hobbits and one of the maiars

//What are the values of Maiar and Hobbit that you have? Is there a discrepancy? Explain your answer.
//I got Sauron and Frodo, did not get the first values that I input for each

//What is the capacity of your hash table after you have hashed all the above items? Explain your answer.
//Capacity is now 8. It is 8 because it did not account for both hobbits, or maiars.

//2. WhatDoesThisDo
//DO NOT run the following code before solving the problem.

//What is the output of the following code? explain your answer.

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}
WhatDoesThisDo();

//Sets map1 hello world to 10, then to 20 because same key and returns 20 with console.log
//Sets map2 hello world to 20, then to 10 because of same

//3. Demonstrate understanding of Hash maps
//*You don't need to write code for the following two drills. use any drawing app or simple pen and paper *

//1) Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using 
//open addressing and a hash function k mod m, where k is the key and m is the length.

//2) Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions 
//resolved by separate chaining. Let the hash table have a length m = 9, and let the hash function be k mod m.

//4. Remove duplicates
//Implement a function to delete all duplicated characters in a string and keep only the first occurrence of each character. For example, if the 
//input is string “google”, the result after deletion is “gole”. Test your program with a sentence as well such as "google all that you think can think of".

const string = 'google all that you think can think of'
const string2 = 'google'
const duplicate = new HashMap();

for (let i = 0; i < string2.length; i++) {
  duplicate.set(string2[i], string2[i]);
}

console.log(duplicate);
let newStr = '';
duplicate._hashTable.forEach(letter => {
  newStr += letter.value;
});

console.log(newStr);

//5. Any permutation a palindrome
//Write an algorithm to check whether any anagram of some string is a palindrome. Given some string, "acecarr", the algorithm should return true, 
//because the letters in "acecarr" can be rearranged to the anagram "racecar", which itself is a palindrome. In contrast, given the word "north", 
//the algorithm should return false, because there's no anagram for "north" that would be a palindrome.

const palindrome = (string) => {
    const palindromeMap = new Map()
    let odd = 0
    for (let i = 0; i < string.length; i++) {
      if (palindromeMap.get(string[i]) === undefined) {
        palindromeMap.set(string[i], 1)
      }
      else {
        let char = palindromeMap.get(string[i])
        palindromeMap.set(string[i], char+=1)
      }
    }
    for (let i = 0; i < palindromeMap.size; i++) {
      if(palindromeMap.get(string[i]) % 2 !==0) {
        odd++
        console.log('odd', odd)
      }
      if(odd > 1) {
        return false
      }
    }
    return true
  }
  
  console.log(palindrome('north'));

//6. Anagram grouping
//Write an algorithm to group a list of words into anagrams. For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], the 
//output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].
const groupAnagrams = (strArr) => {
    const anagramMap = new Map()
    strArr.forEach((word) => {
      let sorted = alphabetize(word)
      if(anagramMap.has(sorted)) {
        anagramMap.get(sorted).push(word)
      }
      else {
        anagramMap.set(sorted, [word])
      }
    }) 
    return [...anagramMap.values()]
  }
  
  const alphabetize = word => {
    let alphebtized = word.split('').sort().join('')
    return alphebtized
  }
  
  console.log(groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))

//7. Separate Chaining
//Write another hash map implementation as above, but use separate chaining as the collision resolution mechanism.

//Test your hash map with the same values from the lotr hash map.
class Node {
    constructor( data ) {
      this.data = data
      this.next = null
    }
  }
  
  class HashMap {
    constructor(initialCapacity=8) {
      this.size = 0;
      this._hashTable = new Array(initialCapacity);
      this._capacity = initialCapacity;
      this._deleted = 0;
    }
  
    set(item) {
      let key = this._hashString(item)
      let node = new Node(item)
      if (this._hashTable[key]) {
        node.next = this._hashTable[key]
      }
      this._hashTable[key] = node
    }
  
    get(key) {
      let hash = this._hashString(key)
      if(!this._hashTable[hash]) return null
      let chain = this._hashTable[hash]
      if(chain.hasOwnProperty(key)) {
        return chain[key]
      }
      return null
    }
  
    remove(item) {
      let key = this._hashString(item)
      if (this._hashTable[key]) {
        if (this._hashTable[key].data === item) {
          this._hashTable[key] = this._hashTable[key].next
        } else {
          let current = this._hashTable[key].next
          let prev = this._hashTable[key]
          while(current) {
            if ( current.data === item ) {
              prev.next = current.next
            }
            prev = current
            current = current.next
          }
        }
      }
    }
    
    _hashString(string) {
      let hash = 5381;
      for (let i = 0; i < string.length; i++) {
          //Bitwise left shift with 5 0s - this would be similar to
          //hash*31, 31 being the decent prime number
          //but bit shifting is a faster way to do this
          //tradeoff is understandability
          hash = (hash << 5) + hash + string.charCodeAt(i);
          //converting hash to a 32 bit integer
          hash = hash & hash;
      }
      //making sure has is unsigned - meaning non-negtive number. 
      return hash >>> 0;
      }
    }