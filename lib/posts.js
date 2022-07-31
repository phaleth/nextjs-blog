import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDir = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDir, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,

      ...matterResult.data,
    };
  });
  return allPostsData.sort(({ date: a }, { date: b }) => (a < b ? 1 : -1));
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
};

export const getPostData = async id => {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const matterResult = matter(fileContents);

  const parsedContent = await remark().use(html).process(matterResult.content);

  return {
    id,
    contentHtml: parsedContent.toString(),
    ...matterResult.data,
  };
};
