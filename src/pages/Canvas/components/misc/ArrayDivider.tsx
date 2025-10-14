export type DividerParameters = {
    direction: "vertical" | "horizontal"
};

function ArrayDivider({direction: orjentation = 'vertical'}: DividerParameters) {
    if (orjentation === 'vertical'){
        return <div className="w-full h-0.5 bg-gray-200 " />;
    } else {
        return <div className="h-full w-0.5 bg-gray-200 " />;
    }
}

export default ArrayDivider;