import React from 'react';
import ReactMarkdown from 'react-markdown';
import { splitMarkdownByYouTubeLinks } from '../../helpers/markdown';

function MarkdownContent({ content = '' }) {
  return splitMarkdownByYouTubeLinks(content).map((part, index) => {
    if (part.type === 'youtube') {
      return (
        <div className="youtube-embed" key={`${part.videoId}-${index}`}>
          <iframe
            title={`YouTube video ${part.videoId}`}
            src={part.url}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return <ReactMarkdown key={index}>{part.content}</ReactMarkdown>;
  });
}

export default MarkdownContent;
