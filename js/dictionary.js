function fetchDefinition() {
    const wordInput = document.getElementById('word-input');
    const word = wordInput.value.trim();
    const definitionOutput = document.getElementById('definition-output');

    if (word === '') {
        definitionOutput.innerHTML = 'Please enter a word.';
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.title === 'No Definitions Found') {
                definitionOutput.innerHTML = `No definitions found for "${word}".`;
            } else {
                let definitions = '';
                data[0].meanings.forEach(meaning => {
                    definitions += `<h3>${meaning.partOfSpeech}</h3>`;
                    meaning.definitions.forEach(definition => {
                        definitions += `<p>${definition.definition}</p>`;
                    });
                });
                definitionOutput.innerHTML = definitions;
            }
        })
        .catch(error => {
            definitionOutput.innerHTML = `An error occurred: ${error}`;
        });
}