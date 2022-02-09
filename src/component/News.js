import React, { useEffect,useState} from "react";

import NewItem from "./NewItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResult, settotalResult] = useState(0);
  const capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  const updateNews= async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a794c39d42b49b084d93279e1dd8753&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    props.setProgress(30);
    let data = await fetch(url);
    let parseData = await data.json();
    props.setProgress(70);
    setarticles(parseData.articles)
    settotalResult(parseData.totalResult)
    setloading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews();
    
  }, []);
  
  
  // const handlePrevClick = async () => {

  //   setPage(page-1)
  //   updateNews();
  // };
  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews();
  // };
  const fetchMoreData = async() => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a794c39d42b49b084d93279e1dd8753&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    setloading(true)
    let data = await fetch(url);
    let parseData = await data.json();
    setarticles(articles.concat(parseData.articles))
    settotalResult(parseData.totalResults)
    setloading(false)
  };
 
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "31px", fontFamily: "Roboto",marginTop:"90px" }}
        >
          NewsItem-Top {capitalizeFirstLetter(props.category)} News
        </h1>
        {loading && <Spinner />}
        
         <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
                
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
        </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News