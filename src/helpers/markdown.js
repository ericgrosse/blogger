const youtubeUrlRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[^\s]*)?/g;

export const getYouTubeEmbedUrl = (videoId) => `https://www.youtube.com/embed/${videoId}`;

export const splitMarkdownByYouTubeLinks = (content = '') => {
  const parts = [];
  let lastIndex = 0;
  let match;

  youtubeUrlRegex.lastIndex = 0;

  while ((match = youtubeUrlRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'markdown',
        content: content.slice(lastIndex, match.index),
      });
    }

    parts.push({
      type: 'youtube',
      videoId: match[1],
      url: getYouTubeEmbedUrl(match[1]),
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: 'markdown',
      content: content.slice(lastIndex),
    });
  }

  return parts;
};
