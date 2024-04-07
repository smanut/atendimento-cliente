import { connectToDatabase } from '../../app/db'; // Ajuste o caminho conforme necessário

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const solicitacoes = await db.collection('solicitacoes')
                                   .find({})
                                   .sort({ criadoEm: -1 })
                                   .toArray();

      res.status(200).json(solicitacoes);
    } catch (error) {
      console.error("Erro ao buscar as solicitações:", error);
      res.status(500).json({ message: "Erro ao buscar os dados" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
