// ==========================================
// BACK-END: Estrutura de Dados e Funções CRUD
// ==========================================
let bancoDeDadosTarefas = [];
let contadorId = 1;

// C - Create (Criar)
function criarTarefa(titulo, descricao) {
    const novaTarefa = {
        id: contadorId++,
        titulo: titulo,
        descricao: descricao
    };
    bancoDeDadosTarefas.push(novaTarefa);
    return novaTarefa;
}

// R - Read (Ler/Listar)
function listarTarefas() {
    return bancoDeDadosTarefas;
}

// U - Update (Atualizar)
function atualizarTarefa(id, novoTitulo, novaDescricaao) {
    const index = bancoDeDadosTarefas.findIndex(t => t.id === id);
    if (index !== -1) {
        bancoDeDadosTarefas[index].titulo = novoTitulo;
        bancoDeDadosTarefas[index].descricao = novaDescricaao;
        return true;
    }
    return false;
}

// D - Delete (Excluir)
function deletarTarefa(id) {
    const index = bancoDeDadosTarefas.findIndex(t => t.id === id);
    if (index !== -1) {
        bancoDeDadosTarefas.splice(index, 1);
        return true;
    }
    return false;
}

// ==========================================
        // FRONT-END: Manipulação da Tela e Eventos
        // ==========================================
        const taskForm = document.getElementById('taskForm');
        const taskIdInput = document.getElementById('taskId');
        const tituloInput = document.getElementById('titulo');
        const descricaoInput = document.getElementById('descricao');
        const taskList = document.getElementById('taskList');
        const btnSalvar = document.getElementById('btnSalvar');
        const btnCancelar = document.getElementById('btnCancelar');

        function renderizarTarefas() {
            taskList.innerHTML = '';
            // Chama a função do back-end para obter os dados do Array
            const tarefas = listarTarefas();

            if (tarefas.length === 0) {
                taskList.innerHTML = '<p style="text-align: center; color: #9ca3af;">Nenhuma tarefa cadastrada.</p>';
                return;
            }

            tarefas.forEach(tarefa => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="task-info">
                        <h3>${tarefa.titulo}</h3>
                        <p>${tarefa.descricao}</p>
                    </div>
                    <div class="task-actions">
                        <button class="btn-edit" onclick="prepararEdicao(${tarefa.id}, '${tarefa.titulo}', '${tarefa.descricao}')">Editar</button>
                        <button class="btn-delete" onclick="remover(${tarefa.id})">Excluir</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }

        taskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = taskIdInput.value;
            const titulo = tituloInput.value;
            const descricao = descricaoInput.value;

            if (id === "") {
                // Chama o Create do back-end
                criarTarefa(titulo, descricao);
            } else {
                // Chama o Update do back-end
                atualizarTarefa(Number(id), titulo, descricao);
                cancelarEdicao();
            }

            taskForm.reset();
            renderizarTarefas();
        });

        function prepararEdicao(id, titulo, descricao) {
            taskIdInput.value = id;
            tituloInput.value = titulo;
            descricaoInput.value = descricao;
            btnSalvar.textContent = "Atualizar Tarefa";
            btnCancelar.style.display = "block";
        }

        function cancelarEdicao() {
            taskIdInput.value = "";
            taskForm.reset();
            btnSalvar.textContent = "Criar Tarefa";
            btnCancelar.style.display = "none";
        }

        function remover(id) {
            if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
                // Chama o Delete do back-end
                deletarTarefa(id);
                renderizarTarefas();
            }
        }

        // Inicializar a lista ao carregar a página
        window.onload = function() {
            renderizarTarefas();
        };