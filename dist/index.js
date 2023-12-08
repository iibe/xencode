const LANGUAGES = {
    en_US: { size: 26, from: 97 },
    ru_RU: {
        size: 33,
        from: 1072,
        exceptions: [{ char: "ё", code: 6 }],
    },
};
export class Xencode {
    constructor(language = "en_US") {
        this.language = language;
        this.alphabet = this.stringifyAlphabet(this.language);
        this.alphalen = this.alphabet.length;
    }
    encode(message, command) {
        this.parseCommand(command).forEach(({ name, isLeft, number }) => {
            switch (name) {
                case "p":
                    message = this.pendulum(message, isLeft, number);
                    break;
                case "c":
                    message = this.caesar(message, isLeft, number);
                    break;
                case "t":
                    message = this.thinout(message, isLeft, number);
                    break;
            }
        });
        return message;
    }
    pendulum(message, fromStart, times) {
        if (message.length === 1)
            return message;
        if (message.length === 2) {
            return !fromStart && times % 2
                ? [...message].reverse().join("")
                : message;
        }
        const maxEvenLoop = message.length / 2 + 1;
        const maxOddLoop = Math.trunc(message.length / 2);
        if (times % 2) {
            if (times > maxOddLoop)
                times %= maxOddLoop;
        }
        else {
            if (times > maxEvenLoop)
                times %= maxEvenLoop;
        }
        let queue = [...message];
        for (let i = 0; i < times; i++) {
            const array = [];
            // TODO: use deque() (or doubly linked list) for most performance
            for (let j = 0; j < Math.round(queue.length / 2); j++) {
                array.push(fromStart ? queue[j] : queue[queue.length - 1 - j]);
                if (j < queue.length - 1 - j) {
                    array.push(fromStart ? queue[queue.length - 1 - j] : queue[j]);
                }
            }
            queue = array;
        }
        return queue.join("");
    }
    caesar(message, isMoveToLeft, shift) {
        if (message.length === 0)
            return message;
        const sign = isMoveToLeft ? -1 : 1;
        const chars = [...message];
        for (let i = 0; i < chars.length; i++) {
            const lowercaseChar = chars[i].toLowerCase();
            if (this.alphabet.includes(lowercaseChar)) {
                const index = this.alphabet.indexOf(lowercaseChar);
                const newIndex = (this.alphalen + index + sign * shift) % this.alphalen;
                const newChar = this.alphabet[newIndex];
                chars[i] = this.isUpperCaseChar(chars[i])
                    ? newChar.toUpperCase()
                    : newChar;
            }
        }
        return chars.join("");
    }
    thinout(message, isPushToLeft, each) {
        if (message.length === 0)
            return message;
        const chars = message.split("");
        // TODO: use deque() (or doubly linked list) for most performance
        const base = chars.filter((_, index) => (index + 1) % each);
        const eachNth = chars.filter((_, index) => !((index + 1) % each));
        isPushToLeft ? base.unshift(...eachNth.reverse()) : base.push(...eachNth);
        return base.join("");
    }
    stringifyAlphabet(language) {
        var _a;
        const { size, from, exceptions } = LANGUAGES[language];
        let alphabet = "";
        for (let chr = from; chr < from + size - ((_a = exceptions === null || exceptions === void 0 ? void 0 : exceptions.length) !== null && _a !== void 0 ? _a : 0); chr++) {
            alphabet += String.fromCharCode(chr);
        }
        exceptions === null || exceptions === void 0 ? void 0 : exceptions.forEach(({ char, code }) => {
            alphabet = this.insertChar(alphabet, char, code);
        });
        return alphabet;
    }
    parseCommand(command) {
        const regex = /[pct][lr]-[0-9]/gm;
        const match = command.match(regex);
        if (!match)
            return [];
        return match.map((chunk) => {
            const [lhs, rhs] = chunk.split("-", 2);
            return {
                name: lhs[0],
                isLeft: lhs[1] === "l",
                number: parseInt(rhs),
            };
        });
    }
    insertChar(string, char, position) {
        return string.slice(0, position) + char + string.slice(position);
    }
    isUpperCaseChar(char) {
        return char.length === 1 && char === char.toUpperCase();
    }
    set locale(language) {
        this.language = language;
        this.alphabet = this.stringifyAlphabet(this.language);
        this.alphalen = this.alphabet.length;
    }
}
export default new Xencode();
//# sourceMappingURL=index.js.map