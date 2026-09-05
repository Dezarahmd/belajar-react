export default function HelloWorld() {

    const props = {
        text: "Belajar React from spread syntax",
    }

    return (
        <div>
            <HelloWorldHeader {...props}/>
            <HelloWorldParagraph/>
        </div>
    )
}

function HelloWorldHeader({text = "Belajar React"}) {
    return (
        <h1 className="text-red-500 bg-cyan-500">{text.toUpperCase()}</h1>
    )
}

function HelloWorldParagraph() {
    const text = "Belajar react cuy"
    const style = {
        color: "blue",
        backgroundColor: "yellow",
    }
    return (
        <p style={style}>{text.toLowerCase()}</p>
    )
}