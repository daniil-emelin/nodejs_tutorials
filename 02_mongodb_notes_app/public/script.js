const noteForm = document.getElementById("note-form");
const noteList = document.getElementById("note-list");

const NOTE_API_URL = "/api/note";

const createFetcher = ({
  url,
  method,
  body,
  onSuccess,
  onError = (error) => console.error(error),
}) => {
  return () =>
    fetch(url, {
      ...(method ? { method } : {}),
      ...(body ? { body: JSON.stringify(body) } : {}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при получении данных с сервера");
        }
        return response.json();
      })
      .then(onSuccess)
      .catch(onError);
};

const addNoteToList = (noteData) => {
  const { _id, author, text } = noteData;

  const note = document.createElement("div");
  note.classList.add("note");

  const createNoteContent = () => {
    const noteContent = document.createElement("div");

    noteContent.textContent = `${author}: ${text}`;
    note.appendChild(noteContent);
  };

  createNoteContent();

  const createActions = () => {
    const actions = document.createElement("div");

    actions.classList.add("actions");

    return actions;
  };

  const actions = createActions();

  const createActionButton = ({ buttonText, buttonClassName, onClick }) => {
    const button = document.createElement("button");

    button.textContent = buttonText;
    button.classList.add(buttonClassName);
    button.addEventListener("click", onClick);
    actions.appendChild(button);
  };

  createActionButton({
    buttonText: "Редактировать",
    buttonClassName: "edit-btn",
    onClick: () => editNoteText(noteData),
  });

  createActionButton({
    buttonText: "Удалить",
    buttonClassName: "delete-btn",
    onClick: () => deleteNote(_id)(),
  });

  note.appendChild(actions);

  noteList.appendChild(note);
};

// Функция для получения заметок с сервера
const fetchNotes = createFetcher({
  url: NOTE_API_URL,
  onSuccess: (notes) => {
    // Очищаем список заметок перед добавлением новых
    noteList.innerHTML = "";
    notes.forEach(addNoteToList);
  },
});

// Функция для добавления новой заметки в БД
const addNote = (note) =>
  createFetcher({
    url: NOTE_API_URL,
    method: "PUT",
    body: note,
    onSuccess: fetchNotes,
  });

// Функция для удаления заметки из БД
const deleteNote = (noteId) =>
  createFetcher({
    url: `${NOTE_API_URL}?_id=${noteId}`,
    method: "DELETE",
    onSuccess: fetchNotes,
  });

// Функция для редактирования заметки в БД
const editNote = (noteData, newText) =>
  createFetcher({
    url: NOTE_API_URL,
    method: "POST",
    body: { ...noteData, text: newText },
    onSuccess: fetchNotes,
  });

// Вызываем функцию получения заметок при загрузке страницы
fetchNotes();

noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const noteFormData = new FormData(event.target);
  const note = Object.fromEntries(noteFormData);

  // Отправляем новую заметку на сервер
  addNote(note)();

  noteForm.reset();
});

const editNoteText = (noteData) => {
  const newText = prompt("Введите новый текст заметки:");

  if (newText !== null) {
    // Отправляем новую заметку на сервер
    editNote(noteData, newText)();
  }
};
