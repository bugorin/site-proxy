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
git clone https://github.com/bugorin/site-proxy.git
cd gnarus-proxy
```

2. Instale as dependências:
```bash
npm install
```

3. Edite o arquivo `.env` com suas configurações:
```env
BASE_URL=https://api.exemplo.com
PORT=3000
DIR_NAME=dados
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

