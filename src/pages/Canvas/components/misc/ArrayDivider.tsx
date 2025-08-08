export type DividerParameters = {
    orjentation: "vertical" | "horizontal"
};

function ArrayDivider({orjentation = 'vertical'}: DividerParameters) {
    if (orjentation === 'vertical'){
        return <div className="h-full w-px bg-gray-200 " />;
    } else {
        return <div className="w-full h-px bg-gray-200 " />;
    }
}

export default ArrayDivider;