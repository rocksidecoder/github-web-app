import handleFetchRequest from "../utils/helper.js"

// List respositories by username    =>  /api/v1/repo
export const allUserRepos = async (req, res, next) => {
    try {
        const { username } = req.params

        if (!username) return res.json({ status: 422, message: "Please provide username" })

        const url = `https://api.github.com/users/${username}/repos`

        let results = await handleFetchRequest("get", url);
        results = await results.json();

        if(!results.length){
            return res.json({
                status: 200,
                message: "User Repositories list",
                data: []
            })
        }

        // sort the result by watchers_count 
        results.sort((a, b) => b.watchers_count - a.watchers_count)

        // response body
        const response = {
            username,
            profile: results[0].owner.html_url,
            avatar: results[0].owner.avatar_url,
            repos: results.map(ele => ({
                name: ele.name,
                description: ele.description,
                watchers: ele.watchers_count,
                type: ele.visibility
            }))
        }

        return res.json({
            status: 200,
            message: "User Repositories list",
            data: [response]
        })

    } catch (error) {
        next(error)
    }
}

// List starred respositories of login user    =>  /api/v1/repo/starred
export const userStarredRepos = async(req, res,next)=>{
    try {
        const url = `https://api.github.com/user/starred`

        let results = await handleFetchRequest("get", url);
        results = await results.json();

        // reposne body
        const response = results.map(ele=> ({
            repo_name: ele.name,
            description: ele.description,
            stargazers_count: ele.stargazers_count
        }))

        return res.json({
            status: 200,
            message: "User starred repositories",
            data: response  
        })
    } catch (error) {
        next(error)
    }
}

// Star the respo   =>  /api/v1/repo/star
export const starRepo = async(req, res, next)=>{
    try {
        const { owner, repo } = req.query
        if(!owner || !repo){
            return res.json({
                status: 422,
                message: "Please provide repository name with owner"
            })
        }

        const url = `https://api.github.com/user/starred/${owner}/${repo}`
        await handleFetchRequest("put", url);

        return res.json({
            status: 200,
            message: "Starred repository successfully",
        })
    } catch (error) {
        next(error)
    }
}

// Unstar the respo   =>  /api/v1/repo/unstar
export const unstarRepo = async(req, res, next)=>{
    try {
        const { owner, repo } = req.query

        if(!owner || !repo){
            return res.json({
                status: 422,
                message: "Please provide repository name with owner"
            })
        }

        const url = `https://api.github.com/user/starred/${owner}/${repo}`
        await handleFetchRequest("delete", url);

        return res.json({
            status: 200,
            message: "Unstarred repository successfully",
        })
    } catch (error) {
        next(error)
    }
}