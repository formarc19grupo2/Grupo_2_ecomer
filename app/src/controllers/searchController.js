const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
  });


module.exports = {
  getResults: async (req, res) => {
  const term = req.query.term;

  try {
    // fazer a solicitação GET para buscar dados em um servidor externo
    const response = await axios.get(`https://localhost:3030/search?term=${term}`, { httpsAgent: agent });

    // extrair os resultados do corpo da resposta
    const results = response.data;

    // retornar os resultados da pesquisa em formato JSON
    console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar dados');
  }}
}
