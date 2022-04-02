/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const name = /[a-zA-Z\ ]{3,15}/;

/*
 * email validation
 */
export const email = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;

/*
 * password validation, should contain:
 * (?=.*\d): at least one digit
 * (?=.*[a-z]): at least one lower case
 * (?=.*[A-Z]): at least one uppercase case
 * [0-9a-zA-Z]{8,}: at least 8 from the mentioned characters
 * (?=.*[!@#$%^&*]): at least one special characters
 */
export const password = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const currencyFormat = num => {
  return String(num)
    .replace(/(\.\d{2})\d*/, '$1')
    .replace(/(\d)(?=(\d{3})+\b)/g, '$1,');
};
