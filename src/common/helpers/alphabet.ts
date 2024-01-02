

export const nextInAlphabet = (letter: string) => {
    const charCode = letter.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122) {
        return String.fromCharCode(charCode + 1);
    }
    return letter;
}
