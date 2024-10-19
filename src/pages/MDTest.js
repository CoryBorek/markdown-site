import MD from '../components/MD';

const MDTest = () => {

    const md ="### Built in Display Test Page\n\n*italics*\n\n**bold**\n\n - test\n\n\nMath! $f(n) = \\log_2(2)$\n\n\nCode: \n```c\nint main(int argc, char * argv[]) {\n  printf(\"Hello, World\\n\");\n}\n```\n\n\n```\nthis is regular stuff that isn't checked.\nex.out: test.c\n\tcompile test.c\n```\n";
    return (<div>
        <MD>
            {md}
        </MD>
    </div>)
}

export default MDTest;