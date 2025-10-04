// Jogo Interativo de Reciclagem - Campo Mourão
class JogoReciclagem {
    constructor() {
        this.pontuacao = 0;
        this.nivel = 1;
        this.vidas = 3;
        this.perguntaAtual = 0;
        this.jogoAtivo = false;
        
        this.perguntas = [
            {
                pergunta: "Onde deve ser descartada uma garrafa PET?",
                opcoes: ["Lixo Orgânico", "Coleta Seletiva", "Lixo Comum", "PEV"],
                resposta: 1,
                explicacao: "Garrafas PET são recicláveis e devem ir para a coleta seletiva!"
            },
            {
                pergunta: "Qual o horário da coleta seletiva em Campo Mourão?",
                opcoes: ["6:00 horas", "8:00 horas", "10:00 horas", "12:00 horas"],
                resposta: 1,
                explicacao: "A coleta seletiva em Campo Mourão inicia às 8:00 horas."
            },
            {
                pergunta: "O que NÃO pode ser reciclado?",
                opcoes: ["Papel de escritório", "Papel higiênico usado", "Latas de alumínio", "Garrafas de vidro"],
                resposta: 1,
                explicacao: "Papel higiênico usado não pode ser reciclado por questões de higiene."
            },
            {
                pergunta: "Onde fica o PEV de Campo Mourão?",
                opcoes: ["Centro da cidade", "Ao lado da SEMA", "No parque", "Na prefeitura"],
                resposta: 1,
                explicacao: "O PEV fica ao lado da Secretaria de Meio Ambiente (SEMA)."
            },
            {
                pergunta: "Qual cor representa o vidro na coleta seletiva?",
                opcoes: ["Azul", "Verde", "Vermelho", "Amarelo"],
                resposta: 1,
                explicacao: "A cor verde representa o vidro na coleta seletiva."
            },
            {
                pergunta: "O que pode ser descartado no PEV?",
                opcoes: ["Lixo comum", "Móveis velhos", "Restos de comida", "Papel reciclável"],
                resposta: 1,
                explicacao: "O PEV recebe móveis velhos, eletrônicos, pneus e resíduos da construção."
            },
            {
                pergunta: "Como preparar embalagens para reciclagem?",
                opcoes: ["Deixar sujas", "Lavar e secar", "Apenas secar", "Não precisa preparar"],
                resposta: 1,
                explicacao: "Embalagens devem ser lavadas e secas antes do descarte na coleta seletiva."
            },
            {
                pergunta: "Qual a frequência da coleta seletiva no centro?",
                opcoes: ["Segunda e sexta", "Quarta e sábado", "Terça e quinta", "Todos os dias"],
                resposta: 1,
                explicacao: "No centro de Campo Mourão, a coleta seletiva é às quartas e sábados."
            }
        ];
        
        this.criarInterface();
    }
    
    criarInterface() {
        const jogoHTML = `
            <div id="jogo-reciclagem" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 1000;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border-radius: 20px; padding: 30px; max-width: 600px; width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    
                    <!-- Tela Inicial -->
                    <div id="tela-inicial">
                        <div style="text-align: center;">
                            <h2 style="color: #27ae60; margin-bottom: 20px;">🎮 Jogo da Reciclagem</h2>
                            <p style="font-size: 1.1em; margin-bottom: 30px; color: #333;">Teste seus conhecimentos sobre reciclagem em Campo Mourão!</p>
                            <button id="iniciar-jogo" style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.2em; cursor: pointer; margin-right: 10px;">🚀 Iniciar Jogo</button>
                            <button id="fechar-jogo" style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.2em; cursor: pointer;">❌ Fechar</button>
                        </div>
                    </div>
                    
                    <!-- Tela do Jogo -->
                    <div id="tela-jogo" style="display: none;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: bold;">
                            <span id="pontuacao" style="color: #27ae60;">Pontos: 0</span>
                            <span id="vidas" style="color: #e74c3c;">❤️ 3</span>
                            <span id="pergunta-numero" style="color: #3498db;">1/8</span>
                        </div>
                        
                        <div id="pergunta-container">
                            <h3 id="pergunta-texto" style="color: #2c3e50; margin-bottom: 20px; text-align: center;"></h3>
                            <div id="opcoes-container" style="display: grid; gap: 10px;">
                                <!-- Opções serão inseridas aqui -->
                            </div>
                        </div>
                        
                        <div id="feedback" style="display: none; margin-top: 20px; padding: 15px; border-radius: 10px; text-align: center;">
                            <p id="feedback-texto"></p>
                            <button id="proxima-pergunta" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 15px; cursor: pointer; margin-top: 10px;">Próxima Pergunta</button>
                        </div>
                    </div>
                    
                    <!-- Tela Final -->
                    <div id="tela-final" style="display: none; text-align: center;">
                        <h2 id="resultado-titulo" style="margin-bottom: 20px;"></h2>
                        <p id="resultado-texto" style="font-size: 1.1em; margin-bottom: 20px;"></p>
                        <div id="resultado-detalhes" style="margin-bottom: 30px;"></div>
                        <button id="jogar-novamente" style="background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.2em; cursor: pointer; margin-right: 10px;">🔄 Jogar Novamente</button>
                        <button id="fechar-jogo-final" style="background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; border: none; padding: 15px 30px; border-radius: 25px; font-size: 1.2em; cursor: pointer;">❌ Fechar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', jogoHTML);
        this.configurarEventos();
    }
    
    configurarEventos() {
        document.getElementById('iniciar-jogo').addEventListener('click', () => this.iniciarJogo());
        document.getElementById('fechar-jogo').addEventListener('click', () => this.fecharJogo());
        document.getElementById('fechar-jogo-final').addEventListener('click', () => this.fecharJogo());
        document.getElementById('jogar-novamente').addEventListener('click', () => this.reiniciarJogo());
        document.getElementById('proxima-pergunta').addEventListener('click', () => this.proximaPergunta());
    }
    
    mostrarJogo() {
        document.getElementById('jogo-reciclagem').style.display = 'block';
        document.getElementById('tela-inicial').style.display = 'block';
        document.getElementById('tela-jogo').style.display = 'none';
        document.getElementById('tela-final').style.display = 'none';
    }
    
    fecharJogo() {
        document.getElementById('jogo-reciclagem').style.display = 'none';
    }
    
    iniciarJogo() {
        this.pontuacao = 0;
        this.vidas = 3;
        this.perguntaAtual = 0;
        this.jogoAtivo = true;
        
        document.getElementById('tela-inicial').style.display = 'none';
        document.getElementById('tela-jogo').style.display = 'block';
        
        this.embaralharPerguntas();
        this.mostrarPergunta();
    }
    
    embaralharPerguntas() {
        for (let i = this.perguntas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.perguntas[i], this.perguntas[j]] = [this.perguntas[j], this.perguntas[i]];
        }
    }
    
    mostrarPergunta() {
        if (this.perguntaAtual >= this.perguntas.length) {
            this.finalizarJogo();
            return;
        }
        
        const pergunta = this.perguntas[this.perguntaAtual];
        
        document.getElementById('pontuacao').textContent = `Pontos: ${this.pontuacao}`;
        document.getElementById('vidas').textContent = `❤️ ${this.vidas}`;
        document.getElementById('pergunta-numero').textContent = `${this.perguntaAtual + 1}/${this.perguntas.length}`;
        document.getElementById('pergunta-texto').textContent = pergunta.pergunta;
        document.getElementById('feedback').style.display = 'none';
        
        const opcoesContainer = document.getElementById('opcoes-container');
        opcoesContainer.innerHTML = '';
        
        pergunta.opcoes.forEach((opcao, index) => {
            const botaoOpcao = document.createElement('button');
            botaoOpcao.textContent = opcao;
            botaoOpcao.style.cssText = `
                padding: 15px;
                border: 2px solid #bdc3c7;
                border-radius: 10px;
                background: white;
                cursor: pointer;
                font-size: 1em;
                transition: all 0.3s ease;
            `;
            
            botaoOpcao.addEventListener('mouseenter', () => {
                botaoOpcao.style.background = '#ecf0f1';
                botaoOpcao.style.borderColor = '#3498db';
            });
            
            botaoOpcao.addEventListener('mouseleave', () => {
                botaoOpcao.style.background = 'white';
                botaoOpcao.style.borderColor = '#bdc3c7';
            });
            
            botaoOpcao.addEventListener('click', () => this.verificarResposta(index));
            
            opcoesContainer.appendChild(botaoOpcao);
        });
    }
    
    verificarResposta(respostaSelecionada) {
        const pergunta = this.perguntas[this.perguntaAtual];
        const opcoes = document.querySelectorAll('#opcoes-container button');
        
        // Desabilitar todas as opções
        opcoes.forEach(opcao => opcao.disabled = true);
        
        if (respostaSelecionada === pergunta.resposta) {
            // Resposta correta
            opcoes[respostaSelecionada].style.background = '#2ecc71';
            opcoes[respostaSelecionada].style.color = 'white';
            opcoes[respostaSelecionada].style.borderColor = '#27ae60';
            
            this.pontuacao += 10;
            this.mostrarFeedback(true, pergunta.explicacao);
        } else {
            // Resposta incorreta
            opcoes[respostaSelecionada].style.background = '#e74c3c';
            opcoes[respostaSelecionada].style.color = 'white';
            opcoes[respostaSelecionada].style.borderColor = '#c0392b';
            
            // Mostrar resposta correta
            opcoes[pergunta.resposta].style.background = '#2ecc71';
            opcoes[pergunta.resposta].style.color = 'white';
            opcoes[pergunta.resposta].style.borderColor = '#27ae60';
            
            this.vidas--;
            this.mostrarFeedback(false, pergunta.explicacao);
            
            if (this.vidas <= 0) {
                setTimeout(() => this.finalizarJogo(), 2000);
                return;
            }
        }
    }
    
    mostrarFeedback(correto, explicacao) {
        const feedback = document.getElementById('feedback');
        const feedbackTexto = document.getElementById('feedback-texto');
        
        if (correto) {
            feedback.style.background = '#d5f4e6';
            feedback.style.border = '2px solid #27ae60';
            feedbackTexto.innerHTML = `<strong>✅ Correto!</strong><br>${explicacao}`;
        } else {
            feedback.style.background = '#fdf2f2';
            feedback.style.border = '2px solid #e74c3c';
            feedbackTexto.innerHTML = `<strong>❌ Incorreto!</strong><br>${explicacao}`;
        }
        
        feedback.style.display = 'block';
    }
    
    proximaPergunta() {
        this.perguntaAtual++;
        this.mostrarPergunta();
    }
    
    finalizarJogo() {
        document.getElementById('tela-jogo').style.display = 'none';
        document.getElementById('tela-final').style.display = 'block';
        
        const porcentagem = Math.round((this.pontuacao / (this.perguntas.length * 10)) * 100);
        let titulo, texto, cor;
        
        if (porcentagem >= 80) {
            titulo = "🏆 Parabéns! Você é um Expert em Reciclagem!";
            texto = "Você conhece muito bem as práticas de reciclagem em Campo Mourão!";
            cor = "#27ae60";
        } else if (porcentagem >= 60) {
            titulo = "👍 Muito Bem! Você está no caminho certo!";
            texto = "Você tem um bom conhecimento sobre reciclagem, continue aprendendo!";
            cor = "#f39c12";
        } else {
            titulo = "📚 Continue Estudando!";
            texto = "Que tal revisar o material sobre reciclagem em Campo Mourão?";
            cor = "#e74c3c";
        }
        
        document.getElementById('resultado-titulo').textContent = titulo;
        document.getElementById('resultado-titulo').style.color = cor;
        document.getElementById('resultado-texto').textContent = texto;
        
        document.getElementById('resultado-detalhes').innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border: 2px solid #dee2e6;">
                <p><strong>Pontuação Final:</strong> ${this.pontuacao} pontos</p>
                <p><strong>Aproveitamento:</strong> ${porcentagem}%</p>
                <p><strong>Perguntas Respondidas:</strong> ${this.perguntaAtual}/${this.perguntas.length}</p>
            </div>
        `;
    }
    
    reiniciarJogo() {
        this.iniciarJogo();
    }
}

// Inicializar o jogo quando a página carregar
let jogoReciclagem;
document.addEventListener('DOMContentLoaded', function() {
    jogoReciclagem = new JogoReciclagem();
});

