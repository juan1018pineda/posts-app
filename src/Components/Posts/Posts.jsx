import React, { useState, useEffect } from "react";
import { data } from "../../api/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./Posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState(data);
  const [order, setOrder] = useState("ascendant");

  const orderPosts = (posts) => {
    posts.sort((a, b) => {
      if (order === "ascendant") {
        return a.votes - b.votes;
      } else {
        return b.votes - a.votes;
      }
    });
    return posts;
  };

  useEffect(() => {
    setPosts((prevState) => {
      const updatedPosts = [...prevState];
      return orderPosts(updatedPosts);
    });
  }, [order]);

  const handleVotes = (pos, action) => {
    let { votes } = posts[pos];
    action === "increase" ? (votes += 1) : (votes -= 1);
    setPosts((prevState) => {
      const updatedPosts = [...prevState];
      updatedPosts[pos].votes = votes;
      return orderPosts(updatedPosts);
    });
  };

  return (
    <>
      <h1>Blog posts populares</h1>
      <div className="separator"></div>
      <div className="controls">
        <label>Orden: </label>
        <button
          className="order-up"
          onClick={() => {
            setOrder("ascendant");
          }}
        >
          Ascendente
        </button>
        <button
          className="order-down"
          onClick={() => {
            setOrder("descendant");
          }}
        >
          Descendente
        </button>
      </div>
      <section className="all-posts">
        {posts.map(
          (
            {
              title,
              description,
              url,
              votes,
              writer_avatar_url,
              post_image_url,
            },
            i
          ) => {
            return (
              <div key={i} className="post">
                <img src={post_image_url} alt="" />
                <div className="post-controls">
                  <button onClick={() => handleVotes(i, "increase")}>
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      size="lg"
                      color="#4287f5"
                    />
                  </button>
                  <span>{votes}</span>
                  <button onClick={() => handleVotes(i, "decrease")}>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      size="lg"
                      color="#4287f5"
                    />
                  </button>
                </div>
                <div className="post-info">
                  <h3>
                    <a href={url}>{title}</a>
                  </h3>
                  <p>{description}</p>
                  <div className="post-author">
                    <span>Escrito por: </span>
                    <img src={writer_avatar_url} alt="" />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </section>
    </>
  );
};

export default Posts;
