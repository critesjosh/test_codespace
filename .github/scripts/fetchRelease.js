
async function main() {
    console.log("Node.js version:", process.version);

    const fetchOpts = {
        headers: {},
    };

    if (process.env.GITHUB_TOKEN)
        fetchOpts.headers = { Authorization: `token ${process.env.GITHUB_TOKEN}` };

    const res = await fetch('https://api.github.com/repos/AztecProtocol/aztec-packages/releases', fetchOpts);

    const data = await res.json();

    console.log(data)

    const filtered = data.filter(
        release => release.tag_name.includes('aztec-packages'),
    );

    const latest = filtered.tag_name;

    // TODO: add the prerelease to this object!
    const workflowOutput = JSON.stringify({ latestReleaseTag: latest });
    console.log(workflowOutput); // DON'T REMOVE, GITHUB WILL CAPTURE THIS OUTPUT
}

main();