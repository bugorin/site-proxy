

export function urlToFilename(url) {
    return url
      .replace(/^\//, '')                // remove barra inicial
      .replace(/\//g, '__')              // troca / por __
      .replace(/\?/g, '--')              // troca ? por --
      .replace(/&/g, '__')               // troca & por __
      .replace(/=/g, '_') + '.json';     // troca = por _
  }