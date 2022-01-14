/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ModalBody from './modals/TxtCardBody';

const TextCardBody = ({
  data,
  info,
  css,
  compt,
  results,
  page,
  refetch,
  deletePost,
}) => {
  const content =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus nihil beatae recusandae enim, quos exercitationem explicabo aut dolorem corrupti voluptates itaque quod? Nobis, labore sint! Aperiam dolores ab totam recusandae assumenda error libero asperiores at? itaque quod? Nobis, labore sint! Aperiam dolores ab totam recusandae assumenda est';
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [call, setCall] = useState('linewidth');
  const toggleMore = () => {
    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    if (isCollapsed) {
      setCall('linewidth');
    } else {
      setCall('linewidthall');
    }
  }, [isCollapsed]);
  const postlength = results.content.length;
  const myParagraphs = results.content.split('\n\n');
  const stanza = myParagraphs.map((myParagraph) => (
    <p className={`font-${results.font}`}>{myParagraph}</p>
  ));
  return (
    <div>
      <div className="post-txt-lg-display">
        {compt === 'profile' ? (
          <ModalBody
            id2={results._id}
            id={data._id}
            data={data}
            info={info}
            results={results}
            deletePost={deletePost}
            css={css}
            page={page}
            refetch={refetch}
          />
        ) : (
          <>
            <div
              className={`bg-color-${results.color} font-${results.font} ${css}`}
            >
              {postlength <= 500 ? (
                <div
                  className={
                    results.align === 'text-center'
                      ? '  alignDivCenter linewidthall '
                      : results.align === 'text-right '
                      ? ' alignDivRight  linewidthall '
                      : 'linewidthall '
                  }
                >
                  <span
                    className={`${results.align}  post-text-display-text linewidth`}
                  >
                    <h4
                      className={`${results.align} font-weight-bold  text-font-20`}
                    >
                      {results.title}
                    </h4>
                    {stanza}
                  </span>
                </div>
              ) : (
                <>
                  <div
                    className={
                      results.align === 'text-center'
                        ? ` ${call} alignDivCenter  `
                        : results.align === 'text-right'
                        ? ` ${call} alignDivRight `
                        : call
                    }
                  >
                    <h4
                      className={` ${results.align} font-weight-bold text-font-20`}
                    >
                      {results.title}
                    </h4>
                    <span className={`${results.align} post-text-display-text`}>
                      {stanza}
                    </span>
                  </div>

                  {isCollapsed ? (
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-circle-down']}
                      className="expand mb-3"
                      data-toggle="collapse"
                      data-target={`#postCaption${results._id}`}
                      onClick={toggleMore}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={['fas', 'chevron-circle-up']}
                      className="expand mb-3"
                      data-toggle="collapse"
                      data-target="#postCaption"
                      onClick={toggleMore}
                    />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="post-txt-sm-display d-none">
        {compt === 'profile' ? (
          <Link to={data ? `/post/${data._id}` : '/post/postId'} className="text-dark">
            <div
              className={`bg-color-${results.color} font-${results.font} ${css}`}
            >
              <p className="text-left post-text-display-text">
                {data ? data.content.slice(0, 50) : content}
              </p>
            </div>
          </Link>
        ) : (
          <div className={css}>
            {postlength <= 500 ? (
              <div className="linewidtspecific ">
                <span className="text-center post-text-display-text linewidth">
                  <h4 className="font-weight-bold text-center text-font-20 post-disp-title">
                    {results.title}
                  </h4>
                  {stanza}
                </span>
              </div>
            ) : (
              <>
                <div className={call}>
                  <h4 className="font-weight-bold text-font-20 post-disp-title">
                    {results.title}
                  </h4>
                  <span className="text-left post-text-display-text linewidth">
                    {stanza}
                  </span>
                </div>

                {isCollapsed ? (
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-circle-down']}
                    className="expand mb-3"
                    data-toggle="collapse"
                    data-target={`#postCaption${results._id}`}
                    onClick={toggleMore}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={['fas', 'chevron-circle-up']}
                    className="expand mb-3"
                    data-toggle="collapse"
                    data-target="#postCaption"
                    onClick={toggleMore}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
TextCardBody.propTypes = {
  css: PropTypes.string.isRequired,
  compt: PropTypes.string.isRequired,
  deletePost: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  refetch: PropTypes.func.isRequired,
};
export default TextCardBody;
