type LanguageNames = "en_US" | "ru_RU";
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
export declare class Xencode implements IXencode {
    private language;
    private alphabet;
    private alphalen;
    constructor(language?: LanguageNames);
    encode(message: string, command: string): string;
    pendulum(message: string, fromStart: boolean, times: number): string;
    caesar(message: string, isMoveToLeft: boolean, shift: number): string;
    thinout(message: string, isPushToLeft: boolean, each: number): string;
    private stringifyAlphabet;
    private parseCommand;
    private insertChar;
    private isUpperCaseChar;
    set locale(language: LanguageNames);
}
declare const _default: Xencode;
export default _default;
//# sourceMappingURL=index.d.ts.map