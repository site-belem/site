document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsList = document.getElementById('comments-list');
    const userNameInput = document.getElementById('user-name');
    const userCommentInput = document.getElementById('user-comment');

    // Lista de palavras ofensivas para filtro (exemplos comuns)
    const forbiddenWords = [
        'palavrao1', 'palavrao2', 'ofensa1', 'ofensa2', 
        'idiota', 'imbecil', 'burro', 'lixo'
    ];

    // Carregar comentários do localStorage ao iniciar
    loadComments();

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = userNameInput.value.trim();
        let comment = userCommentInput.value.trim();

        if (name && comment) {
            // Aplicar filtro de palavras
            comment = filterBadWords(comment);

            const newComment = {
                name: name,
                text: comment,
                date: new Date().toLocaleString('pt-BR')
            };

            saveComment(newComment);
            addCommentToDOM(newComment);

            // Limpar formulário
            commentForm.reset();
        }
    });

    function filterBadWords(text) {
        let filteredText = text;
        forbiddenWords.forEach(word => {
            const regex = new RegExp(word, 'gi');
            filteredText = filteredText.replace(regex, '***');
        });
        return filteredText;
    }

    function saveComment(comment) {
        let comments = JSON.parse(localStorage.getItem('belem_comments')) || [];
        comments.push(comment);
        localStorage.setItem('belem_comments', JSON.stringify(comments));
    }

    function loadComments() {
        let comments = JSON.parse(localStorage.getItem('belem_comments')) || [];
        comments.forEach(comment => addCommentToDOM(comment));
    }

    function addCommentToDOM(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment-item');
        commentDiv.innerHTML = `
            <strong>${comment.name}</strong>
            <small>${comment.date}</small>
            <p>${comment.text}</p>
        `;
        commentsList.prepend(commentDiv);
    }
});
