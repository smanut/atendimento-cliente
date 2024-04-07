import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [solicitacoes, setSolicitacoes] = useState([]); // Armazena as solicitações vindas do banco de dados
  const [expandedRow, setExpandedRow] = useState(null); // Controla qual linha está expandida para mostrar mais detalhes

  // Função para buscar as solicitações do banco de dados ao carregar a página
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/solicitacoes');
      const data = await response.json();
      setSolicitacoes(data); // Atualiza o estado com as solicitações recebidas
    }
    fetchData();
  }, []);

  // Função para alternar a expansão da linha
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="overflow-x-auto relative mx-24 my-8">
      <table className="w-full text-sm text-gray-500">
        <thead className="text-left uppercase bg-blue-900 text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Número do Serviço
            </th>
            <th scope="col" className="py-3 px-6 text-right">
              Motivo
            </th>
            <th scope="col" className="py-3 px-6 text-right">
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((solicitacao, index) => (
            <React.Fragment key={solicitacao._id}>
              <tr className={`border-b ${index % 2 === 0 ? "bg-blue-100" : "bg-blue-50"} hover:bg-blue-200 cursor-pointer`} onClick={() => toggleRow(index)}>
                <td className="py-4 px-6 text-gray-700">
                  {solicitacao.servico}
                </td>
                <td className="py-4 px-6 text-right text-gray-700">
                  {solicitacao.motivo}
                </td>
                <td className="py-4 px-6 text-right text-gray-700">
                  {new Date(solicitacao.criadoEm).toLocaleDateString("pt-BR")}
                </td>
              </tr>
              {expandedRow === index && (
                <tr className={`border-b ${index % 2 === 0 ? "bg-blue-100" : "bg-blue-50"} `}>
                  <td className="py-4 px-6" colSpan="3">
                    <strong>Nome do Proponente:</strong> {solicitacao.proponente}<br />
                    <strong>Solicitante:</strong> {solicitacao.solicitante}<br />
                    <strong>Telefone de Contato:</strong> {solicitacao.telefone}
                    <p className="mt-2"><strong>Mensagem:</strong> {solicitacao.mensagem}</p> 
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
