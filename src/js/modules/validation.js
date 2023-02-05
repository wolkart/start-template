import Bouncer from 'formbouncerjs';

/**
 * https://github.com/cferdinandi/bouncer - documentation
 * https://cferdinandi.github.io/bouncer/ - example
 */

function initValidate() {
  const bouncer = new Bouncer('[data-validate]', {
    disableSubmit: true,
    customValidations: {
      valueMismatch(field) {
        // Look for a selector for a field to compare
        // If there isn't one, return false (no error)
        const selector = field.getAttribute('data-bouncer-match');
        if (!selector) return false;

        // Get the field to compare
        const otherField = field.form.querySelector(selector);
        if (!otherField) return false;

        // Compare the two field values
        // We use a negative comparison here because if they do match, the field validates
        // We want to return true for failures, which can be confusing
        return otherField.value !== field.value;
      },
    },
    messages: {
      missingValue: {
        checkbox: 'Пожалуйста, заполните поле',
        radio: 'Пожалуйста, заполните поле',
        select: 'Пожалуйста, заполните поле',
        'select-multiple': 'Пожалуйста, заполните поле',
        default: 'Пожалуйста, заполните поле',
      },
      patternMismatch: {
        email: 'Пожалуйста, заполните поле',
        url: 'Пожалуйста, заполните поле',
        number: 'Пожалуйста, заполните поле',
        color: 'Пожалуйста, заполните поле',
        date: 'Пожалуйста, заполните поле',
        time: 'Пожалуйста, заполните поле',
        month: 'Пожалуйста, заполните поле',
        default: 'Пожалуйста, заполните поле',
      },
      outOfRange: {
        over: 'Выберите значение не более чем {max}.',
        under: 'Выберите значение не менее чем {min}.',
      },
      wrongLength: {
        over:
          'Сократите этот текст до символов, не превышающих {maxLength}. В настоящее время вы используете {length} символов.',
        under:
          'Увеличьте длину этого текста до {minLength} символов или более. В настоящее время вы используете {length} символов.',
      },
      valueMismatch(field) {
        const customMessage = field.getAttribute('data-bouncer-mismatch-message');
        return customMessage || 'Пожалуйста, заполните поле';
      },
    },
  });

  document.addEventListener(
    'bouncerShowError',
    (event) => {
      const self = event.target;
      const parentBlock = self.closest('.form-group') || self.parentNode;

      parentBlock.classList.add('invalid');
    },
    false,
  );

  document.addEventListener(
    'bouncerRemoveError',
    (event) => {
      const self = event.target;
      const parentBlock = self.closest('.form-group') || self.parentNode;

      parentBlock.classList.remove('invalid');
    },
    false,
  );

  document.addEventListener(
    'bouncerFormInvalid',
    (event) => {
      window.scrollTo(0, event.detail.errors[0].offsetTop);
    },
    false,
  );

  document.addEventListener(
    'bouncerFormValid',
    (event) => {
      event.target.submit();
    },
    false,
  );

  return bouncer;
}

export default initValidate;
