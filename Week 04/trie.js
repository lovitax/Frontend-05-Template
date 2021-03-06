const $ = Symbol('$');
class Trie {
    constructor() {
        this.root = Object.create(null);
    }
    insert(word) {
        let node = this.root;
        for (const item of word) {
            if (!node[item]) {
                node[item] = Object.create(null);
            }
            node = node[item];
        }
        if (node[$]) {
            node[$]++
        } else {
            node[$] = 1
        }
    }
    most() {
        let max = 0, maxWord = '';
        let visit = (node, p) => {
            if (node[$] && node[$] > max) {
                max = node[$]
                maxWord = p
            }
            for (const item in node) {
                visit(node[item], p + item)
            }
        }
        visit(this.root, '');
        console.log(maxWord, max)
    }
}
function randomWord(len) {
    let str = ''
    for (let i = 0; i < len; i++) {
        str += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt())
    }
    return str
}
function trieTest(len) {
    let trie = new Trie()
    for (let i = 0; i < len; i++) {
        trie.insert(randomWord(4))
    }
    return trie
}