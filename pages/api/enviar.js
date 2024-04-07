import { connectToDatabase } from '../../app/db'; // Ajuste o caminho conforme necessário


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { db } = await connectToDatabase();
      const { servico, proponente, solicitante, telefone, motivo, mensagem } = req.body;

      const result = await db.collection('solicitacoes').insertOne({
        servico,
        proponente,
        solicitante,
        telefone,
        motivo,
        mensagem,
        criadoEm: new Date(),
      });

      // Se você precisa do documento inserido, considere usar find() com o _id retornado
      // ou ajustar sua lógica conforme necessário sem acessar result.ops[0]
      res.status(201).json({ success: true, id: result.insertedId, data: req.body });
    } catch (error) {
      console.error("Erro ao inserir no banco de dados:", error);
      res.status(500).json({ message: "Erro ao inserir os dados" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

