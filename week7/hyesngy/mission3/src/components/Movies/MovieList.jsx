import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MovieItem from './MovieItem';
import useCustomFetch from '../../hooks/useCustomFetch';
import SkeletonMovieItem from './SkeletonMovieItem';

const ListContainer = styled.div`
  width: calc(100vw - 180px);
  padding: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;  

  @media (max-width: 768px){
    width: 100%;
  }
`
const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 2rem;
  padding-bottom: 3rem;
`
const PageButton = styled.div`
  padding: 0.5rem 1rem;
  background: ${(props) => (props.disabled ? 'gray' : '#F82F62')};
  color: #fff;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  
  &:hover {
    background: ${(props) => (props.disabled ? 'gray' : '#e52958')};
  }
`

const MovieList = ({ listType, url }) => {
    const [page, setPage] = useState(1);
    const fetchUrl = url ? url : `/movie/${listType}?language=ko-KR`;
    const { data: movies, isLoading, isError, error } = useCustomFetch(fetchUrl, listType, page);

    const searchParams = new URLSearchParams(fetchUrl.split('?')[1]);
    const searchValue = searchParams.get('query');

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
            window.scrollTo({ top: 0 });
        }
    };

    const handleNext = () => {
        setPage(page + 1);
        window.scrollTo({ top: 0 });
    };

    if (isLoading && (!movies || movies.results.length === 0)) {
        return (
            <ListContainer>
                {Array.from({ length: 20 }, (_, index) => (
                    <SkeletonMovieItem key={index} />
                ))}
            </ListContainer>
        );
    }
    if (isError) {
        return <div>에러발생 : {error.message}</div>;
    }

    if (listType === "search" && (!movies || !movies.results?.length)) {
        if (searchValue != '')
            return (
                <ListContainer>
                    <h1>해당하는 검색어 {searchValue}에</h1>
                    <h1>해당하는 데이터가 없습니다.</h1>
                </ListContainer>
            );
    }

    return (
        <>
            <ListContainer>
                {movies.results.map((movie) => (
                    <MovieItem key={movie.id} movie={movie} />
                ))}
            </ListContainer>
            {listType !== "search" && (
                <PageDiv>
                    <PageButton onClick={handlePrev} disabled={page === 1}>이전</PageButton>
                    <span>{page} 페이지</span>
                    <PageButton onClick={handleNext}>다음</PageButton>
                </PageDiv>
            )}
        </>
    );
};

MovieList.propTypes = {
    listType: PropTypes.string.isRequired,
    url: PropTypes.string,
};

export default MovieList;