import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategory } from "../../features/categories/categoriesSlice";
import { Spin, Alert } from "antd";
import {useGetAllCategoriesQuery, useGetCategoryByIdQuery} from "../../services/categories.js";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, errors, isLoading } = useGetCategoryByIdQuery(id);
  const { selectedCategory, status, error } = useSelector((state) => state.categories);

  console.log(data)

  useEffect(() => {
    dispatch(fetchCategory(id));
  }, [dispatch, id]);

  if (isLoading === true) {
    return <Spin />;
  }
  if (!data) {
    return <p>No category found</p>;
  }
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default Detail;
