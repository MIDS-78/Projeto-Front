// Filtro funcional para mostrar apenas não lidas + pesquisa por texto
    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.querySelector('.btn-filter');
        const searchInput = document.querySelector('.search-box input');
        const btnBack = document.getElementById('btn-back');
        let showingUnread = false;

        function filterNotifications() {
            const all = document.querySelectorAll('.notification');
            const sections = document.querySelectorAll('.notification-section');
            const search = searchInput.value.trim().toLowerCase();
            all.forEach(n => {
                let show = true;
                if (showingUnread && !n.classList.contains('unread')) show = false;
                if (search) {
                    const text = n.innerText.toLowerCase();
                    if (!text.includes(search)) show = false;
                }
                n.style.display = show ? '' : 'none';
            });
            // Esconde seção se não houver notificações visíveis nela
            sections.forEach(section => {
                const visible = section.querySelector('.notification:not([style*="display: none"])');
                section.style.display = visible ? '' : 'none';
            });
        }

        btn.addEventListener('click', function() {
            showingUnread = !showingUnread;
            btn.textContent = showingUnread ? 'Mostrar todas' : 'Mostrar apenas as não lidas';
            filterNotifications();
            // A seta deve ficar sempre visível
            btnBack.style.display = '';
        });
        searchInput.addEventListener('input', filterNotifications);
        // Seta de voltar: volta para todas as notificações
        btnBack.addEventListener('click', function() {
            if (showingUnread) {
                showingUnread = false;
                btn.textContent = 'Mostrar apenas as não lidas';
                filterNotifications();
            }
            // A seta continua visível sempre
            btnBack.style.display = '';
        });
    });