/**
 * Validacao das variaveis de ambiente sensiveis.
 *
 * O modulo e avaliado na inicializacao e lanca se algo estiver faltando. A
 * falha e proposital: com um valor padrao a API subiria normalmente e
 * passaria a assinar e aceitar tokens com um segredo previsivel, sem que
 * nada indicasse o problema ate alguem explora-lo.
 *
 * Depende de dotenv.config() ter rodado antes - o que src/server.ts garante,
 * por chamar dotenv na primeira linha, antes de importar a aplicacao.
 */

const TAMANHO_MINIMO_SEGREDO = 32;

const COMO_GERAR = 'Gere uma com: openssl rand -hex 32';

function lerSegredoJwt(): string {
  const segredo = process.env.JWT_SECRET;

  if (!segredo) {
    throw new Error(`JWT_SECRET nao definida. ${COMO_GERAR}`);
  }

  if (segredo.length < TAMANHO_MINIMO_SEGREDO) {
    throw new Error(
      `JWT_SECRET tem ${segredo.length} caracteres; o minimo e ` +
      `${TAMANHO_MINIMO_SEGREDO}. ${COMO_GERAR}`
    );
  }

  return segredo;
}

export const JWT_SECRET = lerSegredoJwt();
