# Gnarus Proxy

Um proxy inteligente com sistema de cache para APIs, desenvolvido em Node.js com Express. Este projeto atua como uma camada intermediária que armazena respostas de APIs em cache local, melhorando a performance e reduzindo a carga nos servidores originais.

## 🚀 Funcionalidades

- **Cache Inteligente**: Armazena automaticamente respostas de APIs em arquivos JSON
- **Pré-carregamento**: Sistema de pré-carregamento de URLs específicas
- **Proxy Transparente**: Encaminha requisições para a API original quando não há cache
- **Conversão de URLs**: Converte URLs em nomes de arquivos seguros para o sistema
- **Tratamento de Erros**: Gerencia erros de forma robusta
- **Configurável**: Configuração via variáveis de ambiente

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd gnarus-proxy
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env`:
```bash
cp .env.example .env
```

4. Edite o arquivo `.env` com suas configurações:
```env
BASE_URL=https://api.exemplo.com
PORT=3000
DIR_NAME=cache
```

## ⚙️ Configuração

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `BASE_URL` | URL base da API que será proxyada | - |
| `PORT` | Porta onde o servidor será executado | 3000 |
| `DIR_NAME` | Nome do diretório onde os caches serão armazenados | cache |

## 🚀 Uso

### Iniciar o servidor

```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

### Endpoints

#### GET `/__cloneSite`
Pré-carrega e cacheia todas as URLs configuradas no arquivo `src/util/preloadUrls.js`.

```bash
curl http://localhost:3000/__cloneSite
```

**Resposta:**
```json
{
  "status": "pré-carregamento completo",
  "cacheados": []
}
```

#### GET `/*`
Proxy para qualquer rota. Se a resposta já estiver em cache, retorna imediatamente. Caso contrário, faz a requisição para a API original e armazena em cache.

```bash
curl http://localhost:3000/api/cursos
```

## 📁 Estrutura do Projeto

```
gnarus-proxy/
├── cache/                 # Diretório de cache (criado automaticamente)
├── src/
│   └── util/
│       ├── file.js        # Utilitários para conversão de URLs
│       └── preloadUrls.js # Lista de URLs para pré-carregamento
├── index.js              # Servidor principal
├── package.json
└── README.md
```

## 🔧 Como Funciona

### 1. Conversão de URLs
O sistema converte URLs em nomes de arquivos seguros:
- Remove barras iniciais
- Substitui `/` por `__`
- Substitui `?` por `--`
- Substitui `&` por `__`
- Substitui `=` por `_`
- Adiciona extensão `.json`

**Exemplo:**
```
/api/cursos?limit=10 → api__cursos--limit_10.json
```

### 2. Sistema de Cache
- **Verificação**: Antes de fazer requisição, verifica se existe cache
- **Armazenamento**: Salva respostas em arquivos JSON formatados
- **Retorno**: Se cache existe, retorna imediatamente
- **Fallback**: Se não existe, faz requisição para API original

### 3. Tratamento de Erros
- Validação de métodos HTTP (apenas GET)
- Tratamento de erros de rede
- Preservação de códigos de status HTTP
- Logs detalhados de erros

## 📊 Monitoramento

O servidor exibe logs no console:
- ✅ Confirmação de inicialização
- 📝 Requisições processadas
- ❌ Erros detalhados

## 🔒 Segurança

- Apenas métodos GET são permitidos
- Validação de entrada
- Tratamento seguro de erros
- Não expõe informações sensíveis

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Executar testes
npm test

# Iniciar em modo desenvolvimento
npm run dev
```

### Dependências

- **express**: Framework web
- **axios**: Cliente HTTP
- **fs-extra**: Utilitários de sistema de arquivos
- **dotenv**: Gerenciamento de variáveis de ambiente

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para melhorar a performance de APIs** 