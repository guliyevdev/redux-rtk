import { useSelector } from 'react-redux';
import { Table } from 'antd';

const Favorites = () => {
  const { favorites } = useSelector((state) => state.categories);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div>
      <h1>Favorites</h1>
      <Table dataSource={favorites} columns={columns} />
    </div>
  );
};

export default Favorites;
