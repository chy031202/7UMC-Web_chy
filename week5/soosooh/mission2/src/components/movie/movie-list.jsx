import { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "./movie-card";
import { axiosInstance } from "../../apis/axios-instance";
import useCustomFetch from "../../hooks/useCunstomFetch";
const Container = styled.div`
  display: flex;
  margin: 30px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const MovieList = ({ category }) => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/${category}?language=ko-KR&page=1`);
  console.log(movies);
  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩 중 입니다...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 중 입니다...</h1>
      </div>
    );
  }
  return (
    <Container>
      {movies.data?.results.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          release_date={movie.release_date}
          poster_path={movie.poster_path}
          overview={movie.overview}
        />
      ))}
    </Container>
  );
};

export default MovieList;
