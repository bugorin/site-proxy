import express from 'express';
import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { urlToFilename } from './src/util/file.js';
import preloadUrls from './src/util/preloadUrls.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ quiet: true });
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DIR_NAME = process.env.DIR_NAME;
const CACHE_DIR = path.join(__dirname, DIR_NAME);


const app = express();

// Garante que o diretório existe
fs.ensureDirSync(CACHE_DIR);

async function cacheFor(url) {
  const filename = urlToFilename(url);
  const cachePath = path.join(CACHE_DIR, filename);

  if (await fs.pathExists(cachePath)) {
    return
  }

  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      validateStatus: () => true,
    });

    await fs.writeJson(cachePath, response.data, { spaces: 2 });
  } catch (err) {}
}

// Rota que faz o pré-carregamento e cache das URLs
app.get('/__cloneSite', async (req, res) => {
  const resultados = [];

  for (const url of preloadUrls) {
    await cacheFor(url);
  }

  res.json({
    status: 'pré-carregamento completo',
    cacheados: resultados
  });
});

app.use(async (req, res, next) => {

  if (req.method !== 'GET') {
    return res.status(405).send('Método não permitido');
  }

  const fullUrl = req.originalUrl;
  const filename = urlToFilename(fullUrl);
  const cachePath = path.join(CACHE_DIR, filename);

  if (await fs.pathExists(cachePath)) {
    const data = await fs.readJson(cachePath);
    return res.json(data);
  }

  try {
    const response = await axios.get(`${BASE_URL}${fullUrl}`, {
      validateStatus: () => true,
    });

    await fs.writeJson(cachePath, response.data, { spaces: 2 });

    if (response.status >= 400) {
      res.status(response.status).json({
        erro: 'Erro ao buscar da API original',
        status: response.status,
        url: response.config.url,
      });
    } else {
      res.status(response.status).json(response.data);
    }

  } catch (err) {
    res.status(500).json({
      erro: 'Erro ao buscar da API original',
      detalhes: err.message,
      status: err.response?.status,
      url: err.config?.url,
    });
  }

});

  
app.listen(PORT, () => {
  console.log(`✅ Proxy com cache ativo: http://localhost:${PORT}`);
});
