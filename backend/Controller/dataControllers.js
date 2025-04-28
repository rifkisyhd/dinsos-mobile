const axios = require('axios');

axios.interceptors.request.use(
  config => {
    const token = process.env.API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const getRekap = async (req, res) => {
  const { program, periode } = req.params;
  const url = `https://sapabansos.dinsos.jatimprov.go.id/api/rekapitulasi/${program}/${periode || ''}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data Rekapitulasi' });
  }
};

module.exports = { getRekap };
