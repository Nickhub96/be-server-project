exports.formatDates = list => {
  return list.map(article => {
    return { ...article, created_at: new Date(article.created_at) };
  });
};

exports.makeRefObj = list => {
  // console.log(list);
  const newObj = {};
  list.forEach(data => {
    newObj[data.title] = data.article_id;
  });
  // console.log(newObj);
  return newObj;
};

exports.formatComments = (comments, articleRef) => {
  const newComments = [];
  comments.forEach(newComment => {
    // console.log(newComment);
    const duplicate = { ...newComment };
    duplicate.article_id = articleRef[duplicate.belongs_to];
    delete duplicate.belongs_to;
    duplicate.author = duplicate.created_by;
    delete duplicate.created_by;
    duplicate.created_at = new Date(duplicate.created_at);
    newComments.push(duplicate);
  });
  // console.log(newComments);
  return newComments;
};
