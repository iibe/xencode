declare namespace xencode {
  /**
   * - p (stands for _pendulum_) - pendulum
   * - c (stands for _caeras_) - simple [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher);
   * - t (stands for _thinout_) - moves each **nth** letter to the start (or the end) of string
   */
  type ActionName = "p" | "c" | "t";

  interface Action {
    name: ActionName;
    isLeft: boolean;
    number: number;
  }

  type LanguageNames = "en_US" | "ru_RU";

  type LanguageProps = {
    // Real alphabet size (with exceptions).
    size: number;

    // Starting point in form of UTF-16 code unit.
    from: number;

    // Set of specific symbols that is out [from, from + size] range.
    exceptions?: Array<{
      char: string;
      code: number;
    }>;
  };

  type Languages = Record<LanguageNames, LanguageProps>;
}

interface IXencode {
  /**
   * @param {string} message - Initial message.
   * @param {boolean} fromStart - If true, then start moving from the first character, otherwise start from the last character.
   * @param {number} times - Number of repetitions.
   * @return {string}
   */
  pendulum(message: string, fromStart: boolean, times: number): string;

  /**
   * @param {string} message - Initial message.
   * @param {boolean} isMoveToLeft - Set shift direction.
   * @param {number} shift - Character shift number.
   * @return {string}
   */
  caesar(message: string, isMoveToLeft: boolean, shift: number): string;

  /**
   * @param {string} message - Initial message.
   * @param {boolean} isPushToLeft - If true, then add each Nth element to the start of message, otherwise push element pack.
   * @param {number} each - Takes each Nth element for string.
   * @return {string}
   */
  thinout(message: string, isPushToLeft: boolean, each: number): string;
}

const LANGUAGES: xencode.Languages = {
  en_US: { size: 26, from: 97 },
  ru_RU: {
    size: 33,
    from: 1072,
    exceptions: [{ char: "ё", code: 6 }],
  },
};

export class Xencode implements IXencode {
  private alphabet: string = this.stringifyAlphabet(this.language);
  private alphalen: number = this.alphabet.length;

  constructor(private language: xencode.LanguageNames = "en_US") {}

  encode(message: string, command: string): string {
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

  pendulum(message: string, fromStart: boolean, times: number): string {
    if (message.length === 1) return message;

    if (message.length === 2) {
      return !fromStart && times % 2
        ? [...message].reverse().join("")
        : message;
    }

    const maxEvenLoop = message.length / 2 + 1;
    const maxOddLoop = Math.trunc(message.length / 2);

    if (times % 2) {
      if (times > maxOddLoop) times %= maxOddLoop;
    } else {
      if (times > maxEvenLoop) times %= maxEvenLoop;
    }

    let queue = [...message];

    for (let i = 0; i < times; i++) {
      let array: string[] = [];

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

  caesar(message: string, isMoveToLeft: boolean, shift: number): string {
    if (message.length === 0) return message;

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

  thinout(message: string, isPushToLeft: boolean, each: number): string {
    if (message.length === 0) return message;

    const chars = message.split("");

    // TODO: use deque() (or doubly linked list) for most performance
    const base = chars.filter((_, index) => (index + 1) % each);
    const eachNth = chars.filter((_, index) => !((index + 1) % each));

    isPushToLeft ? base.unshift(...eachNth.reverse()) : base.push(...eachNth);

    return base.join("");
  }

  private stringifyAlphabet(language: xencode.LanguageNames): string {
    const { size, from, exceptions } = LANGUAGES[language];

    let alphabet: string = "";

    for (let chr = from; chr < from + size - (exceptions?.length ?? 0); chr++) {
      alphabet += String.fromCharCode(chr);
    }

    exceptions?.forEach(({ char, code }) => {
      alphabet = this.insertChar(alphabet, char, code);
    });

    return alphabet;
  }

  private parseCommand(command: string): xencode.Action[] {
    const regex: RegExp = /[pct][lr]-[0-9]/gm;
    const match = command.match(regex);

    if (!match) return [];

    return match.map((chunk) => {
      const [lhs, rhs] = chunk.split("-", 2);

      return {
        name: lhs[0] as xencode.ActionName,
        isLeft: lhs[1] === "l",
        number: parseInt(rhs),
      };
    });
  }

  private insertChar(string: string, char: string, position: number): string {
    return string.slice(0, position) + char + string.slice(position);
  }

  private isUpperCaseChar(char: string): boolean {
    return char.length === 1 && char === char.toUpperCase();
  }

  set locale(language: xencode.LanguageNames) {
    this.language = language;
    this.alphabet = this.stringifyAlphabet(this.language);
    this.alphalen = this.alphabet.length;
  }
}

export default new Xencode();
