import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Home = () => {
  const readmePath = path.join(process.cwd(), 'CHANGELOG.md');
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');

  return (
    <section className="w-full rounded-2xl p-11">
      {/* <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold font-roboto">Changelogs</h2>
      </div> */}

      <div className="mt-7 w-full prose max-w-none dark:prose-invert font-roboto">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {readmeContent}
        </ReactMarkdown>
      </div>
    </section>
  );
};

export default Home;