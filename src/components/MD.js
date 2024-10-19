import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';


const MD = (props) => {
    return (
        <Markdown 
        remarkPlugins={[remarkMath, remarkGfm]} 
        rehypePlugins={[rehypeKatex]}
        children={props.children}
        components={{
            code(props) {
                const {children, className, node, ...rest} = props;
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                    <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={ghcolors}
                    />
                ) : (
                    <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={"language-markdown"}
                        style={ghcolors}
                    />
                )
            }
        }} />
    )
}

export default MD;