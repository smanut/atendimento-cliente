import { useState } from 'react';
import Head from 'next/head'

export default function Home() {
  // Estados para cada campo do formulário
  const [servico, setServico] = useState('');
  const [proponente, setProponente] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [telefone, setTelefone] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');


  // Função para enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    // Expressão regular para validar o formato do campo servico
    const regex = /^\d{4}\.\d{4}\.\d{9}\/\d{4}\.\d{2}\.\d{2}$/;

    // Verifica se o campo servico corresponde ao padrão requerido
    if (!regex.test(servico)) {
      // Informa ao usuário que o formato está incorreto
      alert("O campo 'Número da Ordem de Serviço' está em um formato inválido. Por favor, siga o formato XXXX.XXXX.XXXXXXXXX/XXXX.XX.XX");
      return; // Impede o envio dos dados se o formato não for válido
    }

    console.log({ servico, proponente, solicitante, telefone, motivo, mensagem });

    try {
      // Envia os dados para o endpoint da API /api/enviar
      const response = await fetch('/api/enviar', {
        method: 'POST', // Método HTTP utilizado para enviar os dados
        headers: {
          'Content-Type': 'application/json' // Indica o tipo de conteúdo sendo enviado
        },
        body: JSON.stringify({ servico, proponente, motivo, solicitante, telefone, mensagem }) // Converte os dados do formulário para string JSON

      });

      // Converte a resposta do servidor para JSON
      const data = await response.json();

      // Supondo que a requisição foi bem-sucedida:
      setMensagemSucesso('Sucesso ao enviar sua solicitação!');
      // Limpa o formulário após o envio bem-sucedido
      setServico('');
      setProponente('');
      setSolicitante('');
      setTelefone('');
      setMotivo('');
      setMensagem('');
      // Aguarde alguns segundos e remova a mensagem de sucesso
      setTimeout(() => {
        setMensagemSucesso('');
      }, 10000); // Limpa a mensagem de sucesso após 10 segundos

      // Log da resposta para verificação
      console.log(data);

      // Aqui, você pode adicionar lógica adicional com base na resposta, como redirecionar o usuário ou exibir uma mensagem de sucesso/erro.
    } catch (error) {
      // Captura erros na requisição fetch
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Formulário de Solicitação</title>
      </Head>

      <div className="text-center mb-8">
        <h1 className="font-bold text-2xl">Formulário de Atendimento</h1>
        <p className="text-gray-600">Preencha o formulário abaixo para enviar sua solicitação.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="servico" className="block">Número da Ordem de Serviço</label>
          <input
            type="text"
            id="servico"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="XXXX.XXXX.XXXXXXXXX/XXXX.XX.XX"
            required
          />
        </div>

        {/* Repita a estrutura para os outros campos */}
        <div>
          <label htmlFor="proponente" className="block">Nome do Proponente</label>
          <input
            type="text"
            id="proponente"
            value={proponente}
            onChange={(e) => setProponente(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Digite o nome conforme consta na OS"
            required
          />
        </div>

        <div>
          <label htmlFor="solicitante" className="block">Nome do Solicitante</label>
          <input
            type="text"
            id="solicitante"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div>
          <label htmlFor="telefone" className="block">Telefone do Solicitante</label>
          <input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Digite seu telefone de contato"
            required
          />
        </div>

        <div>
          <label htmlFor="motivo" className="block">Motivo da Solicitação</label>
          <select
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          >
            <option value="">Selecione um motivo</option>
            <option value="Agendar Vistoria">Agendar Vistoria</option>
            <option value="Alteracao no Laudo">Alteração no Laudo</option>
            <option value="Revisao de Valor">Revisão de Valor</option>
            <option value="PEPT">PEPT</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensagem" className="block">Digite sua mensagem</label>
          <textarea
            id="mensagem"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            rows="4"
            placeholder="Escreva sua mensagem completa para a solicitação"
            required
          ></textarea>
        </div>
        {/* Mensagem de sucesso */}
        {mensagemSucesso && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{mensagemSucesso}</span>
          </div>
        )}

        <button type="submit" className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300 ease-in-out">Enviar</button>

      </form>
    </div>
  );
}
