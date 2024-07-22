import fetch from 'cross-fetch';
import { useState } from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm'


const MDTest = () => {

    const md ="### Built in Display Test Page\n\n*italics*\n\n**bold**\n\n - test\n\n\nMath! $f(n) = \log_2(2)$";
    return (<div>
        <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
            {md}
        </Markdown>
    </div>)
}

export default MDTest;