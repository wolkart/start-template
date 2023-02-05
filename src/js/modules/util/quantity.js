function changeQuantity(button, value) {
  if (button.length <= 0) return;

  const input = button.parentElement.querySelector('.js-quantity');
  let count = parseInt(input.value, 10) + value;

  count = count < 1 ? 1 : count;
  input.value = count;

  if (Number.isNaN(+input.value) || input.value === '') input.value = 1;
}

export default changeQuantity;
