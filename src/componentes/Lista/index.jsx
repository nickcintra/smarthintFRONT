import React, { useEffect, useState } from 'react';
import './Lista.css';
import Filtro from '../Filtro';
import CampoCheckBox from '../CampoCheckBox';
import Botao from '../Botao';
import api from '../../services/api';
import ReactPaginate from 'react-paginate';

const Lista = (props) => {
  const [clienteBloqueado, setClienteBloqueado] = useState(false);
  const [selecionarTodos, setSelecionarTodos] = useState(false);

  const [data, setData] = useState({ items: [], totalPages: 0 });
  const [pageNumber, setPageNumber] = useState(0); // Página atual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/api/Cliente?pageNumber=${pageNumber+1}&pageSize=${pageSize}`
        );
        setData(response.data);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('ops! ocorreu um erro' + err);
      }
    };

    fetchData();
  }, [pageNumber]);

  const handlePageClick = (data) => {
    setPageNumber(data.selected);
  };

  return (
    <div className="Lista">
      <Filtro />
      <table>
        <thead>
          <tr>
            <th>
              <CampoCheckBox
                obrigatorio={false}
                valor={selecionarTodos}
                aoAlterado={(valor) => setSelecionarTodos(valor)}
                emFormulario={true}
              />
            </th>
            <th>Nome/Razão Social</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Data Cadastro</th>
            <th>Cliente Bloqueado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.items &&
            data.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <CampoCheckBox
                    obrigatorio={false}
                    valor={selecionarTodos}
                    aoAlterado={(valor) => setSelecionarTodos(valor)}
                    emFormulario={true}
                  />
                </td>
                <td>{item.nome}</td>
                <td>{item.email}</td>
                <td>{item.telefone}</td>
                <td>{item.dataCadastro}</td>
                <td>
                  <CampoCheckBox
                    obrigatorio={false}
                    valor={item.bloqueado}
                    aoAlterado={() => setClienteBloqueado(item.bloqueado)}
                    emFormulario={false}
                  />
                </td>
                <td>
                  <Botao texto="Editar" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        forcePage={pageNumber}
      />
    </div>
  );
};

export default Lista;
