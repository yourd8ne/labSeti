const options = ["apple", "banana", "cherry", "grape", "orange", "pear"]; // Ваши возможные варианты

let selectedOptionIndex = -1; // Индекс выбранного варианта в списке
const inputField = document.getElementById("input-field");
const autocompleteList = document.getElementById("autocomplete-list");

function showAutoComplete(event) {
  const inputValue = event.target.value.toLowerCase();

  // Очищаем список автозавершения и сбрасываем индекс выбранного варианта
  autocompleteList.innerHTML = "";
  selectedOptionIndex = -1;

  if (inputValue.length > 0) {
    // Фильтруем совпадающие варианты
    const matchingOptions = options.filter(option =>
      option.toLowerCase().startsWith(inputValue)
    );

    // Создаем элементы списка соответствующих вариантов
    matchingOptions.forEach((option, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = option;

      // Обрабатываем событие нажатия на вариант
      listItem.addEventListener("click", () => {
        inputField.value = option;
        autocompleteList.innerHTML = "";
      });

      autocompleteList.appendChild(listItem);
    });

    // Обрабатываем навигацию с клавиатуры
    autocompleteList.addEventListener("keydown", event => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        selectedOptionIndex = Math.max(selectedOptionIndex - 1, 0);
        updateSelectedOption();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        selectedOptionIndex = Math.min(selectedOptionIndex + 1, matchingOptions.length - 1);
        updateSelectedOption();
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (selectedOptionIndex > -1) {
          inputField.value = matchingOptions[selectedOptionIndex];
          autocompleteList.innerHTML = "";
        }
      }
    });
  }
}

function updateSelectedOption() {
  const listItems = autocompleteList.getElementsByTagName("li");

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    listItem.classList.toggle("selected", i === selectedOptionIndex);
  }
}
