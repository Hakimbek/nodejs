function readStdin() {
    process.stdin.on("data", data => writeStdin(data));
}

function writeStdin(data) {
    process.stdout.write(data.reverse().toString().trim() + "\n\n");
}

readStdin()
