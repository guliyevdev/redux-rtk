import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
  addBasket,
  addToWishlist, removeFromWishlist
} from "../../features/categories/categoriesSlice";
import { Table, Spin, Alert, Button, Space, Tooltip } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import {useGetAllCategoriesQuery} from "../../services/categories.js";

const Categories = () => {
  const { data:categories, errors, isLoading } = useGetAllCategoriesQuery();
  const dispatch = useDispatch();
  const {
    data: dd,
    status,
    error,
    favorites,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading") {
    return <Spin />;
  }

  if (status === "failed") {
    return <Alert message={error} type="error" />;
  }

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  const handleAddBasket = (record) => {
    dispatch(addBasket(record));
  };

  const handleFavorite = (record) => {
    dispatch(addToWishlist(record));
  };
  const handleRemoveFavorite = (record) => {
    dispatch(removeFromWishlist(record));
  };
  const isFavorite = (id) => {
    return true
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View">
            <Link to={`/${record.id}`}>
              <Button type="primary" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/edit-category/${record.id}`}>
              <Button type="default" icon={<EditOutlined />} />
            </Link>
          </Tooltip>

          <Tooltip title="Add Basket">
            <Button
              type="default"
              icon={<ShoppingCartOutlined />}
              onClick={() => handleAddBasket(record)}
            />
          </Tooltip>
          <Tooltip title="Favorite">
            {favorites.includes(record) ? (
            <Button
              type="default"
              icon={
                  <HeartFilled style={{ color: "red" }} />
              }
              onClick={() => handleRemoveFavorite(record)}
            />
            ) : (
                <Button
                    type="default"
                    icon={
                          <HeartOutlined />
                    }
                    onClick={() => handleFavorite(record)}
                />
            )}
          </Tooltip>
          <Tooltip title="Delete">
            <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={categories} columns={columns} />;
    </div>
  );
};

export default Categories;
