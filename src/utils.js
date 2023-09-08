const graphQLQuery = async (query, variables) => (await fetch('/api', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
        query, variables
    })
})).json();

module.exports = {
    graphQLQuery
}