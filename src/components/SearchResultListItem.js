import React from 'react';

export default function SearchResultListItem({
  item,
  urlField = 'url',
  titleField = 'title',
  keyField = 'objectID',
}) {
  const title = item[titleField];
  const url = item[urlField];
  const key = item[keyField];
  return (
    <li key={key}>
      <a aria-label={`Read more about ${title}`} href={url}>
        {title}
      </a>
    </li>
  );
}
