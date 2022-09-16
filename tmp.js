const getUsers = async () => {
    // API Call 

    const response = await fetch(`https://vijay982816-blanknode-mtewnqs608r.ws-us65.gitpod.io/`);


    console.log(await response.json())

}

getUsers()